"use client";

import { ViewTransition } from "react";
import { usePathname } from "next/navigation";

export function ViewTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return <ViewTransition key={pathname}>{children}</ViewTransition>;
}
