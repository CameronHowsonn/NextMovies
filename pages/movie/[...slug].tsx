import { GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FullWidthSlider from '../../components/full-width-slider';
import MovieHero from '../../components/movie-hero';
import MovieStats from '../../components/movie-stats';
import Reviews from '../../components/reviews';
import { MovieItem, Review } from '../../types/movies';

interface MovieSlugProps {
  movieData: MovieItem;
  movieCredits: any;
  similarMovies: MovieItem[];
  movieImages: any;
  movieReviews: Review[];
  errors: string[];
}

const MovieSlug: React.FC<MovieSlugProps> = ({
  movieData,
  movieCredits,
  similarMovies,
  movieImages,
  movieReviews,
  errors,
}) => {
  useEffect(() => {
    errors.forEach((error) => {
      toast.error(error);
    });
  }, [errors]);

  return (
    <>
      {movieData && <MovieHero filmData={movieData} />}
      <MovieContainer>
        {movieData && movieCredits && (
          <FullWidthSlider
            data={movieCredits}
            title='Cast'
            subtitle='Actors and Actresses'
            slidesPerView={4}
            showReleaseDate={false}
            type={'person'}
            minHeight={450}
            dropDownOptions={['actors', 'staff']}
          />
        )}
        {movieData && <MovieStats {...movieData} />}
      </MovieContainer>
      {movieReviews && <Reviews reviews={movieReviews} />}
      {similarMovies && (
        <FullWidthSlider
          data={similarMovies}
          title='Similar Movies'
          subtitle='Movies you might like'
          slidesPerView={4}
          showReleaseDate={true}
          type={'movie'}
        />
      )}
    </>
  );
};

export default MovieSlug;

const MovieContainer = styled.div`
  display: grid;
  grid-template-columns: auto 25%;
`;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl,
}) => {
  const id = resolvedUrl.split('/')[2];
  let errors = [];

  const movieData = await fetch(
    `${process.env.NEXTAUTH_URL}/api/movies/get-film-by-id`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      errors.push('Cannot fetch movie data.');
    });

  const movieCredits = await fetch(
    `${process.env.NEXTAUTH_URL}/api/movies/get-film-credits`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.cast)
    .catch((err) => {
      console.log(err);
      errors.push('Cannot fetch movie credits.');
    });

  const similarMovies = await fetch(
    `${process.env.NEXTAUTH_URL}/api/movies/get-similar`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => {
      console.log(err);
      errors.push('Cannot fetch similar movies.');
    });

  const movieImages = await fetch(
    `${process.env.NEXTAUTH_URL}/api/movies/get-film-images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      errors.push('Cannot fetch movie images.');
    });

  const movieReviews = await fetch(
    `${process.env.NEXTAUTH_URL}/api/movies/get-reviews`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((err) => {
      console.log(err);
      errors.push('Cannot fetch movie reviews.');
    });

  return {
    props: {
      movieData,
      movieCredits,
      similarMovies,
      movieImages,
      movieReviews,
      errors,
    },
  };
};
