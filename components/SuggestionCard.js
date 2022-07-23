import React from "react";
import { BiTrain } from "react-icons/bi";

export default function SuggestionCard() {
  return (
    <div className="flex w-full items-center rounded-lg p-3 hover:bg-gray-50">
      <div className="mr-3 grid h-12 w-12 place-items-center rounded-lg bg-amber-100 text-3xl text-amber-500">
        <BiTrain />
      </div>
      <p className="font-medium text-gray-700">Take public transportation</p>
    </div>
  );
}
