import { AiFillStar } from 'react-icons/ai';
import styled from 'styled-components';
import Text from './text';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <StarRatingContainer>
      <AiFillStar />
      <StarText>{rating}/10</StarText>
    </StarRatingContainer>
  );
};

const StarRatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.5rem;
    color: ${(props) => props.theme.colors.yellow};
  }
`;

const StarText = styled(Text)`
  font-weight: 700;
  font-family: var(--Monserrat);
`;

export default StarRating;
