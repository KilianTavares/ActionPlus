"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SelectedMovieProps {
  id: number;
  title: string;
  vote_average: number;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function Page() {
  const [selectedMovie, setSelectedMovie] = useState<SelectedMovieProps | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const searchParams = useSearchParams();
  const movieId = searchParams.get("id");

  useEffect(() => {
    const fetchSelectedMovie = async () => {
      setLoading(true);
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
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
        setSelectedMovie(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    if (movieId) {
      fetchSelectedMovie();
    }
  }, [movieId]);
  console.log(selectedMovie);
  if (loading)
    return (
      <>
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0DCAF0] mx-auto mb-4"></div>
              <p className="text-white text-xl">Loading movie...</p>
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
  return (
    <div className="min-h-screen bg-black">
      {selectedMovie && (
        <>
          <div
            className="relative h-96 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 flex items-end">
              <div className="max-w-6xl mx-auto px-6 py-12 flex gap-8">
                <img
                  src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                  className="w-64 h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="text-white flex-1">
                  <h1 className="text-5xl font-bold mb-4">
                    {selectedMovie.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-yellow-500 text-black px-3 py-1 rounded font-bold">
                      ⭐ {selectedMovie.vote_average.toFixed(1)}
                    </span>
                    <span>{selectedMovie.release_date}</span>
                    <span>{selectedMovie.runtime} min</span>
                  </div>
                  <div className="flex gap-2 mb-4">
                    {selectedMovie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-[#0DCAF0] px-3 py-1 rounded text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg leading-relaxed">
                    {selectedMovie.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
