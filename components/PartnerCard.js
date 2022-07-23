import React from "react";

export default function PartnerCard({ image, title, description }) {
  return (
    <div className="w-full space-y-2 rounded-lg border-2 border-gray-200 p-3 hover:shadow-lg">
      <div className="flex aspect-square w-full items-center overflow-hidden rounded-md bg-gray-100">
        <img src={image} alt={title} />
      </div>
      <p className="text-lg font-semibold tracking-tight text-gray-700">
        {title}
      </p>
      <p className="text-sm leading-4 text-gray-500">{description}</p>
    </div>
  );
}
