import { TMBD_BASE_URL } from "@/constants/constant";

export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  BASE_URL: TMBD_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1`;

  const response = await fetch(`${endpoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });
  if (!response.ok) {
    //@ts-ignore
    throw new Error("Network response was not ok", response.statusText);
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${id}?language=en-US`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed to fetch movie details", response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error fetching movie details:", err);
    throw err;
  }
};

export const getGenres = async (): Promise<Genres[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/genre/movie/list?language=en-US`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      //@ts-ignore
      throw new Error("Failed to fetch genres", response.statusText);
    }
    const data = await response.json();
    return data.genres;
  } catch (err) {
    console.error("Error fetching genres:", err);
    throw err;
  }
};

export const fetchMoviesByIds = async (ids: number[]): Promise<Movie[]> => {
  try {
    return await Promise.all(
      ids.map((id) =>
        fetch(`${TMDB_CONFIG.BASE_URL}/movie/${id}`, {
          method: "GET",
          headers: TMDB_CONFIG.headers,
        }).then(async (res) => await res.json())
      )
    );
  } catch (err) {
    console.error("Error fetching movies by ids:", err);
    throw err;
  }
};
