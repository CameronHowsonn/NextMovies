import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Container from '../container';
import Heading from '../heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const BrowseHero: React.FC = () => {
  const [data, setData] = useState(null);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [mainSlider, setMainSlider] = useState(null);
  const [subSlider, setSubSlider] = useState(null);

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
    }
  }, [sliderIndex, mainSlider]);

  return (
    <HeroContainer>
      <InnerContainer>
        <SliderButton
          onClick={() => {
            subSlider.slidePrev();
          }}
        >
          <BsChevronRight />
        </SliderButton>
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
            data.results.map((movie) => (
              <InnerSwiperSlideItem key={`smaller-${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                  alt={movie.title}
                />
              </InnerSwiperSlideItem>
            ))}
        </InnerSwiperItem>
        <SliderButton
          onClick={() => {
            subSlider.slideNext();
          }}
        >
          <BsChevronLeft />
        </SliderButton>
      </InnerContainer>
      <SwiperItem
        slidesPerView={1}
        onSwiper={(swiper) => setMainSlider(swiper)}
        allowTouchMove={false}
        noSwiping={true}
      >
        {data &&
          data.results.map((movie) => (
            <SwiperSlideItem key={movie?.id}>
              <SwiperSlideText>
                <Heading as={1}>{movie?.title}</Heading>
              </SwiperSlideText>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
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
  height: 50vh;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      360deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 3;
  }
`;

const SwiperSlideItem = styled(SwiperSlide)`
  position: relative;
  img {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const SwiperSlideText = styled.div`
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  z-index: 4;
  width: 40%;
  color: ${(props) => props.theme.colors.white};
  h1 {
    margin-bottom: 1rem;
  }
`;

const InnerSwiperItem = styled(Swiper)`
  width: 100%;
  height: 80%;
`;

const InnerSwiperSlideItem = styled(SwiperSlide)`
  position: relative;
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
  width: 40%;
  height: 35%;
  right: 3rem;
  bottom: -1rem;
  z-index: 2;
`;

const SliderButton = styled.button`
  position: absolute;
  background: ${(props) => props.theme.colors.red};
  border: none;
  cursor: pointer;
  z-index: 4;
  top: 20%;
  padding: 0.5rem;
  border-radius: 50%;
  left: -2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};

  &:nth-child(1) {
    right: -2rem;
    left: auto;
  }
`;
