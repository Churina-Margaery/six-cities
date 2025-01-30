import ApartmentCard from '../card/apartment-card';
import { Offers } from '../../types/offers';

type OffersListProps = {
  offers: Offers;
  onOfferHover: (id: string) => void;
}

function OffersListNearby({ offers, onOfferHover }: OffersListProps): JSX.Element {

  return (
    <div className="near-places__list places__list">
      {offers.map((offer, id) => {
        const keyValue = `${id}-${offer.id}`;
        return (
          <div key={keyValue} onMouseEnter={() => {
            onOfferHover(offer.id);
          }}
          ><ApartmentCard offer={offer} />
          </div>);
      })}
    </div>
  );
}

export default OffersListNearby;
