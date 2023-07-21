import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import Heading from './heading';
import Stack from './stack';
import Text from './text';

const PersonCard: React.FC = ({ data }) => {
  return (
    <Card>
      <Link href={`/person/${data?.id}`}>
        <ImageContainer>
          <img
            src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
            loading='lazy'
          />
        </ImageContainer>
      </Link>
      <TextContainer gap={1}>
        <Heading as={3}>{data?.name}</Heading>
        <Text>{data?.known_for_department}</Text>
      </TextContainer>
    </Card>
  );
};

export default PersonCard;

const Card = styled.div``;

const ImageContainer = styled.div``;

const TextContainer = styled(Stack)``;
