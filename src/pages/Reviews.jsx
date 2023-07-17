import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from 'services/Api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  // console.log(movieId);
  useEffect(() => {
    if (!movieId) return;

    const fetchReviewsIformation = async () => {
      try {
        const api = new Api();
        const reviewsInformation = await api.fetchReviews(movieId);

        setReviews(reviewsInformation);
      } catch (newError) {
        setError(newError);
      }
    };

    fetchReviewsIformation();
  }, [movieId]);
  // console.log(reviews);

  return (
    <div>
      {error !== null && <p>{error.message}</p>}
      {reviews?.length > 0 ? reviews.map(({ id, author, content }) => (
        <li key={id}>
          <h6>{author}</h6>
          <p>{content}</p>
        </li>
      )) : <p>There are no reviews </p>}
    
    </div>
  );
};

export default Reviews;
