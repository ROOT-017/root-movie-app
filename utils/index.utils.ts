import { IMAGE_BASE_URL } from "@/constants/constant";

export const CreateImageUri = (path: string) => IMAGE_BASE_URL + path;

export const CreateGenreListFromMovies = (
  genreList: Genres[],
  movie: Movie
) => {
  const genreMap: Record<number, string> = {};
  genreList.forEach((genre) => {
    genreMap[genre.id] = genre.name;
  });

  return movie.genre_ids.map((id) => genreMap[id]).filter(Boolean);
};
