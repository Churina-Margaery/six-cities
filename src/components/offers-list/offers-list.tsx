import ApartmentCard from '../card/apartment-card';
import { Offers } from '../../types/offers';


type OffersListProps = {
  offers: Offers;
  onOfferHover: (id: string) => void;
  classes: string;
}

function OffersList({ offers, onOfferHover, classes }: OffersListProps): JSX.Element {

  return (
    <div className={classes}>
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
