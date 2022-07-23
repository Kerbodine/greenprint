import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import debounce from "lodash.debounce";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { BiInfoCircle, BiLoaderAlt } from "react-icons/bi";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

export default function Username() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const { createUsername } = useAuth();

  const handleSubmit = async (e) => {
    try {
      setUsername("");
      setLoading(true);
      e.preventDefault();
      await createUsername(username);
      setLoading(false);
      router.push("/dashboard");
    } catch (e) {
      setLoading(false);
      setError("Something went wrong");
      console.log(e);
    }
  };

  const updateUsername = (e) => {
    const uname = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    setUsername(uname);
    if (uname < 3) {
      setIsValid(false);
    }
    if (re.test(uname)) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(username);
  }, [username, checkUsername]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      setMessage("");
      setError("");
      if (username.length >= 3) {
        const ref = doc(getFirestore(), "Usernames", username);
        const snap = await getDoc(ref);
        setIsValid(!snap.exists());
        if (!snap.exists()) {
          setMessage("Username is available");
        } else if (username && snap.exists()) {
          setError("Username already in use");
        }
      }
    }, 500),
    []
  );

  return (
    <>
      <Head>
        <title>Username | GreenPrint</title>
      </Head>
      <div className="flex h-screen w-full flex-col">
        <Navbar />
        <div className="grid h-full w-screen place-items-center bg-white">
          <div className="rounded-2xl border-gray-200 p-8 xs:border-2 xs:shadow-lg">
            <form className="relative w-[240px]" onSubmit={handleSubmit}>
              <h1 className="mb-4 text-xl font-semibold xs:text-2xl">
                Create Username
              </h1>
              <input
                type="text"
                placeholder="Username"
                className="w-full rounded-lg border-2 border-gray-200 px-2 py-1 text-gray-700 focus:border-gray-600 focus:outline-none"
                value={username}
                onChange={updateUsername}
                required
              />
              {error && (
                <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-red-500 bg-red-100 p-0.5 text-sm font-medium text-red-500">
                  <BiInfoCircle className="flex-none rotate-180 text-xl" />
                  <p className="flex-auto truncate">{error}</p>
                </div>
              )}
              {message && (
                <div className="mt-2 flex w-full gap-1 rounded-lg border-2 border-emerald-500 bg-emerald-100 p-0.5 text-sm font-medium text-emerald-500">
                  <BiInfoCircle className="flex-none text-xl" />
                  <p className="flex-auto truncate">{message}</p>
                </div>
              )}
              <button
                type="submit"
                disabled={!isValid}
                className="mt-4 rounded-lg border-2 border-gray-600 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-600 hover:text-white"
              >
                Set username
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
