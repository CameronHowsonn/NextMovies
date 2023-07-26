import React, { useContext } from 'react';
import { BsFillPlayFill } from 'react-icons/bs';
import styled from 'styled-components';
import TrailerContext from '../context/TrailerModal';
import { MovieItem } from '../types/movies';
import Button from './button';
import Heading from './heading';
import Stack from './stack';
import StarRating from './star-rating';
import Text from './text';

interface MovieHeroProps {
  filmData: MovieItem;
}

const MovieHero: React.FC<MovieHeroProps> = ({ filmData }) => {
  const { setTrailerUrl, setIsModalOpen } = useContext(TrailerContext);

  const getTrailer = async () => {
    await fetch(`/api/movies/get-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: filmData?.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrailerUrl(`https://www.youtube.com/watch?v=${data?.video?.key}`);
        setIsModalOpen(true);
      });
  };

  return (
    <HeroImageContainer>
      <HeroInner>
        <HeroImagePosterContainer>
          {filmData?.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${filmData?.poster_path}`}
              alt={filmData?.title}
              loading='lazy'
            />
          )}
        </HeroImagePosterContainer>
      </HeroInner>
      {filmData?.backdrop_path && (
        <HeroImage
          src={`https://image.tmdb.org/t/p/original${filmData?.backdrop_path}`}
        />
      )}
      <HeroText>
        <Stack gap={1}>
          <h1>
            {filmData?.title}
            <span>
              {`(`}
              {new Date(filmData?.release_date).getFullYear()}
              {`)`}
            </span>
          </h1>
          <Heading as={4}>{filmData?.tagline}</Heading>
          <Text>{filmData?.overview}</Text>
          <Meta>
            <Button
              onClick={() => {
                getTrailer();
              }}
            >
              <BsFillPlayFill />
              Trailer
            </Button>

            <StarRating rating={Math.ceil(filmData?.vote_average)} />
          </Meta>
        </Stack>
      </HeroText>
    </HeroImageContainer>
  );
};

export default MovieHero;

const HeroText = styled.div`
  position: relative;
  z-index: 5;
  flex: 0 1 55%;
  margin-right: 5rem;

  span {
    font-weight: 400;
  }
`;

const HeroImage = styled.img`
  object-fit: cover;
  object-position: center;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const HeroInner = styled.div`
  flex: 0 0 auto;
`;

const HeroImageContainer = styled.div`
  width: 100%;
  height: 65vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  min-height: 500px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      360deg,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    z-index: 1;
  }

  img {
    opacity: 0.8;
  }
`;

const HeroImagePosterContainer = styled.div`
  height: 60vh;
  max-height: 500px;
  min-height: 400px;
  z-index: 5;
  position: relative;

  img {
    height: 100%;
    width: auto;
  }
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
