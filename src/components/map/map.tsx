import { Icon, Marker, layerGroup } from 'leaflet';
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { OfferProps } from '../../types/offer-type';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { useMap } from './use-map';
import { useAppSelector } from '../../hooks';
import { selectOfferId } from '../../store/offer/offer-selector';

type MapProps = {
  city: OfferProps;
  points: OfferProps[];
  className: string;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

export const OffersMap = (props: MapProps): JSX.Element =>{
  const {city, points, className } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const selectedPointId = useAppSelector(selectOfferId);

  useEffect(() => {
    map?.setView(
      [city.location.latitude, city.location.longitude], city.city.location.zoom
    );

    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPointId !== undefined && point.id === selectedPointId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [city, map, points, selectedPointId]);

  return <section className={className} ref={mapRef} />;
};
