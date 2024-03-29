import React, { useState } from "react";
import { BiInfoCircle, BiLoaderAlt } from "react-icons/bi";
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Head from "next/head";
import Navbar from "../components/Navbar";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await resetPassword(email);
      setEmail("");
      setLoading(false);
      setMessage("Check your email!");
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        default:
          setError("Failed to reset password");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Reset Password | GreenPrint</title>
      </Head>
      <div className="flex h-screen w-full flex-col">
        <Navbar />
        <div className="grid h-full w-screen place-items-center bg-white">
          <div className="rounded-2xl border-gray-200 p-8 xs:border-2 xs:shadow-lg">
            <form className="relative w-[240px]" onSubmit={handleSubmit}>
              <h1 className="mb-4 text-xl font-semibold xs:text-2xl">
                Reset password
              </h1>
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg border-2 border-gray-200 px-2 py-1 text-gray-700 focus:border-gray-600 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error && (
                <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-red-400 bg-red-100 p-0.5 text-sm font-medium text-red-400">
                  <BiInfoCircle className="flex-none rotate-180 text-xl" />
                  <p className="flex-auto truncate">{error}</p>
                </div>
              )}
              {message && (
                <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-green-400 bg-green-100 p-0.5 text-sm font-medium text-green-400">
                  <BiInfoCircle className="flex-none text-xl" />
                  <p className="flex-auto truncate">{message}</p>
                </div>
              )}
              <div className="mt-1 flex justify-end text-sm text-gray-500 hover:underline">
                <Link href="/login">Back to login</Link>
              </div>
              <button
                type="submit"
                className="mt-4 rounded-lg border-2 border-gray-600 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-600 hover:text-white"
              >
                Reset password →
              </button>
              {loading && (
                <div className="absolute inset-0 grid place-items-center bg-white">
                  <span className="animate-spin text-2xl text-gray-500">
                    <BiLoaderAlt />
                  </span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
