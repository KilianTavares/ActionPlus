"use client";

import BackgroundContainer from "../components/serverSide/BackgroundContainer";
import ActionButton from "../components/clientSide/ActionButton";
import TvShowListing from "../components/clientSide/TvShowListing";
import { useState, useEffect } from "react";
import PaginationControls from "../components/clientSide/PaginationControls";
import FilterControls from "../components/clientSide/FilterControls";
import { fetchMedia } from "../api/FetchMedia";

export default function TvShows() {
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState({
    genre: "",
    sortBy: "popularity.desc",
    yearFrom: undefined as number | undefined,
    yearTo: undefined as number | undefined,
    rating: undefined as number | undefined,
  });
  
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/tv-show/list?language=en-US",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            },
          }
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMedia(
      "tv",
      filters,
      currentPage,
      setTvShows,
      setTotalPages,
      setTotalResults,
      setLoading,
      setError
    );
  }, [currentPage, filters]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleGoToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      genre: "",
      sortBy: "popularity.desc",
      yearFrom: undefined,
      yearTo: undefined,
      rating: undefined,
    });
    setCurrentPage(1);
  };

  const filterConfig = {
    genres,
    sortOptions: [
      { id: "popularity.desc", name: "Most Popular" },
      { id: "vote_average.desc", name: "Highest Rated" },
      { id: "primary_release_date.desc", name: "Newest" },
      { id: "primary_release_date.asc", name: "Oldest" },
    ],
    yearRange: { min: 1900, max: new Date().getFullYear() },
    ratingRange: { min: 0, max: 10 },
  };
  console.log(tvShows);

  if (loading)
    return (
      <>
        <BackgroundContainer backgroundImage="https://image.tmdb.org/t/p/original/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg?w=1920&h=1080">
          <section
            id="Hero"
            className=" max-w-xl flex flex-col gap-5 text-white"
          >
            <div className="flex flex-col gap-5">
              <h1 className="text-7xl text-[#0DCAF0] font-bold">Tv-Shows</h1>
              <p>
                Browse through your favourite Tv-Shows, or find new ones to
                enjoy.
              </p>
            </div>
          </section>
        </BackgroundContainer>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0DCAF0] mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading Tv-Shows...</p>
            </div>
          </div>
        </section>
      </>
    );

  if (error)
    return (
      <>
        <BackgroundContainer backgroundImage="https://image.tmdb.org/t/p/original/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg?w=1920&h=1080">
          <section
            id="Hero"
            className=" max-w-xl flex flex-col gap-5 text-white"
          >
            <div className="flex flex-col gap-5">
              <h1 className="text-7xl text-[#0DCAF0] font-bold">Tv-Shows</h1>
              <p>
                Browse through your favourite Tv-Shows, or find new ones to
                enjoy.
              </p>
            </div>
          </section>
        </BackgroundContainer>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="text-center bg-red-900/20 border border-red-500 rounded-lg p-8">
              <div className="text-red-400 text-6xl mb-4">⚠</div>
              <h2 className="text-white text-2xl font-bold mb-2">
                Error Loading Tv-Shows
              </h2>
              <p className="text-red-300">{error.message}</p>
            </div>
          </div>
        </section>
      </>
    );
  return (
    <>
      <BackgroundContainer backgroundImage="https://image.tmdb.org/t/p/original/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg?w=1920&h=1080">
        <section id="Hero" className=" max-w-xl flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-5">
            <h1 className="text-7xl text-[#0DCAF0] font-bold">Tv-Shows</h1>
            <p>
              Browse through your favourite Tv-Shows, or find new ones to enjoy.
            </p>
          </div>
        </section>
      </BackgroundContainer>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Tv-Shows</h2>
          <p className="text-white">
            {totalResults.toLocaleString()} total results
          </p>
        </div>

        <FilterControls
          filters={filterConfig}
          values={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {loading ? (
          <div className="text-white text-center py-12">
            Loading Tv-Shows...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tvShows.map((tvShow) => (
              <TvShowListing key={tvShow.id} tvShow={tvShow} />
            ))}
          </div>
        )}

        <div className="mt-8">
          <div className="flex justify-center mb-4">
            <input
              type="number"
              min="1"
              max={totalPages}
              placeholder="Go to page"
              className="px-3 py-2 bg-gray-800 text-white rounded mr-2 w-32"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  handleGoToPage(page);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
          </div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            onPageClick={handlePageClick}
          />
        </div>
      </section>
    </>
  );
}
