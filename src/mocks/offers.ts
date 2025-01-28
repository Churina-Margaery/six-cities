import { Offers } from '../types/offers';

export const offers: Offers = [
  {
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'room',
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
    'isPremium': true,
    'rating': 3,
    'previewImage': 'img/apartment-01.jpg'
  },
  {
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
    'rating': 4.3,
    'previewImage': 'img/apartment-02.jpg'
  },
  {
    'id': '9c2e5b92-e379-4f5c-946d-d2bfc578c618',
    'title': 'Cozy apartment with stunning view in Brussels',
    'type': 'flat',
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
    'rating': 5,
    'previewImage': 'img/apartment-03.jpg'
  },
  {
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
    'rating': 4.7,
    'previewImage': 'img/apartment-small-03.jpg'
  }
];
