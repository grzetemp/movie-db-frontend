export const MOVIE_GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
] as const;

export type MovieGenre = (typeof MOVIE_GENRES)[number];

export interface Movie {
  id: string;
  title: string;
  releaseDate: string;
  director: string;
  genres: MovieGenre[];
}

export interface MovieFilters {
  title: string;
  releaseDate: string;
  genre: MovieGenre | '';
}
