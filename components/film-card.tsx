import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import TrailerContext from '../context/TrailerModal';
import { MovieItem } from '../types/movies';
import Button from './button';
import Heading from './heading';
import Stack from './stack';
import StarRating from './star-rating';
import Text from './text';
import WatchListDropdown from './watch-list-dropdown';

interface FilmCardProps {
  data: MovieItem;
  showReleaseDate?: boolean;
}

const FilmCard: React.FC<FilmCardProps> = ({
  data,
  showReleaseDate = false,
}) => {
  const [trailerData, setTrailerData] = useState(null);
  const { setTrailerUrl, setIsModalOpen } = useContext(TrailerContext);
  const [listDropdownOpen, setListDropdownOpen] = useState(false);
  const [error, setError] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchTrailer = async () => {
      fetch(`/api/movies/get-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data?.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setTrailerData(data);
        });
    };
    fetchTrailer();
  }, []);

  const addToList = async (id, filmId, type, movieName) => {
    const res = await fetch(`/api/auth/add-item-to-list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        itemId: filmId,
        type,
      }),
    });
    const data = await res.json();
    if (data.message !== 'success') {
      toast(data.message);
      return;
    }
    toast(`${movieName} added to watchlist`);
  };

  return (
    <Card gap={2}>
      <TopContainer>
        <Link href={`/film/${data?.id}`}>
          <ImageContainer>
            <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} />
          </ImageContainer>
        </Link>
        {listDropdownOpen && (
          <WatchListDropdown
            movieId={data?.id}
            setListDropdownOpen={setListDropdownOpen}
          />
        )}
      </TopContainer>
      <TextContainer gap={1}>
        <StarRating rating={Math.ceil(data?.vote_average)} />
        {showReleaseDate && (
          <ReleaseDate>
            {new Date(data?.release_date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: '2-digit',
            })}
            {new Date(data?.release_date).toLocaleDateString('en-US') ===
              new Date().toLocaleDateString('en-US') && ' - (Out Today)'}
          </ReleaseDate>
        )}
        <Heading as={3}>
          {data?.title.length > 20
            ? `${data?.title.substring(0, 20)}...`
            : data?.title}
        </Heading>
        {trailerData?.key && (
          <Button
            fullWidth
            onClick={() => {
              setTrailerUrl(
                `https://www.youtube.com/watch?v=${trailerData?.key}`
              );
              setIsModalOpen(true);
            }}
          >
            <BsFillPlayFill />
            Trailer
          </Button>
        )}
        <Button
          fullWidth
          variant='secondary'
          onClick={() => {
            if (status === 'unauthenticated') {
              toast('You must be logged in to add to your watchlist');
              return;
            }
            setListDropdownOpen((prev) => !prev);
          }}
        >
          <AiOutlinePlus />
          Watchlist
        </Button>
      </TextContainer>
    </Card>
  );
};

export default FilmCard;

const Card = styled(Stack)`
  padding: 1rem 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.lightGrey};
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
`;

const TextContainer = styled(Stack)`
  padding: 1rem;

  h3 {
    height: 3rem;
    display: flex;
    align-items: center;
  }
`;

const ReleaseDate = styled(Text)`
  font-size: 12px;
  font-weight: 600;
`;

const TopContainer = styled.div`
  position: relative;
  overflow: hidden;
`;
