import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  BiLogoFacebook,
  BiLogoImdb,
  BiLogoInstagram,
  BiLogoTwitter,
} from 'react-icons/bi';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { ExternalIds } from '../types/movies';
import Stack from './stack';
import Text from './text';

interface MovieStatsProps {
  status: string;
  original_language: string;
  runtime: number;
  budget: number;
  revenue: number;
  genres: {
    id: number;
    name: string;
  }[];
}

const MovieStats: React.FC<MovieStatsProps> = ({
  status,
  original_language,
  runtime,
  budget,
  revenue,
  genres,
}) => {
  const router = useRouter();
  // Get external ids for the movie
  const [externalIds, setExternalIds] = useState<ExternalIds>(null);
  const filmId = router?.query?.slug;

  useEffect(() => {
    if (filmId) {
      fetch(`/api/movies/external-ids`, {
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
          console.log(data, 'external');
          setExternalIds(data);
        })
        .catch((err) => {
          toast.error('Cannot fetch movie data.');
        });
    }
  }, [filmId]);

  return (
    <StatsContainer>
      <Socials>
        {externalIds?.imdb_id && (
          <a
            href={`https://www.imdb.com/title/${externalIds?.imdb_id}`}
            target='_blank'
            rel='noreferrer'
          >
            <BiLogoImdb fontSize={'2rem'} />
          </a>
        )}
        {externalIds?.facebook_id && (
          <a
            href={`https://www.facebook.com/${externalIds?.facebook_id}`}
            target='_blank'
            rel='noreferrer'
          >
            <BiLogoFacebook fontSize={'2rem'} />
          </a>
        )}
        {externalIds?.instagram_id && (
          <a
            href={`https://www.instagram.com/${externalIds?.instagram_id}`}
            target='_blank'
            rel='noreferrer'
          >
            <BiLogoInstagram fontSize={'2rem'} />
          </a>
        )}
        {externalIds?.twitter_id && (
          <a
            href={`https://www.twitter.com/${externalIds?.twitter_id}`}
            target='_blank'
            rel='noreferrer'
          >
            <BiLogoTwitter fontSize={'2rem'} />
          </a>
        )}
      </Socials>
      <StatsStack gap={1} className='stats'>
        <StatsText>
          <span className='bold'>Runtime:</span>
          {runtime} minutes
        </StatsText>
        <StatsText>
          <span className='bold'>Language:</span>
          {original_language}
        </StatsText>
        <StatsText>
          <span className='bold'>Status:</span>
          {status}
        </StatsText>
        <StatsText>
          <span className='bold'>Budget:</span>${budget}
        </StatsText>
        <StatsText>
          <span className='bold'>Revenue:</span>${revenue}
        </StatsText>
        <StatsText>
          <span className='bold'>Genres:</span>
          {genres?.map((genre) => genre.name).join(', ')}
        </StatsText>
      </StatsStack>
    </StatsContainer>
  );
};

export default MovieStats;

const StatsStack = styled(Stack)``;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;

  &::before {
    content: '';
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(16, 15, 18, 1) 100%
    );
    position: absolute;
    top: 0;
    left: -10rem;
    bottom: 0;
    width: 10rem;
    z-index: 1;
  }
`;

const StatsText = styled(Text)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex: 0 0 100%;

  .bold {
    flex: 0 0 100%;
  }
`;

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    transition: all 0.2s ease-in-out;
  }

  svg {
    color: ${(props) => props.theme.colors.white};
    &:hover {
      color: ${(props) => props.theme.colors.red};
    }
  }
`;
