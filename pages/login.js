import React, { useState } from "react";
import Link from "next/link";
import { BiHide, BiInfoCircle, BiLoaderAlt, BiShow } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import GoogleIcon from "../images/google.svg";
import Navbar from "../components/Navbar";
import Head from "next/head";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  const googleAuth = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      setLoading(false);
      router.push("/home");
    } catch (err) {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      router.push("/home");
    } catch (err) {
      setLoading(false);
      switch (err.code) {
        case "auth/user-not-found":
          setError("User not found");
          break;
        case "auth/wrong-password":
          setError("Wrong password");
          break;
        default:
          setError("Failed to login");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login | GreenPrint</title>
      </Head>
      <div className="flex h-screen w-full flex-col">
        <Navbar />
        <div className="grid h-full w-full place-items-center">
          <div className="rounded-2xl border-gray-200 p-8 xs:border-2 xs:shadow-lg">
            <form className="relative w-[240px]" onSubmit={handleSubmit}>
              <h1 className="mb-4 text-2xl font-semibold xs:text-3xl">
                Log in
              </h1>
              <button
                type="button"
                onClick={googleAuth}
                className="flex h-9 w-full items-center gap-2 rounded-lg border-2 border-gray-200 px-2 text-sm font-medium text-gray-600 hover:border-gray-400"
              >
                <span className="text-base">
                  <GoogleIcon />
                </span>
                Continue with Google
              </button>
              <div className="my-2 flex w-full items-center">
                <div className="h-0.5 flex-auto bg-gray-200"></div>
                <p className="mx-2 text-xs font-bold text-gray-500">OR</p>
                <div className="h-0.5 flex-auto bg-gray-200"></div>
              </div>
              <input
                type="email"
                placeholder="Email address"
                className="mb-2 w-full rounded-lg border-2 border-gray-200 px-2 py-1 text-gray-600 focus:border-gray-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full rounded-lg border-2 border-gray-200 px-2 py-1 text-gray-600 focus:border-gray-400 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="-ml-7 text-xl text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </button>
              </div>
              {error && (
                <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-red-400 bg-red-100 p-0.5 text-sm font-medium text-red-400">
                  <BiInfoCircle className="flex-none rotate-180 text-xl" />
                  <p className="flex-auto truncate">{error}</p>
                </div>
              )}
              <div className="mt-1 flex justify-end text-sm text-gray-500 hover:underline">
                <Link href="/reset-password">Forgot password?</Link>
              </div>
              <button
                type="submit"
                className="mt-4 rounded-lg border-2 border-gray-600 px-2 py-1 text-sm font-medium text-gray-600 hover:bg-gray-600 hover:text-white"
              >
                Log in →
              </button>
              <p className="mt-2 text-sm text-gray-500">
                Need an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-gray-700 hover:underline"
                >
                  Sign up
                </Link>
              </p>
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
