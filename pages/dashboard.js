import Head from "next/head";
import React from "react";
import SuggestionCard from "../components/SuggestionCard";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { BiTrain } from "react-icons/bi";

export default function Dashboard() {
  const { userData, quizData } = useAuth();

  return (
    <>
      <Head>
        <title>Dashboard | GreenPrint</title>
      </Head>
      <h1 className="text-2xl font-bold tracking-tight">
        Hello, {userData.displayName.split(" ")[0]}
      </h1>
      <div className="mt-4 flex gap-4">
        <div className="h-56 w-96 rounded-lg border-2 border-gray-200 shadow-lg">
          {quizData ? (
            <div className="relative flex h-full w-full flex-col items-center justify-center">
              <h3 className="text-2xl font-bold tracking-tight">
                Latest quiz results:
              </h3>
              <div className="flex flex-col items-center text-gray-500">
                <div className="text-3xl font-bold tracking-tight">
                  {Math.round(quizData.data.co2 * 100) / 100}
                  <span className="text-2xl">kg</span>
                </div>
                {/* convert quizData.data.co2 to percentage out of 6154.368792 */}
                <div className="mt-16 text-5xl font-bold">
                  {100 - Math.round((quizData.data.co2 / 6154.368792) * 100)}
                  <span className="text-3xl font-bold">%</span>
                </div>
              </div>
              <Image
                src="/progress.png"
                className="absolute "
                alt="CO2"
                layout="fill"
              />
            </div>
          ) : (
            <Link href="/quiz">
              <div className="grid h-full w-full place-items-center">
                <Image
                  src="/quiz.svg"
                  width={380}
                  height={180}
                  className="opacity-50"
                />
                <button className="absolute rounded-lg bg-accent px-3 py-2 font-medium text-white ring-accent hover:ring-2 hover:ring-offset-2">
                  Take Quiz
                </button>
              </div>
            </Link>
          )}
        </div>
        <div className="hidden h-56 w-64 place-items-center rounded-lg border-2 border-gray-200 sm:grid">
          <Image src="/dashboard.svg" width={380} height={180} />
        </div>
      </div>
      <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-500">
        Suggestions:
      </h2>
      {quizData && (
        <div className="-mx-2 flex flex-col">
          {quizData.answers[7] !== "Often" &&
            quizData.answers[7] !== "Always" && (
              <SuggestionCard
                icon={<BiTrain />}
                title={"Take more public transportation"}
              />
            )}
          {quizData.answers[7] !== "Often" &&
            quizData.answers[7] !== "Always" && (
              <SuggestionCard
                icon={<BiTrain />}
                title={"Take more public transportation"}
              />
            )}
        </div>
      )}
    </>
  );
}
