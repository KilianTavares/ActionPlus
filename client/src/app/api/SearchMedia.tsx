"use client";
import { useEffect } from "react";

export async function SearchMedia(
  query: string,
  mediaType: string,
  submitting: boolean
) {
  try {
    const singleMediadetailUrl = `https://api.themoviedb.org/3/search/${mediaType}?query=${query}}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };
    const singleMediaDetailResponse = await fetch(
      singleMediadetailUrl,
      options
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const detailsData = await singleMediaDetailResponse.json();

    const singleMediaUrl = `https://api.themoviedb.org/3/${mediaType}/${detailsData.id}`;
    const singleMediaResponse = await fetch(singleMediaUrl, options);

    return await singleMediaResponse.json();
  } catch (err) {
    return new Error("Network response was not ok");
  }
}

useEffect(() => {
  SearchMedia();
}, [submitting]);
