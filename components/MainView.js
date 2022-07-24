import React, { useEffect } from "react";
import SideNav from "./SideNav";
import {
  collection,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function MainView({ children }) {
  const { setQuizData, user, userData } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "Users", user.uid, "Quizzes"),
        limit(1),
        orderBy("createdAt", "desc")
      ),
      (documents) => {
        setQuizData(documents.docs[0]?.data());
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {userData && (
        <div className="mx-auto flex h-screen w-screen max-w-5xl">
          <SideNav />
          <div className="ml-[56px] w-full p-4 sm:ml-0 md:p-8">{children}</div>
        </div>
      )}
    </>
  );
}
