// Header.jsx
"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { Notebook } from "lucide-react";

function Header() {
  const { user } = useUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Notebook className="h-6 w-6 text-blue-600" />
            {user ? (
              <Link href="/">
                <span className="text-xl font-bold text-blue-600">
                  {user?.firstName}
                  {`'s `}Space
                </span>
              </Link>
            ) : (
              <Link href="/">
                <span className="text-xl font-bold text-blue-600">
                  StudyMat
                </span>
              </Link>
            )}
          </div>

          {/* Middle section with breadcrumbs */}
          <div className="hidden md:flex items-center">
            <Breadcrumbs />
          </div>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                <SignInButton />
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
