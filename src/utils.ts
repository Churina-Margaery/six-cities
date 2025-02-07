import { LocationCity } from './types/offers';

export function getPluralEnding(num: number, str: string) {
  return num === 1 ? str : `${str}s`;
}

export function getCityParams(city: string): LocationCity {
  const cityCoordinates: { [key: string]: LocationCity } = {
    Paris: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 12
    },
    Cologne: {
      latitude: 50.9375,
      longitude: 6.9603,
      zoom: 12
    },
    Brussels: {
      latitude: 50.8503,
      longitude: 4.3517,
      zoom: 12
    },
    Amsterdam: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 12
    },
    Hamburg: {
      latitude: 53.5511,
      longitude: 9.9937,
      zoom: 12
    },
    Dusseldorf: {
      latitude: 51.2277,
      longitude: 6.7735,
      zoom: 12
    }
  };

  // Возвращаем координаты для указанного города или значения по умолчанию, если город не найден
  return cityCoordinates[city] || {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 11
  };
}
