"use client";

import { getUser } from "./db";

export type AuthResult =
  | { success: true; username: string }
  | { success: false; error: "blocked" | "invalid" };

export const AUTH_ERRORS = {
  blocked: "Ce compte a été bloqué.",
  invalid: "Informations de connexion invalides",
} as const;

export function authenticate(
  username: string,
  password: string
): AuthResult {
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (!trimmedUsername || !trimmedPassword) {
    return { success: false, error: "invalid" };
  }

  const user = getUser(trimmedUsername);

  if (!user) {
    return { success: false, error: "invalid" };
  }

  if (user.password !== trimmedPassword) {
    return { success: false, error: "invalid" };
  }

  if (user.status === "Bloqué") {
    return { success: false, error: "blocked" };
  }

  return { success: true, username: user.username };
}
