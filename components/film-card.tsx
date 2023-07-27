import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
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

  const fetchTrailer = async () => {
    return await fetch(`/api/movies/get-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data?.id,
      }),
    });
  };

  return (
    <Card>
      <TopContainer>
        <Link href={`/movie/${data?.id}`}>
          <ImageContainer>
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
              loading='lazy'
            />
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
          {data?.title.length > 25
            ? `${data?.title.substring(0, 25)}...`
            : data?.title}
        </Heading>
        <Button
          fullWidth
          onClick={() => {
            fetchTrailer()
              .then((res) => res.json())
              .then((data) => {
                setTrailerUrl(
                  `https://www.youtube.com/watch?v=${data.video.key}`
                );
              })
              .then(() => {
                setIsModalOpen(true);
              })
              .catch((err) => {
                toast.error('No trailer available');
                setError(true);
              });
          }}
        >
          <BsFillPlayFill />
          Trailer
        </Button>
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
  min-height: 320px;

  img {
    min-height: 320px;
    width: 100%;
    height: 100%;
  }
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
