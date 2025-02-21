import { useState, FormEvent } from 'react';
import { Fragment } from 'react';

import { postCommentAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type CommentFormProps = {
  offerId: string;
}

function CommentForm({ offerId }: CommentFormProps): JSX.Element {
  const [userReview, setUserReview] = useState({ review: '', rating: 0 });
  const dispatch = useAppDispatch();

  const isValid = () =>
    userReview.review.length >= 50 &&
    userReview.review.length <= 300 &&
    userReview.rating > 0;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (isValid()) {
      dispatch(postCommentAction({
        offerId,
        rating: userReview.rating,
        comment: userReview.review
      }))
        .then(() => {
          setUserReview((prevState) => ({ ...prevState, review: '', rating: 0 }));
        });
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={userReview.rating === value}
              onChange={() => setUserReview({ ...userReview, rating: value })}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={['perfect', 'good', 'not bad', 'badly', 'terribly'][5 - value]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        onInput={(event) => {
          setUserReview({ ...userReview, review: event.currentTarget.value });
        }}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={userReview.review}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your
          stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid()}
        >
          Submit
        </button>
      </div>
    </form >
  );
}


export default CommentForm;
