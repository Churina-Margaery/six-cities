export type Offers = Offer[]

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type City = {
  name: string;
  location: LocationCity;
}

export type LocationCity = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}
