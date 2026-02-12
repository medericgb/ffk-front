"use client";

const USERS_STORAGE_KEY = "ffk_users";

export type UserStatus = "Actif" | "Bloqué";

export interface UserRecord {
  username: string;
  password: string;
  status: UserStatus;
}

const DEFAULT_USERS: UserRecord[] = [
  { username: "muser1", password: "mpassword1", status: "Actif" },
  { username: "muser2", password: "mpassword2", status: "Actif" },
  { username: "muser3", password: "mpassword3", status: "Bloqué" },
];

function getUsers(): UserRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Fallback to default
  }
  initUsers();
  return DEFAULT_USERS;
}

function initUsers(): void {
  if (typeof window === "undefined") return;
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    }
  } catch {
    // Ignore
  }
}

initUsers();

export function getUser(username: string): UserRecord | null {
  const users = getUsers();
  return users.find((u) => u.username === username.trim()) ?? null;
}
