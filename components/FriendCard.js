import React from "react";

export default function FriendCard({ name, email, score }) {
  return (
    <div className="-mx-2 flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-100">
      <div className="no-select grid h-12 w-12 flex-none place-items-center rounded-full bg-accent text-2xl font-medium text-white">
        {name[0]}
      </div>
      <div>
        <p className="font-medium text-gray-700">{name}</p>
        <p className="-mt-1 truncate text-gray-500">{email}</p>
      </div>
      <span className="ml-auto rounded-lg bg-gray-100 px-3 py-1 font-semibold text-gray-700">
        {Math.round(score * 100) / 100} kg
      </span>
    </div>
  );
}
