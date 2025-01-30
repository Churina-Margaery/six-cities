import SmallCard from '../small-card/small-card';
import { Offers } from '../../types/offers';

type SmallCardsListProps = {
  offers: Offers;
  cityName: string;
}

function SmallCardsList({ offers, cityName }: SmallCardsListProps): JSX.Element {
  return (
    < div className="favorites__places" >
      {offers.filter((offer) => (offer.city.name === cityName)).map((offer, id) => {
        const keyValue = `${id}-${offer.id}`;
        return (
          < article key={keyValue} className="favorites__card place-card">
            <SmallCard
              offer={offer}
            />
          </article >
        );
      })}
    </div>
  );
}

export default SmallCardsList;
