import React, { useEffect, useState } from 'react';
import BrowseHero from '../components/browse/hero';
import { MovieItem } from '../types/movies';
import FullWidthSlider from '../components/full-width-slider';

const Index: React.FC = () => {
  const [upcomingFilms, setUpcomingFilms] = useState<MovieItem[]>(null);

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
        console.log(data.results.length);
        setUpcomingFilms(data.results);
      });
  }, []);

  return (
    <>
      <BrowseHero />
      <FullWidthSlider
        data={upcomingFilms}
        title='Upcoming Films'
        slidesPerView={6}
      />
    </>
  );
};

export default Index;
