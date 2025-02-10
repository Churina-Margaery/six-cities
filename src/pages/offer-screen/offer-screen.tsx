import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import { getPluralEnding } from '../../utils';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { favoriteOfferChange } from '../../store/action';
import { fetchOfferDataAction, fetchNearbyOffersAction, fetchOfferCommentsAction } from '../../store/api-actions';


function OfferScreen(): JSX.Element {
  const navigate = useNavigate();
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const handleFavoriteHover = (id: string) => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      // todo saving?
    } else {
      dispatch(favoriteOfferChange({ id }));
    }
  };
  const { offerId } = useParams();
  const offer = useAppSelector((state) => state.activeOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const reviews = useAppSelector((state) => state.activeOfferReviews);

  const [nearbyOfferSelected, setSelectedOffer] = useState('1');

  const handleOfferHover = (OfferId: string) => {
    const offerFound = nearbyOffers.find((offerNear) =>
      offerNear.id === OfferId,
    );
    const currentOffer = offerFound !== undefined ? offerFound.id : '1';
    setSelectedOffer(currentOffer);
  };

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferDataAction(offerId));
      dispatch(fetchNearbyOffersAction(offerId));
      dispatch(fetchOfferCommentsAction(offerId));
      window.scrollTo(0, 0);
    }
  }, [dispatch, offerId]);

  if (offerId === undefined) {
    return <Navigate to={AppRoute.PageNotFound} />;
  }

  if (!offer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Offer</title>
      </Helmet>
      <Header></Header>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((image, id) => {
                const keyValue = `${id}-${image}`;
                return (
                  <div className="offer__image-wrapper" key={keyValue}>
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>);
              })}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.description}
                </h1>
                <button
                  className="offer__bookmark-button button"
                  type="button"
                  onClick={() => handleFavoriteHover(offer.id)}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating / 5 * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} {getPluralEnding(offer.bedrooms, 'Bedroom')}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} {getPluralEnding(offer.maxAdults, 'adult')}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good, id) => {
                    const keyValue = `${id}-${good}`;
                    return (
                      <li key={keyValue} className="offer__inside-item">
                        {good}
                      </li>);
                  })}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList
                  reviews={reviews}
                />
                {(authStatus === AuthorizationStatus.Auth) &&
                  <CommentForm
                    review={''}
                    rating={0}
                  />}
              </section>
            </div>
          </div>
          <Map
            city={offer.city}
            offers={nearbyOffers}
            selectedPoint={nearbyOfferSelected}
            block='offer'
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList
              offers={nearbyOffers}
              onOfferHover={handleOfferHover}
              classes='near-places__list places__list'
            />
          </section>
        </div>
        <Footer></Footer>
      </main >
    </div >
  );
}

export default OfferScreen;
