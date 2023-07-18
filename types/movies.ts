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
