"use client";

import BackgroundContainer from "../components/serverSide/BackgroundContainer";
import ActionButton from "../components/clientSide/ActionButton";
import MovieListing from "../components/clientSide/MovieListing";
import { useState, useEffect } from "react";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(process.env.NEXT_PUBLIC_TMDB_API_KEY);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url =
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
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
        setMovies(data.results);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  console.log(movies);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <BackgroundContainer backgroundImage="https://image.tmdb.org/t/p/original/wJ20rOZ1VgkCqv1jeOQB2Brny9k.jpg?w=1920&h=1080">
        <section id="Hero" className=" max-w-xl flex flex-col gap-5 text-white">
          <div className="flex flex-col gap-5">
            <h1 className="text-7xl text-[#0DCAF0] font-bold">Action+</h1>
            <p>Your Ultimate Streaming Experience</p>
            <p>
              Discover thousands of movies and TV shows, all in one place.
              Stream your favorite content in high quality, completely free.
            </p>
          </div>
        </section>
      </BackgroundContainer>

      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">Popular Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieListing key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </>
  );
}
