import { NextApiRequest } from 'next';

export interface RequestBodyTimeframe extends NextApiRequest {
  body: {
    timeframe: 'day' | 'week';
  };
}

export interface RequestBodyTimeframePage extends NextApiRequest {
  body: {
    timeframe: 'day' | 'week';
    page: number;
  };
}

export interface RequestBodyId extends NextApiRequest {
  body: {
    id: string;
  };
}

export interface RequestBodyLists extends NextApiRequest {
  body: {
    lists: {
      id: string;
      name: string;
      films: string[];
    }[];
  };
}

export interface RequestBodyIdPageSort extends NextApiRequest {
  body: {
    id: string;
    page: number;
    sortBy:
      | 'popularity.desc'
      | 'popularity.asc'
      | 'revenue.asc'
      | 'revenue.desc'
      | 'primary_release_date.asc'
      | 'primary_release_date.desc'
      | 'vote_average.asc'
      | 'vote_average.desc'
      | 'vote_count.asc'
      | 'vote_count.desc';
  };
}

export interface Movie {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline?: string;
}

export interface ExternalIds {
  id: number;
  imdb_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
  freebase_mid: string;
  freebase_id: string;
  tvdb_id: number;
}

export interface MovieCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew extends Omit<Cast, 'cast_id' | 'character'> {
  department: string;
  job: string;
}

export interface MovieGenres {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Images {
  id: number;
  backdrops: Image[];
  posters: Image[];
}

export interface Image {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface MovieReviews {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface Videos {
  id: number;
  results: Video[];
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}
