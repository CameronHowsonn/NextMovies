import { NextApiRequest } from 'next';

export interface RequestBodyTimeframe extends NextApiRequest {
  body: {
    timeframe: 'day' | 'week';
  };
}

export interface RequestBodyId extends NextApiRequest {
  body: {
    id: string;
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
}
