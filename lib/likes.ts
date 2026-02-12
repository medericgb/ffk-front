"use client";

import type { UnsplashPhoto } from "./unsplash";

/**
 * Récupère les photos likées par l'utilisateur
 */
export async function fetchUserLikes(
  username: string
): Promise<UnsplashPhoto[]> {
  const res = await fetch(`/api/likes?user=${encodeURIComponent(username)}`);
  if (!res.ok) throw new Error("Erreur chargement des favoris");
  const { photos } = await res.json();
  return photos;
}

/**
 * Toggle like pour une photo
 */
export async function toggleLike(
  username: string,
  photo: UnsplashPhoto
): Promise<{ liked: boolean }> {
  const res = await fetch("/api/likes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: username, photo }),
  });
  if (!res.ok) throw new Error("Erreur lors du like");
  const { liked } = await res.json();
  return { liked };
}
