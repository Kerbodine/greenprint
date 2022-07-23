import Head from "next/head";
import React from "react";
import SuggestionCard from "../components/SuggestionCard";
import { useAuth } from "../contexts/AuthContext";

export default function Dashboard() {
  const { userData } = useAuth();

  return (
    <>
      <Head>
        <title>Dashboard | GreenPrint</title>
      </Head>
      <h1 className="text-2xl font-bold tracking-tight">
        Hello, {userData.displayName.split(" ")[0]}
      </h1>
      <div className="mt-4 flex gap-4">
        <div className="h-56 w-96 rounded-lg border-2 border-gray-200 shadow-lg"></div>
        <div className="h-56 w-64 rounded-lg bg-gray-100"></div>
      </div>
      <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-500">
        Suggestions:
      </h2>
      <div className="-mx-2 flex flex-col">
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
        <SuggestionCard />
      </div>
    </>
  );
}
