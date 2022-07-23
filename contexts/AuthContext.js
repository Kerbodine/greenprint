import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "../config/firebase";
import {
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import app from "../config/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // User data listener
  useEffect(() => {
    let unsubscribe = () => {};
    if (user) {
      setLoading(true);
      unsubscribe = onSnapshot(doc(db, "Users", user.uid), (document) => {
        setUserData(document.data());
        setUsername(document.data()?.username);
        setLoading(false);
      });
    }
    return () => {
      unsubscribe();
    };
  }, [db, user]);

  const createUserDoc = async (cred) => {
    const photoURL = cred.user.photoURL ? cred.user.photoURL : null;
    const userDoc = {
      displayName: cred.user.displayName,
      firstName: cred.user.displayName.split(" ")[0],
      lastName: cred.user.displayName.split(" ")[1],
      email: cred.user.email,
      username: null,
      photoURL,
      createdAt: new Date(),
    };
    await setDoc(doc(db, "Users", cred.user.uid), userDoc);
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      let cred = await createUserWithEmailAndPassword(auth, email, password);
      cred.user.displayName = `${firstName} ${lastName}`;
      await createUserDoc(cred);
    } catch (err) {
      console.log(err);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const updateDisplayName = async (displayName) => {
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, provider);
      const { isNewUser } = getAdditionalUserInfo(cred);
      if (isNewUser) {
        await createUserDoc(cred);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createUsername = async (username) => {
    await setDoc(doc(db, "Usernames", username), {});
    await updateDoc(doc(db, "Users", auth.currentUser.uid), {
      username,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        username,
        login,
        signup,
        resetPassword,
        logout,
        updateDisplayName,
        signInWithGoogle,
        createUsername,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
