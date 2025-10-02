"use client";

import Link from "next/link";

interface tvShow {
  id: number;
  title: string;
  vote_average: number;
  original_language: string;
  backdrop_path: string;
}

interface tvShowProps {
  tvShow: tvShow;
}

export default function TvShowListing({ tvShow }: tvShowProps) {
  console.log(tvShow);
  const backdropUrl = `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`;
  const slug = tvShow.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <Link href={`/tv-shows/${slug}?id=${tvShow.id}`} passHref>
      <div
        className="relative h-48 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-brand/20 group"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
          <h3 className="text-lg font-bold mb-2 group-hover:text-[#0DCAF0] transition-colors">
            {tvShow.title}
          </h3>
          <div className="flex justify-between items-center text-sm">
            <span className="bg-yellow-500 text-black px-2 py-1 rounded">
              ⭐ {tvShow.vote_average.toFixed(1)}
            </span>
            <span className="bg-white/20 px-2 py-1 rounded uppercase">
              {tvShow.original_language}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
