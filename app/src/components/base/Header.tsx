"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image
              src="/image/izumologo.png"
              alt="Logo"
              width={180}
              height={40}
              className="dark:invert"
            />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
