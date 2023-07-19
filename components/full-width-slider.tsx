import styled from 'styled-components';
import Container from './container';
import Heading from './heading';
import { Swiper, SwiperSlide } from 'swiper/react';
import FilmCard from './film-card';
import Stack from './stack';
import { useState } from 'react';
import SliderButton from './slider-button';

interface FullWidthSliderProps {
  data: any;
  title: string;
  slidesPerView?: number;
  showReleaseDate?: boolean;
}

const FullWidthSlider: React.FC<FullWidthSliderProps> = ({
  data,
  title,
  slidesPerView = 5,
  showReleaseDate = false,
}) => {
  const [slider, setSlider] = useState(null);
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  return (
    <SliderContainer>
      <Stack gap={4}>
        <Header>
          {title && <Heading as={2}>{title}</Heading>}
          {slider?.initialized && (
            <ButtonContainer>
              <SliderButton
                variant='prev'
                disabled={sliderIndex === 0}
                onClick={() => {
                  slider?.slidePrev();
                }}
                className='prev'
                colorVariant='light'
              />
              <SliderButton
                variant='next'
                disabled={sliderIndex === data?.length - 1}
                onClick={() => {
                  slider?.slideNext();
                }}
                className='next'
                colorVariant='light'
              />
            </ButtonContainer>
          )}
        </Header>
        <SwiperItem
          slidesPerView={slidesPerView}
          spaceBetween={25}
          onSwiper={(swiper) => setSlider(swiper)}
          onActiveIndexChange={(swiperCore) => {
            setSliderIndex(swiperCore.activeIndex);
          }}
        >
          {data &&
            data.map((item, index) => (
              <SwiperSlideItem key={index}>
                <FilmCard data={item} showReleaseDate={showReleaseDate} />
              </SwiperSlideItem>
            ))}
        </SwiperItem>
      </Stack>
    </SliderContainer>
  );
};

export default FullWidthSlider;

const Header = styled.div`
  justify-content: space-between;
  display: flex;
`;

const SwiperItem = styled(Swiper)`
  overflow: hidden;
  align-items: stretch;

  .swiper-wrapper {
    height: 100%;
    align-items: stretch;
  }
`;

const SwiperSlideItem = styled(SwiperSlide)`
  position: relative;
  height: auto;
  width: 100%;
  overflow: hidden;
  align-self: stretch;
  img {
    overflow: hidden;
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
`;

const SliderContainer = styled(Container)`
  margin: 4rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
