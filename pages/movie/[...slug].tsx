import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FullWidthSlider from '../../components/full-width-slider';
import MovieHero from '../../components/movie-hero';
import MovieStats from '../../components/movie-stats';
import Reviews from '../../components/reviews';
import { MovieItem, MovieReviews, Review } from '../../types/movies';

const MovieSlug = () => {
  const router = useRouter();
  const [filmData, setFilmData] = useState<MovieItem>(null);
  const [credits, setCredits] = useState(null);
  const [reviews, setReviews] = useState<Review[]>(null);
  const [error, setError] = useState(false);
  const [filmId, setFilmId] = useState(null);
  const [similar, getSimilar] = useState(null);
  const [images, getImages] = useState(null);

  useEffect(() => {
    setFilmId(router?.query?.slug);
  }, [router?.query?.slug]);

  useEffect(() => {
    const getData = async () => {
      await fetch(`/api/movies/get-film-by-id`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: filmId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFilmData(data);
        })
        .catch((err) => {
          setError(true);
          toast.error('Cannot fetch movie data.');
        });
      await fetch(`/api/movies/get-film-credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: filmId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setCredits(data.cast);
        })
        .catch((err) => {
          setError(true);
          toast.error('Cannot fetch movie data.');
        });
      // Get recommendations for the movie
      await fetch(`/api/movies/get-similar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: filmId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          getSimilar(data.results);
        })
        .catch((err) => {
          setError(true);
          toast.error('Cannot fetch movie data.');
        });
      // get-film-images
      await fetch(`/api/movies/get-film-images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: filmId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          getImages(data);
          console.log(data);
        });

      // api/movies/get-reviews
      await fetch(`/api/movies/get-reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: filmId,
        }),
      })
        .then((res) => res.json())
        .then((data: MovieReviews) => {
          console.log(data.results);
          setReviews(data.results);
        })
        .catch((err) => {
          setError(true);
          toast.error('Cannot fetch movie data.');
        });
    };
    if (filmId) {
      getData();
    }
  }, [filmId]);

  return (
    <>
      {filmData && <MovieHero filmData={filmData} />}
      <MovieContainer>
        {filmData && credits && (
          <FullWidthSlider
            data={credits}
            title='Cast'
            subtitle='Actors and Actresses'
            slidesPerView={4}
            showReleaseDate={false}
            type={'person'}
          />
        )}
        {filmData && <MovieStats {...filmData} />}
      </MovieContainer>
      {reviews && <Reviews reviews={reviews} />}
      {similar && (
        <FullWidthSlider
          data={similar}
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
