"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Heart, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UnsplashPhoto } from "@/lib/unsplash";
import { fetchUserLikes, toggleLike } from "@/lib/likes";
import { cn } from "@/lib/utils";

const PER_PAGE = 12;

interface GalleryViewProps {
  initialPage: number;
  photos: UnsplashPhoto[];
  total: number;
  totalPages: number;
  error?: string;
}

interface PhotoCardProps {
  photo: UnsplashPhoto;
  isLiked: boolean;
  onLikeToggle: (photo: UnsplashPhoto) => void;
  currentUser: string | null;
}

function PhotoCard({ photo, isLiked, onLikeToggle, currentUser }: PhotoCardProps) {
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked);

  useEffect(() => {
    setOptimisticLiked(isLiked);
  }, [isLiked]);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) return;
    setOptimisticLiked((prev) => !prev);
    onLikeToggle(photo);
  };

  return (
    <div className="group flex flex-col gap-3">
      {/* Image */}
      <a
        href={photo.urls.regular}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden rounded-lg"
      >
        <img
          src={`${photo.urls.small}&w=600`}
          alt={photo.alt_description ?? `Photo par ${photo.user.name}`}
          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/10 group-hover:opacity-100" />
      </a>

      {/* Info row */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        {/* User info */}
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={photo.user.profile_image?.small ?? `https://ui-avatars.com/api/?name=${photo.user.name}&size=64&background=e8e8e8&color=555`}
            alt={photo.user.name}
            className="size-7 shrink-0 rounded-full object-cover"
          />
          <span className="truncate text-sm font-medium text-foreground/80">
            {photo.user.name}
          </span>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-3 text-muted-foreground">
          {currentUser && (
            <button
              type="button"
              onClick={handleLikeClick}
              className={cn(
                "flex items-center gap-1 text-xs transition-colors",
                optimisticLiked
                  ? "text-red-500"
                  : "hover:text-red-500"
              )}
              aria-label={
                optimisticLiked ? "Retirer des favoris" : "Ajouter aux favoris"
              }
            >
              <Heart
                className={cn(
                  "size-4",
                  optimisticLiked && "fill-current"
                )}
                strokeWidth={optimisticLiked ? 0 : 1.5}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  total,
  baseUrl = "/gallery",
}: {
  currentPage: number;
  totalPages: number;
  total: number;
  baseUrl?: string;
}) {
  const start = (currentPage - 1) * PER_PAGE + 1;
  const end = Math.min(currentPage * PER_PAGE, total);

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const showAdjacent = 1;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > showAdjacent + 2) pages.push("...");

      const startNum = Math.max(2, currentPage - showAdjacent);
      const endNum = Math.min(totalPages - 1, currentPage + showAdjacent);
      for (let i = startNum; i <= endNum; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - showAdjacent - 1) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <nav
      className="flex flex-col items-center gap-4 pt-10"
      aria-label="Pagination"
    >
      <p className="text-sm text-muted-foreground">
        {total > 0 ? `${start}–${end} sur ${total} photos` : "Aucune photo"}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          aria-label="Page précédente"
          disabled={currentPage <= 1}
          asChild={currentPage > 1}
        >
          {currentPage > 1 ? (
            <Link href={`${baseUrl}?page=${currentPage - 1}`}>
              <ChevronLeft className="size-4" />
            </Link>
          ) : (
            <span>
              <ChevronLeft className="size-4" />
            </span>
          )}
        </Button>

        <div className="mx-2 flex items-center gap-0.5">
          {getPageNumbers().map((page, i) =>
            page === "..." ? (
              <span
                key={`ellipsis-${i}`}
                className="px-2 py-1 text-muted-foreground"
              >
                …
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "ghost"}
                size="icon"
                className={cn(
                  "size-9 min-w-9",
                  currentPage === page && "pointer-events-none bg-[#f0b45d] text-[#2d2d2d] hover:bg-[#e8a74e]"
                )}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                asChild={currentPage !== page}
              >
                {currentPage === page ? (
                  <span>{page}</span>
                ) : (
                  <Link href={`${baseUrl}?page=${page}`}>{page}</Link>
                )}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="icon"
          aria-label="Page suivante"
          disabled={currentPage >= totalPages}
          asChild={currentPage < totalPages}
        >
          {currentPage < totalPages ? (
            <Link href={`${baseUrl}?page=${currentPage + 1}`}>
              <ChevronRight className="size-4" />
            </Link>
          ) : (
            <span>
              <ChevronRight className="size-4" />
            </span>
          )}
        </Button>
      </div>
    </nav>
  );
}

export function GalleryView({
  initialPage,
  photos,
  total,
  totalPages,
  error,
}: GalleryViewProps) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Record<string, boolean>>({});
  const [favorites, setFavorites] = useState<UnsplashPhoto[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);

  useEffect(() => {
    setCurrentUser(
      typeof window !== "undefined"
        ? sessionStorage.getItem("auth_user")
        : null
    );
  }, []);

  useEffect(() => {
    if (currentUser && activeTab === "favorites") {
      setIsLoadingFavorites(true);
      fetchUserLikes(currentUser)
        .then((photos) => {
          setFavorites(photos);
          setLikedPhotos((prev) => {
            const next = { ...prev };
            photos.forEach((p) => (next[p.id] = true));
            return next;
          });
        })
        .catch(() => setFavorites([]))
        .finally(() => setIsLoadingFavorites(false));
    }
  }, [currentUser, activeTab]);

  useEffect(() => {
    if (currentUser && activeTab === "all") {
      fetchUserLikes(currentUser).then((photos) => {
        setLikedPhotos((prev) => {
          const next = { ...prev };
          photos.forEach((p) => (next[p.id] = true));
          return next;
        });
      });
    }
  }, [currentUser, activeTab, initialPage]);

  const handleLikeToggle = (photo: UnsplashPhoto) => {
    if (!currentUser) return;
    toggleLike(currentUser, photo)
      .then(({ liked }) => {
        setLikedPhotos((prev) => ({ ...prev, [photo.id]: liked }));
        if (!liked) {
          setFavorites((prev) => prev.filter((p) => p.id !== photo.id));
        } else {
          setFavorites((prev) => [...prev, photo]);
        }
      })
      .catch(() => {
        setLikedPhotos((prev) => ({
          ...prev,
          [photo.id]: !prev[photo.id],
        }));
      });
  };

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
        <div className="rounded-full bg-destructive/10 p-4">
          <ImageIcon className="size-12 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold">Erreur de chargement</h2>
        <p className="max-w-md text-center text-muted-foreground">{error}</p>
      </div>
    );
  }

  const displayPhotos = activeTab === "favorites" ? favorites : photos;

  return (
    <div className="min-h-screen bg-[#f5efe6]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs + Categories */}
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Tabs */}
            <div className="flex gap-1 rounded-full border border-[#e0dcd4] bg-[#f5efe6] p-1 w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={cn(
                  "rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
                  activeTab === "all"
                    ? "bg-[#f0b45d] text-[#2d2d2d]"
                    : "text-[#8a8a8a] hover:text-[#2d2d2d]"
                )}
              >
                Toutes
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("favorites")}
                className={cn(
                  "flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-medium transition-colors",
                  activeTab === "favorites"
                    ? "bg-[#f0b45d] text-[#2d2d2d]"
                    : "text-[#8a8a8a] hover:text-[#2d2d2d]"
                )}
              >
                <Heart className="size-3.5" />
                Favoris
                {favorites.length > 0 && (
                  <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white leading-none">
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Favorites empty states */}
        {activeTab === "favorites" && !currentUser && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/50">
            <Heart className="size-16 text-muted-foreground" />
            <p className="text-center text-muted-foreground">
              Connectez-vous pour voir vos favoris
            </p>
            <Button asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
          </div>
        )}

        {activeTab === "favorites" && currentUser && isLoadingFavorites && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        )}

        {activeTab === "favorites" &&
          currentUser &&
          !isLoadingFavorites &&
          favorites.length === 0 && (
            <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/50">
              <Heart className="size-16 text-muted-foreground" />
              <p className="text-muted-foreground">
                Aucun favori pour le moment
              </p>
              <p className="text-sm text-muted-foreground">
                Cliquez sur le coeur pour ajouter une photo
              </p>
            </div>
          )}

        {/* Photo grid */}
        {((activeTab === "all" && photos.length > 0) ||
          (activeTab === "favorites" &&
            currentUser &&
            !isLoadingFavorites &&
            favorites.length > 0)) && (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {displayPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isLiked={!!likedPhotos[photo.id]}
                  onLikeToggle={handleLikeToggle}
                  currentUser={currentUser}
                />
              ))}
            </div>

            {activeTab === "all" && totalPages > 1 && (
              <Pagination
                currentPage={initialPage}
                totalPages={totalPages}
                total={total}
                baseUrl="/gallery"
              />
            )}
          </>
        )}

        {activeTab === "all" && photos.length === 0 && (
          <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-xl border border-dashed bg-muted/50">
            <ImageIcon className="size-16 text-muted-foreground" />
            <p className="text-muted-foreground">Aucune photo à afficher</p>
          </div>
        )}
      </div>
    </div>
  );
}
