import Head from "next/head";
import React, { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import FriendCard from "../components/FriendCard";
import { useAuth } from "../contexts/AuthContext";

export default function Friends() {
  const { userData, addFriend } = useAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleAddFriend = async (e) => {
    e.preventDefault();
    setEmail("");
    setMessage("");
    const message = await addFriend(email);
    setMessage(message);
  };

  return (
    <>
      <Head>
        <title>Friends | GreenPrint</title>
      </Head>
      <h1 className="text-2xl font-bold tracking-tight">Friends:</h1>
      <div className="mt-4">
        {userData.friends ? (
          userData.friends.map((friend) => (
            <FriendCard
              key={friend.id}
              id={friend.id}
              name={friend.displayName}
              email={friend.email}
              score={friend.score}
            />
          ))
        ) : (
          <p>No friends yet</p>
        )}
      </div>
      <form className="mt-4 flex" onSubmit={handleAddFriend}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter friend email"
          className="mr-3 rounded-lg bg-gray-100 px-3 py-1.5 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg border-2 border-accent px-3 py-1.5 font-medium text-accent transition-colors hover:bg-accent hover:text-white"
        >
          Add friend
        </button>
      </form>
      {message && (
        <span className="mt-2 flex items-center gap-1 rounded-lg border-2 border-gray-400 bg-gray-100 px-2 py-1 text-sm font-semibold text-gray-500">
          <BiInfoCircle className="-ml-1 text-xl" />
          {message}
        </span>
      )}
    </>
  );
}
