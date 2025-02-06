import { useRef, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';

import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { City, Offer } from '../../types/offers';
import useMap from '../../hooks/useMap';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedPoint: string;
  block: string;
}

function Map({ city, offers, selectedPoint, block }: MapProps): JSX.Element {
  const styleMain = {
    height: '500px',
    width: '500px',
  };
  const styleOffer = {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '80%',
  };

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayerRef = useRef<leaflet.LayerGroup>();
  const [prevCity, setPrevCity] = React.useState(city.name);

  useEffect(() => {
    if (map) {
      if (markerLayerRef.current) {
        markerLayerRef.current.clearLayers();
      }

      const markerLayer = leaflet.layerGroup().addTo(map);
      markerLayerRef.current = markerLayer;

      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: offer.id === selectedPoint
              ? leaflet.icon({
                iconUrl: URL_MARKER_CURRENT,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
              })
              : leaflet.icon({
                iconUrl: URL_MARKER_DEFAULT,
                iconSize: [40, 40],
                iconAnchor: [20, 40],
              }),
          })
          .addTo(markerLayer);
      });


      if (prevCity !== city.name) {
        setPrevCity(city.name);
        map.setView(
          [city.location.latitude, city.location.longitude],
          city.location.zoom
        );
      }

    }
  }, [map, offers, selectedPoint, city, prevCity]);

  return (
    <section
      className={`${block}__map map`}
      style={block === 'offer' ? styleOffer : styleMain}
      ref={mapRef}
    >
    </section>
  );
}

export default Map;
