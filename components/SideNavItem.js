import Link from "next/link";
import { useRouter } from "next/router";
import { useView } from "../contexts/ViewContext";

export default function SideNavItem({ icon, title, link }) {
  const { sideNav } = useView();
  const router = useRouter();

  return (
    <Link href={link}>
      <div
        className={`${
          router.pathname === link && "!bg-accent !text-white"
        } noselect no-select flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg fill-gray-500 px-1.5 text-gray-600 hover:bg-gray-100`}
      >
        <span className="flex-none text-xl">{icon}</span>
        <p
          className={`${
            !sideNav && "hidden sm:block"
          } flex-auto truncate text-sm font-medium`}
        >
          {title}
        </p>
      </div>
    </Link>
  );
}
