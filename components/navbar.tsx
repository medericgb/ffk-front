"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/user-menu";

export function Navbar() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(sessionStorage.getItem("auth_user"));
  }, [pathname]);

  // Masquer la navbar sur /login ou si l'utilisateur n'est pas connecté
  if (pathname === "/login" || !username) return null;

  return (
    <header className="sticky top-0 z-10 border-b border-[#e0dcd4] bg-[#f5efe6]/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Link
          href="/gallery"
          className="rounded-md px-3 py-2 text-sm font-medium text-[#2d2d2d] transition-colors hover:bg-[#f0b45d]/20 hover:text-[#2d2d2d]"
        >
          Galerie
        </Link>
        <UserMenu />
      </nav>
    </header>
  );
}
