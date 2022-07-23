import Head from "next/head";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | GreenPrint</title>
      </Head>
      <Navbar />
      <div className="mx-auto mt-24 w-full max-w-7xl">
        <div className="flex pt-24">
          <div className="flex-1">
            <h1 className="text-5xl font-bold tracking-tight">
              Never worry about your{" "}
              <span className="text-accent underline decoration-accent/30 underline-offset-2">
                Carbon Footprint
              </span>{" "}
              again
            </h1>
            <p className="mt-8 text-xl font-medium tracking-tight text-gray-700">
              Climate action is just one click away.
            </p>
            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-accent px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-emerald-700">
                Get started →
              </button>
              <button className="rounded-lg border-2 border-accent px-4 py-2 text-lg font-medium text-accent transition-colors hover:bg-accent/20">
                Learn more
              </button>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </>
  );
}
