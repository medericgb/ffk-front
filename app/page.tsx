"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    setUsername(sessionStorage.getItem("auth_user"));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth_user");
    document.cookie = "auth_user=; path=/; max-age=0";
    setUsername(null);
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6">
      <main className="w-full max-w-md animate-in fade-in duration-300">
        {username ? (
          <div className="rounded-lg border bg-card p-8 shadow-sm">
            <h1 className="text-2xl font-bold">
              Bienvenue, {username} !
            </h1>
            <p className="mt-2 text-muted-foreground">
              Vous êtes connecté avec succès.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-8 shadow-sm text-center">
            <h1 className="text-2xl font-bold">Bienvenue</h1>
            <p className="mt-2 text-muted-foreground">
              Connectez-vous pour accéder à votre compte.
            </p>
            <Button asChild className="mt-6">
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
