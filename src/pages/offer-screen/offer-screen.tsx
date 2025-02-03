import { Helmet } from 'react-helmet-async';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Offer } from '../../types/separated-offers';
import { offers as allOffers } from '../../mocks/separated-offers';
import { Reviews } from '../../types/reviews';
import CommentForm from '../../components/comment-form/comment-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import { Navigate, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import OffersList from '../../components/offers-list/offers-list';

type OfferScreenProps = {
  reviews: Reviews;
}

function OfferScreen({ reviews }: OfferScreenProps): JSX.Element {

  const offersFavorite = useAppSelector((state) => state.favoriteOffers);

  // !!! todo server fix
  const offers = allOffers.filter((offer) =>
    offersFavorite.some((favorite) => favorite.id === offer.id)
  );

  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const [nearbyOfferSelected, setSelectedOffer] = useState(offers[0]);

  const handleOfferHover = (OfferId: string) => {
    const offerFound = offers.find((offer) =>
      offer.id === OfferId,
    );
    const currentOffer = offerFound !== undefined ? offerFound : offers[0];
    setSelectedOffer(currentOffer);
  };
  const offerId = useParams().offerId as string;
  const offerGot: Offer[] = offers.filter((off) => (off.id === offerId));
  if (offerGot.length === 0) {
    return <Navigate to={AppRoute.PageNotFound}></Navigate>;
  }
  const offer: Offer = offerGot[0];
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
                <button className="offer__bookmark-button button" type="button">
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
                  {offer.bedrooms} {offer.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
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
                <CommentForm
                  review={''}
                  rating={0}
                />
              </section>
            </div>
          </div>
          <Map
            city={offer.city}
            offers={nearbyOffers}
            selectedPoint={nearbyOfferSelected.id}
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
