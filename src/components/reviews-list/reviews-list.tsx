import { Reviews } from '../../types/reviews';
import ReviewItem from '../review/review';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {

  return (
    <ul className="reviews__list">
      {reviews.map((review, id) => {
        const keyValue = `${id}-${review.id}`;
        return (
          <li key={keyValue} className="reviews__item">
            <ReviewItem
              review={review}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ReviewsList;
