import { Offer } from '../types/separated-offers';

export const offer1: Offer = {
  'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
  'title': 'Beautiful & luxurious studio at great location',
  'type': 'apartment',
  'price': 120,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    }
  },
  'location': {
    'latitude': 52.35514938496378,
    'longitude': 4.673877537499948,
    'zoom': 8
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4,
  'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  'bedrooms': 3,
  'goods': [
    'Heating'
  ],
  'host': {
    'name': 'Oliver Conner',
    'avatarUrl': 'img/avatar-angelina.jpg',
    'isPro': false
  },
  'images': [
    'img/apartment-01.jpg',
    'img/apartment-01.jpg',
    'img/apartment-01.jpg'
  ],
  'maxAdults': 4
};

export const offer2: Offer = {
  'id': 'f7a1b509-0190-4c3f-b8c3-599e767c56e1',
  'title': 'Modern 1-bedroom apartment in the heart of Paris',
  'type': 'apartment',
  'price': 150,
  'city': {
    'name': 'Paris',
    'location': {
      'latitude': 48.8566,
      'longitude': 2.3522,
      'zoom': 10
    }
  },
  'location': {
    'latitude': 48.8566,
    'longitude': 2.3522,
    'zoom': 10
  },
  'isFavorite': true,
  'isPremium': true,
  'rating': 5,
  'description': 'Enjoy the vibrant city life in this modern 1-bedroom apartment located in the heart of Paris.',
  'bedrooms': 1,
  'goods': [
    'WiFi',
    'Air conditioning'
  ],
  'host': {
    'name': 'Sophie Leclair',
    'avatarUrl': 'img/avatar-angelina.jpg',
    'isPro': true
  },
  'images': [
    'img/apartment-small-04.jpg',
    'img/apartment-small-04.jpg',
    'img/apartment-small-04.jpg'
  ],
  'maxAdults': 2
};


export const offer3: Offer = {
  'id': '9c2e5b92-e379-4f5c-946d-d2bfc578c618',
  'title': 'Cozy apartment with stunning view in Brussels',
  'type': 'apartment',
  'price': 110,
  'city': {
    'name': 'Brussels',
    'location': {
      'latitude': 50.8503,
      'longitude': 4.3517,
      'zoom': 9
    }
  },
  'location': {
    'latitude': 50.8503,
    'longitude': 4.3517,
    'zoom': 9
  },
  'isFavorite': false,
  'isPremium': false,
  'rating': 4.5,
  'description': 'A cozy apartment offering breathtaking views of the city’s landmarks.',
  'bedrooms': 2,
  'goods': [
    'WiFi',
    'TV'
  ],
  'host': {
    'name': 'Jan De Vries',
    'avatarUrl': 'img/avatar-max.jpg',
    'isPro': false
  },
  'images': [
    'img/apartment-small-03.jpg',
    'img/apartment-small-03.jpg',
    'img/apartment-small-03.jpg'
  ],
  'maxAdults': 3
};
export const offer4: Offer = {
  'id': '4d72f3e7-1634-4ff5-87c8-4b8f6a14ea01',
  'title': 'Charming studio in central Amsterdam',
  'type': 'apartment',
  'price': 130,
  'city': {
    'name': 'Amsterdam',
    'location': {
      'latitude': 52.3676,
      'longitude': 4.9041,
      'zoom': 10
    }
  },
  'location': {
    'latitude': 52.3676,
    'longitude': 4.9041,
    'zoom': 10
  },
  'isFavorite': true,
  'isPremium': false,
  'rating': 4.8,
  'description': 'Charming studio located in the heart of Amsterdam, with all major attractions within walking distance.',
  'bedrooms': 1,
  'goods': [
    'WiFi',
    'Dishwasher'
  ],
  'host': {
    'name': 'Emily Robinson',
    'avatarUrl': 'img/avatar-max.jpg',
    'isPro': false
  },
  'images': [
    'img/apartment-small-03.jpg',
    'img/apartment-small-03.jpg',
    'img/apartment-small-03.jpg',
  ],
  'maxAdults': 2
};

const offers: Offer[] = [offer1, offer2, offer3, offer4];

function getOfferById(id: string): Offer {
  return offers.filter((offer) => (offer.id === id))[0];
}

function hasSuchOfferId(id: string): boolean {
  return offers.filter((offer) => (offer.id === id)).length > 0;
}

function getOffer(): Offer {
  return offers[Math.floor(Math.random() * offers.length)];
}

export { getOffer, getOfferById, hasSuchOfferId, offers };
