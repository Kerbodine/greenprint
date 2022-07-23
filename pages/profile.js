import Head from "next/head";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { userData } = useAuth();

  return (
    <>
      <Head>
        <title>Profile | GreenPrint</title>
      </Head>
      <h1 className="text-2xl font-bold tracking-tight">Your Profile:</h1>
      <div className="relative mt-4 h-36 w-full rounded-lg bg-gray-100 p-8">
        <div className="h-64 w-64 rounded-lg border-2 border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="no-select grid h-12 w-12 flex-none place-items-center rounded-full bg-accent text-2xl font-medium text-white">
              {userData.displayName[0]}
            </div>
            <div className="w-[calc(100%-64px)]">
              <p className="truncate font-medium text-gray-700">
                {userData.displayName}
              </p>
              <p className="-mt-1 truncate text-gray-500">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
