"use client";
import { useEffect } from "react";
import { filters } from "../lib/interfaces";

export async function fetchMedia(
  media: string,
  filters: filters,
  currentPage: number,
  setMedia: any,
  setTotalPages: any,
  setTotalResults: any,
  setLoading: any,
  setError: any
) {
  const buildFilteredURL = () => {
    let url = `https://api.themoviedb.org/3/discover/${media}?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=${filters.sortBy}`;
    if (filters.genre) url += `&with_genres=${filters.genre}`;
    if (filters.yearFrom)
      url += `&primary_release_date.gte=${filters.yearFrom}-01-01`;
    if (filters.yearTo)
      url += `&primary_release_date.lte=${filters.yearTo}-12-31`;
    if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
    return url;
  };

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const url = buildFilteredURL();
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
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, [currentPage, filters]);
}
