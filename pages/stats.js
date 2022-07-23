import Head from "next/head";
import React from "react";

export default function Stats() {
  return (
    <>
      <Head>
        <title>Settings | GreenPrint</title>
      </Head>
      <iframe
        src="https://app.electricitymaps.com/map?utm_source=electricitymap.org&utm_medium=website&utm_campaign=menu"
        frameborder="0"
        className="h-full w-full rounded-lg border-2 border-gray-200"
      ></iframe>
    </>
  );
}
