"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(sessionStorage.getItem("auth_user"));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth_user");
    document.cookie = "auth_user=; path=/; max-age=0";
    window.location.href = "/login";
  };

  if (!username) return null;

  return (
    <div className="ml-auto flex items-center gap-3">
      <span className="text-sm font-medium text-[#2d2d2d]">{username}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLogout}
        className="gap-1.5 rounded-full bg-[#f0b45d] px-4 text-[#2d2d2d] hover:bg-[#e8a74e] hover:text-[#2d2d2d]"
      >
        <LogOut className="size-4" />
        Déconnexion
      </Button>
    </div>
  );
}
