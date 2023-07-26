import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Review } from '../types/movies';
import Container from './container';
import Heading from './heading';
import Stack from './stack';
import StarRating from './star-rating';
import Text from './text';

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  // Only show 3 reviews, with a load more button

  const [showReviews, setShowReviews] = useState<Review[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setShowReviews(reviews.slice(0, 3));
    }
  }, [reviews]);

  const loadMore = () => {
    setShowReviews(reviews);
    setShowAll(true);
  };

  return (
    <ReviewsContainer>
      <Stack gap={4}>
        <Heading as={2}>Reviews</Heading>
        {showReviews && showReviews.length > 0 && (
          <Stack gap={4}>
            {showReviews.map((review: Review) => {
              return (
                <ReviewItem key={review?.id}>
                  <Stack gap={2}>
                    <ReviewAuthor>
                      <img
                        src={`https://ui-avatars.com/api/?name=${review.author}`}
                      />
                      <Heading as={5}>
                        {review.author_details?.username}
                      </Heading>
                      <StarRating rating={review?.author_details?.rating} />
                    </ReviewAuthor>
                    <ReviewText content={review.content} />
                  </Stack>
                </ReviewItem>
              );
            })}
          </Stack>
        )}
      </Stack>
      <Heading
        as={3}
        className='load-more'
        onClick={() => {
          loadMore();
        }}
      >
        {reviews && reviews.length > 3 && !showAll && (
          <Text as='span' onClick={loadMore} color={'red'}>
            Load more reviews
          </Text>
        )}
      </Heading>
    </ReviewsContainer>
  );
};

const ReviewText = ({ content }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const [truncatedContent, setTruncatedContent] = useState(null);

  useEffect(() => {
    if (content.length > 500) {
      setTruncatedContent(content.slice(0, 500));
    } else {
      setTruncatedContent(content);
    }
  }, [content]);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <Text>
      {isTruncated ? truncatedContent : content}
      {content.length > 500 && (
        <TruncatedText as='span' onClick={toggleTruncate} color={'red'}>
          {isTruncated ? ' ...Read more' : ' Read less'}
        </TruncatedText>
      )}
    </Text>
  );
};

export default Reviews;

const ReviewItem = styled.div``;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ReviewsContainer = styled(Container)`
  padding-bottom: 2rem;

  .load-more {
    text-align: center;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    margin: 2rem 0;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const TruncatedText = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
