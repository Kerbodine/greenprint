import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | GreenPrint</title>
      </Head>
      <Navbar />
      <div className="mx-auto w-full max-w-6xl px-8">
        <div className="flex flex-col-reverse items-center pt-24 lg:flex-row">
          <div className="flex-1">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
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
              <Link href="/signup">
                <button className="rounded-lg bg-accent px-4 py-2 text-lg font-medium text-white transition-colors hover:bg-emerald-700">
                  Get started →
                </button>
              </Link>
              <button className="rounded-lg border-2 border-accent px-4 py-2 text-lg font-medium text-accent transition-colors hover:bg-accent/20">
                Learn more
              </button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="/greenprint-cover.svg"
              alt="GreenPrint"
              width={640}
              height={480}
            />
          </div>
        </div>
      </div>
    </>
  );
}
