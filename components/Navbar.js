import Link from "next/link";
import React from "react";
import Logo from "../public/greenprint-black.svg";

export default function Navbar() {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center border-b-2 border-gray-100 py-4 px-4">
      <li className="flex items-center">
        <Logo className="relative h-auto" />
      </li>
      <Link href="/login">
        <button className="ml-auto rounded-lg px-3 py-2 font-medium text-gray-600 hover:bg-gray-100">
          Log in
        </button>
      </Link>
      <Link href="/signup">
        <button className="ml-2 h-10 rounded-lg border-2 border-accent px-3 font-medium text-accent transition-colors hover:bg-accent hover:text-white">
          Sign up
        </button>
      </Link>
    </nav>
  );
}
