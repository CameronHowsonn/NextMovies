import React, { useEffect, useState } from 'react';
import BrowseHero from '../components/browse/hero';
import FullWidthSlider from '../components/full-width-slider';
import { MovieItem } from '../types/movies';
import { PersonDetails } from '../types/people';

const Index: React.FC = () => {
  const [upcomingFilms, setUpcomingFilms] = useState<MovieItem[]>(null);
  const [topRatedFilms, setTopRatedFilms] = useState<MovieItem[]>(null);
  const [getTrendingTv, setGetTrendingTv] = useState(null);
  const [trendingPeople, setTrendingPeople] = useState<PersonDetails[]>(null);

  useEffect(() => {
    fetch('/api/movies/get-upcoming', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page: '1' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUpcomingFilms(data.results);
      })
      .then(() => {
        fetch('/api/movies/get-top-rated', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setTopRatedFilms(data.results);
          });
      })
      .then(() => {
        fetch('/api/tv/get-trending', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ timeframe: 'week' }),
        })
          .then((res) => res.json())
          .then((data) => {
            setGetTrendingTv(data.results);
          });
      })
      .then(() => {
        fetch('/api/people/get-trending', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ timeframe: 'week', page: 1 }),
        })
          .then((res) => res.json())
          .then((data) => {
            setTrendingPeople(data.results);
          });
      });
  }, []);

  return (
    <>
      <BrowseHero />
      {upcomingFilms && (
        <FullWidthSlider
          data={upcomingFilms}
          title='Upcoming Films'
          subtitle='New releases'
          slidesPerView={5}
          showReleaseDate={true}
          type={'movie'}
        />
      )}
      {topRatedFilms && (
        <FullWidthSlider
          data={topRatedFilms}
          title='Top Rated Films'
          subtitle='All fime favourites'
          slidesPerView={5}
          showReleaseDate={true}
          type={'movie'}
        />
      )}
      {getTrendingTv && (
        <FullWidthSlider
          data={getTrendingTv}
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
