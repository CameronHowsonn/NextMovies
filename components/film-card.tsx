import styled from 'styled-components';
import { MovieItem } from '../types/movies';
import Heading from './heading';
import Stack from './stack';
import StarRating from './star-rating';
import Link from 'next/link';
import Text from './text';

interface FilmCardProps {
  data: MovieItem;
}

const FilmCard: React.FC<FilmCardProps> = ({ data }) => {
  return (
    <Card gap={2}>
      <Link href={`/film/${data?.id}`}>
        <ImageContainer>
          <img src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`} />
        </ImageContainer>
        <TextContainer gap={1}>
          <StarRating rating={Math.ceil(data?.vote_average)} />
          <Text>{data?.title.substring(0, 20)}...</Text>
        </TextContainer>
      </Link>
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
`;
