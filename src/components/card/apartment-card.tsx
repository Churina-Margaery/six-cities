import { useAppDispatch, useAppSelector } from '../../hooks';
import { Link, useNavigate } from 'react-router-dom';
import { favoriteOfferChange } from '../../store/action';

import { Offer } from '../../types/offers';
import { AppRoute, AuthorizationStatus } from '../../const';

type ApartmentCardProps = {
  offer: Offer;
}

function ApartmentCard({ offer }: ApartmentCardProps): JSX.Element {
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const handleFavoriteHovers = (id: string) => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      // todo saving?
    } else {
      dispatch(favoriteOfferChange({ id }));
    }
  };

  return (
    <article className="cities__card place-card">
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button"
            onClick={() => handleFavoriteHovers(offer.id)}
          >
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating / 5 * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default ApartmentCard;
