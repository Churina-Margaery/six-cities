import ApartmentCard from '../card/apartment-card';
import { Offers } from '../../types/offers';


type OffersListProps = {
  offers: Offers;
  onOfferHover: (id: string) => void;
}

function OffersList({ offers, onOfferHover }: OffersListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, id) => {
        const keyValue = `${id}-${offer.id}`;
        return (
          <div key={keyValue} onMouseEnter={() => {
            onOfferHover(offer.id);
          }}
          >
            <ApartmentCard
              offer={offer}
            />
          </div>);
      })}
    </div>
  );
}

export default OffersList;
