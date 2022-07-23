import React from "react";
import SideNav from "./SideNav";

export default function MainView({ children }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideNav />
      {children}
    </div>
  );
}
