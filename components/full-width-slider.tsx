import { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from './container';
import FilmCard from './film-card';
import Heading from './heading';
import PersonCard from './person-card';
import SliderButton from './slider-button';
import Stack from './stack';
import Text from './text';
import TvCard from './tv-card';

interface FullWidthSliderProps {
  data: any;
  title: string;
  subtitle?: string;
  slidesPerView?: number;
  showReleaseDate?: boolean;
  type?: 'movie' | 'tv' | 'person';
}

const FullWidthSlider: React.FC<FullWidthSliderProps> = ({
  data,
  title,
  subtitle,
  slidesPerView = 5,
  showReleaseDate = false,
  type,
}) => {
  const [slider, setSlider] = useState(null);
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  return (
    <SliderContainer>
      <Stack gap={4}>
        <Header>
          <HeaderText>
            {title && <Heading as={2}>{title}</Heading>}
            {subtitle && <Text>{subtitle}</Text>}
          </HeaderText>
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
          lazyPreloadPrevNext={1}
        >
          {data &&
            data.map((item, index) => {
              if (type === 'person' && !item.profile_path) return null;

              return (
                <SwiperSlideItem key={index}>
                  {type === 'tv' && (
                    <TvCard data={item} showReleaseDate={showReleaseDate} />
                  )}
                  {type === 'movie' && (
                    <FilmCard data={item} showReleaseDate={showReleaseDate} />
                  )}
                  {type === 'person' && <PersonCard data={item} />}
                </SwiperSlideItem>
              );
            })}
        </SwiperItem>
      </Stack>
    </SliderContainer>
  );
};

export default FullWidthSlider;

const Header = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
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

const HeaderText = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;

  > * {
    flex: 0 0 100%;
  }
`;
