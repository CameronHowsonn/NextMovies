import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Cast, Crew } from '../types/movies';
import Heading from './heading';
import Stack from './stack';
import Text from './text';

interface PersonCardProps {
  data: Cast | Crew;
}

const PersonCard: React.FC<PersonCardProps> = ({ data }) => {
  return (
    <Card>
      <TopContainer>
        <Link href={`/person/${data?.id}`}>
          <ImageContainer>
            <img
              src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
              loading='lazy'
            />
          </ImageContainer>
        </Link>
      </TopContainer>
      <TextContainer gap={1}>
        <Heading as={3}>{data?.name}</Heading>
        <Text>{data?.known_for_department}</Text>
      </TextContainer>
    </Card>
  );
};

export default PersonCard;

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
`;

const TextContainer = styled(Stack)`
  padding: 1rem;
`;

const ReleaseDate = styled(Text)`
  font-size: 12px;
  font-weight: 600;
`;

const TopContainer = styled.div`
  position: relative;
  overflow: hidden;
`;
