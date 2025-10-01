"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SelectedMovieProps {
  id: number;
  title: string;
  vote_average: number;
  original_language: string;
  backdrop_path: string;
}

export default function Page() {
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovieProps | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const searchParams = useSearchParams();
  const movieTitle = searchParams.get("title");
  const params = useParams();
  const title = (params.slug as string)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=1`;

  useEffect(() => {
    const fetchSelectedMovie = async () => {
      setLoading(true);
      try {
        const url = url;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        };
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setSelectedMovie(data.results);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchSelectedMovie();
  }, []);
  if (loading)
    return (
      <>
        <section id="Hero" className=" max-w-xl flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-5">
            <h1 className="text-7xl text-[#0DCAF0] font-bold">Movies</h1>
            <p>
              Browse through your favourite movies, or find new ones to enjoy.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0DCAF0] mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading movies...</p>
            </div>
          </div>
        </section>
      </>
    );

  if (error)
    return (
      <>
        <section id="Hero" className=" max-w-xl flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-5">
            <h1 className="text-7xl text-[#0DCAF0] font-bold">Movies</h1>
            <p>
              Browse through your favourite movies, or find new ones to enjoy.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="text-center bg-red-900/20 border border-red-500 rounded-lg p-8">
              <div className="text-red-400 text-6xl mb-4">⚠</div>
              <h2 className="text-white text-2xl font-bold mb-2">
                Error Loading Movies
              </h2>
              <p className="text-red-300">{error.message}</p>
            </div>
          </div>
        </section>
      </>
    );
  return <div className="text-white">Movie: {title}</div>;
}
