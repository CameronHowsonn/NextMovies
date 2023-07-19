import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Container from '../container';
import Heading from '../heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import StarRating from '../star-rating';
import Link from 'next/link';
import { Movie, MovieItem } from '../../types/movies';
import SliderButton from '../slider-button';

const BrowseHero: React.FC = () => {
  const [data, setData] = useState<Movie>(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [mainSlider, setMainSlider] = useState(null);
  const [subSlider, setSubSlider] = useState(null);
  const mainImage = useRef(null);

  useEffect(() => {
    fetch('/api/movies/get-trending', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ timeframe: 'week' }),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  useEffect(() => {
    console.log(sliderIndex);
    if (mainSlider && subSlider) {
      mainSlider.slideTo(sliderIndex);
      subSlider.slideTo(sliderIndex);
    }
  }, [sliderIndex, mainSlider]);

  return (
    <HeroContainer>
      <InnerContainer>
        <SliderButton
          variant='next'
          disabled={sliderIndex === data?.results.length - 1}
          onClick={() => {
            subSlider.slideNext();
          }}
          className='next'
          position='absolute'
          colorVariant='dark'
        ></SliderButton>
        <InnerSwiperItem
          slidesPerView={4}
          spaceBetween={30}
          allowTouchMove={false}
          noSwiping={true}
          onActiveIndexChange={(swiperCore) => {
            setSliderIndex(swiperCore.activeIndex);
          }}
          onSwiper={(swiper) => setSubSlider(swiper)}
        >
          {data &&
            data.results.map((movie: MovieItem, index: number) => (
              <InnerSwiperSlideItem
                key={`smaller-${movie.id}`}
                onClick={() => {
                  setSliderIndex(index);
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                  alt={movie.title}
                />
              </InnerSwiperSlideItem>
            ))}
        </InnerSwiperItem>
        <SliderButton
          variant='prev'
          disabled={sliderIndex === 0}
          onClick={() => {
            subSlider.slidePrev();
          }}
          className='prev'
          position='absolute'
          colorVariant='dark'
        ></SliderButton>
      </InnerContainer>
      <SwiperItem
        slidesPerView={1}
        onSwiper={(swiper) => setMainSlider(swiper)}
        allowTouchMove={false}
        noSwiping={true}
      >
        {data &&
          data.results.map((movie: MovieItem) => (
            <SwiperSlideItem key={movie?.id}>
              <SwiperSlideText>
                <Heading as={1}>{movie?.title}</Heading>
                <StarRating rating={Math.ceil(movie?.vote_average)} />
              </SwiperSlideText>
              <ViewMoreButton>
                <Link href={`/movie/${movie?.id}`}>View Details</Link>
                <BsChevronRight />
              </ViewMoreButton>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                ref={mainImage}
              />
            </SwiperSlideItem>
          ))}
      </SwiperItem>
    </HeroContainer>
  );
};

export default BrowseHero;

const HeroContainer = styled.section`
  position: relative;
  z-index: 1;
`;

const SwiperItem = styled(Swiper)`
  height: 27rem;
`;

const SwiperSlideItem = styled(SwiperSlide)`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      360deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    z-index: 1;
  }
  img {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const SwiperSlideText = styled.div`
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  z-index: 5;
  width: 40%;
  color: ${(props) => props.theme.colors.white};
  h1 {
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }
`;

const InnerSwiperItem = styled(Swiper)`
  width: 100%;
  height: 80%;
`;

const InnerSwiperSlideItem = styled(SwiperSlide)`
  position: relative;
  cursor: pointer;
  img {
    border-radius: 1rem;
    position: absolute;
    top: 0;
    height: 5rem;
    width: 100%;
    object-fit: cover;
  }
`;

const InnerContainer = styled.div`
  position: absolute;
  width: 32.5rem;
  height: 6.25rem;
  right: 4.5rem;
  bottom: 1rem;
  z-index: 2;

  .prev,
  .next {
    top: 2.5rem;
  }

  .prev {
    left: -2.5rem;
  }

  .next {
    right: -2.5rem;
  }
`;

const ViewMoreButton = styled.button`
  background: ${(props) => props.theme.colors.red};
  border: none;
  cursor: pointer;
  z-index: 4;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  transition: transform 0.3s ease-in-out, background 0.2s ease-in-out;
  bottom: 3rem;
  left: 2rem;
  position: absolute;
  border-radius: 4px;
  gap: 0.5rem;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
  }

  svg {
    transition: transform 0.3s ease-in-out, color 0.2s ease-in-out;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:hover {
    background: ${(props) => props.theme.colors.black};
    svg {
      color: ${(props) => props.theme.colors.red};
      transform: translateX(0.25rem);
    }
  }
`;
