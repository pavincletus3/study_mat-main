"use client";
import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDocumentData } from "react-firebase-hooks/firestore";

function SidebarOption({ href, id }: { href: string; id: string }) {
  //useDocumentData from firebase
  const [data, loading, error] = useDocumentData(doc(db, "Documents", id));
  const pathname = usePathname();
  //check if the current path is the same as the href and if it is not the home page
  const isActive = href.includes(pathname) && pathname !== "/";

  if (!data) {
    return null;
  }

  return (
    <Link
      href={href}
      className={`block border-2 p-2.5 rounded-md transition-all duration-200 hover:border-blue-400 ${
        isActive
          ? "bg-blue-50 border-blue-500 font-medium"
          : "border-gray-300 hover:bg-gray-50"
      }`}
    >
      <p className="truncate text-sm">{data.title}</p>
    </Link>
  );
}

export default SidebarOption;
