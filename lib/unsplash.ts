const UNSPLASH_API = "https://api.unsplash.com";

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string | null;
  description: string | null;
  likes: number;
  user: {
    name: string;
    username: string;
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
  };
  width: number;
  height: number;
}

export interface UnsplashPhotosResponse {
  photos: UnsplashPhoto[];
  total: number;
  perPage: number;
}

export async function fetchPhotos(
  page = 1,
  perPage = 12
): Promise<UnsplashPhotosResponse> {
  const accessKey =
    process.env.UNSPLASH_ACCESS_KEY ?? process.env.ACCESS_KEY;
  if (!accessKey) {
    throw new Error(
      "UNSPLASH_ACCESS_KEY ou ACCESS_KEY manquant. Ajoutez-la dans .env.local. Créez un compte sur https://unsplash.com/developers"
    );
  }

  const url = new URL(`${UNSPLASH_API}/photos`);
  url.searchParams.set("client_id", accessKey);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));

  const res = await fetch(url.toString(), {
    headers: { "Accept-Version": "v1" },
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(
      res.status === 401
        ? "Clé API Unsplash invalide"
        : `Erreur Unsplash: ${res.status} - ${error}`
    );
  }

  const photos = (await res.json()) as UnsplashPhoto[];
  const total = parseInt(res.headers.get("X-Total") ?? "0", 10);

  return { photos, total, perPage };
}
