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
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState(null);

  const db = getFirestore();

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

  const addFriend = async (email) => {
    const friend = await getDocs(
      query(collection(db, "Users"), where("email", "==", email), limit(1))
    );
    let friendData;
    let friendId;
    friend.forEach((doc) => (friendId = doc.id));
    if (friendId === user.uid) {
      return "You can't add yourself as a friend";
    } else if (friendId === undefined) {
      return "User not found";
    }
    friend.forEach((doc) => (friendData = doc.data()));
    console.log(friendData);
    await updateDoc(doc(db, "Users", user.uid), {
      friends: [
        ...(userData.friends ? userData.friends : []),
        {
          id: friendId,
          displayName: friendData.displayName,
          email: friendData.email,
        },
      ],
    });
    return "Friend added";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        login,
        signup,
        resetPassword,
        logout,
        updateDisplayName,
        signInWithGoogle,
        quizData,
        setQuizData,
        addFriend,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
