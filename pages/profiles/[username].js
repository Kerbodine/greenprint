import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Head from "next/head";
import React from "react";

export default function UserProfile({ data }) {
  console.log(data);

  return (
    <>
      {data ? (
        <>
          <Head>
            <title>Profile | GreenPrint</title>
          </Head>
          <h1 className="text-2xl font-bold tracking-tight">Profile:</h1>
          <div className="relative mt-4 h-36 w-full rounded-lg bg-gray-100 p-8">
            <div className="h-64 w-64 rounded-lg border-2 border-gray-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="no-select grid h-12 w-12 flex-none place-items-center rounded-full bg-accent text-2xl font-medium text-white">
                  {data.displayName[0]}
                </div>
                <div className="w-[calc(100%-64px)]">
                  <p className="truncate font-medium text-gray-700">
                    {data.displayName}
                  </p>
                  <p className="-mt-1 truncate text-gray-500">{data.email}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>User not found</div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const db = getFirestore();
  const userData = await getDocs(
    query(
      collection(db, "Users"),
      where("username", "==", context.params.username)
    )
  );
  let data;

  userData.forEach((user) => {
    data = user.data();
  });

  if (data) {
    delete data.createdAt;
  }

  console.log(data);

  return {
    props: {
      data,
    },
  };
}
