import { GetServerSideProps } from 'next';
import React from 'react';
import BrowseHero from '../components/browse/hero';
import FullWidthSlider from '../components/full-width-slider';
import { MovieItem } from '../types/movies';
import { PersonDetails } from '../types/people';

interface IndexProps {
  upcomingMovies: MovieItem[];
  topRatedMovies: MovieItem[];
  trendingTv: MovieItem[];
  trendingPeople: PersonDetails[];
}

const Index: React.FC<IndexProps> = ({
  upcomingMovies,
  topRatedMovies,
  trendingTv,
  trendingPeople,
}) => {
  return (
    <>
      <BrowseHero />
      {upcomingMovies && (
        <FullWidthSlider
          data={upcomingMovies}
          title='Upcoming Films'
          subtitle='New releases'
          slidesPerView={5}
          showReleaseDate={true}
          type={'movie'}
        />
      )}
      {topRatedMovies && (
        <FullWidthSlider
          data={topRatedMovies}
          title='Top Rated Films'
          subtitle='All fime favourites'
          slidesPerView={5}
          showReleaseDate={true}
          type={'movie'}
        />
      )}
      {trendingTv && (
        <FullWidthSlider
          data={trendingTv}
          title='Trending TV'
          subtitle='What everyone is watching'
          slidesPerView={2}
          showReleaseDate={false}
          type={'tv'}
        />
      )}
      {trendingPeople && (
        <FullWidthSlider
          data={trendingPeople}
          title='Trending People'
          subtitle='People in the news'
          slidesPerView={5}
          showReleaseDate={false}
          type={'person'}
        />
      )}
    </>
  );
};

export default Index;

// convert the data in the useEffect to GetServerSideProps
export const getServerSideProps: GetServerSideProps = async () => {
  const upcomingMovies = await fetch(
    `${process.env.NEXTAUTH_URL}/api/movies/get-upcoming`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: '1' }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.results);

  const topRatedMovies = await fetch(
    `${process.env.NEXTAUTH_URL}/api/movies/get-top-rated`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => data.results);
  const trendingTv = await fetch(
    `${process.env.NEXTAUTH_URL}/api/tv/get-trending`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timeframe: 'week' }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.results);
  const trendingPeople = await fetch(
    `${process.env.NEXTAUTH_URL}/api/people/get-trending`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timeframe: 'week', page: 1 }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.results);

  return {
    props: {
      upcomingMovies,
      topRatedMovies,
      trendingTv,
      trendingPeople,
    },
  };
};
