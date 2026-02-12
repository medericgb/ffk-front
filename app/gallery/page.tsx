import { Metadata } from "next";
import { GalleryView } from "./gallery-view";
import { fetchPhotos } from "@/lib/unsplash";

export const metadata: Metadata = {
  title: "Galerie photos | Unsplash",
  description: "Explorer les photos Unsplash",
};

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const PER_PAGE = 12;
const MAX_PAGES = 10;
const TOTAL_IMAGES = PER_PAGE * MAX_PAGES; // 120 images max

export default async function GalleryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.min(
    MAX_PAGES,
    Math.max(1, parseInt(params.page ?? "1", 10) || 1)
  );

  let photos: Awaited<ReturnType<typeof fetchPhotos>>["photos"] = [];
  let error: string | undefined;

  try {
    const data = await fetchPhotos(page, PER_PAGE);
    photos = data.photos;
  } catch (e) {
    error = e instanceof Error ? e.message : "Une erreur est survenue";
  }

  return (
    <GalleryView
      initialPage={page}
      photos={photos}
      total={TOTAL_IMAGES}
      totalPages={MAX_PAGES}
      error={error}
    />
  );
}
