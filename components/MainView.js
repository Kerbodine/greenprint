import React from "react";
import SideNav from "./SideNav";

export default function MainView({ children }) {
  return (
    <div className="mx-auto flex h-screen w-screen max-w-5xl">
      <SideNav />
      <div className="ml-[56px] w-full p-4 sm:ml-0 md:p-8">{children}</div>
    </div>
  );
}
