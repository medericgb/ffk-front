import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { UnsplashPhoto } from "@/lib/unsplash";

/** Structure: { [username]: { [photoId]: UnsplashPhoto } } */
type LikesData = Record<string, Record<string, UnsplashPhoto>>;

const LIKES_FILE = path.join(process.cwd(), "data", "likes.json");

async function readLikes(): Promise<LikesData> {
  try {
    const data = await fs.readFile(LIKES_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeLikes(data: LikesData): Promise<void> {
  await fs.mkdir(path.dirname(LIKES_FILE), { recursive: true });
  await fs.writeFile(LIKES_FILE, JSON.stringify(data, null, 2), "utf-8");
}

/**
 * GET /api/likes?user=username
 * Retourne les IDs des photos likées par l'utilisateur
 */
export async function GET(request: NextRequest) {
  const user = request.nextUrl.searchParams.get("user");
  if (!user) {
    return NextResponse.json(
      { error: "Paramètre user requis" },
      { status: 400 }
    );
  }

  const likes = await readLikes();
  const userLikes = likes[user] ?? {};
  const photos = Object.values(userLikes);

  return NextResponse.json({ photos });
}

/**
 * POST /api/likes
 * Body: { user: string, photo: UnsplashPhoto } | { user: string, photoId: string }
 * Toggle like: ajoute si pas liké, retire si déjà liké
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user, photo, photoId } = body;

    if (!user) {
      return NextResponse.json(
        { error: "Paramètre user requis" },
        { status: 400 }
      );
    }

    const likes = await readLikes();
    const userLikes = likes[user] ?? {};

    const id = photo?.id ?? photoId;
    if (!id) {
      return NextResponse.json(
        { error: "photo ou photoId requis" },
        { status: 400 }
      );
    }

    const wasLiked = !!userLikes[id];
    if (wasLiked) {
      delete userLikes[id];
    } else {
      if (!photo) {
        return NextResponse.json(
          { error: "Objet photo complet requis pour ajouter un like" },
          { status: 400 }
        );
      }
      userLikes[id] = photo;
    }

    likes[user] = userLikes;
    await writeLikes(likes);

    return NextResponse.json({
      liked: !wasLiked,
      likes: Object.keys(userLikes),
    });
  } catch (e) {
    console.error("API likes error:", e);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
