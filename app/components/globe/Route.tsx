import { myRoute } from './routeCoordinates';
import { RouteTrip } from './RouteTrip';
import { TripPageContext } from '~/routes/trip';
import { useContext } from 'react';
import ExtraCity from './ExtraCity';
import { getZoom, globeRadius, placeObjectOnPlanet } from './utils';
import { AnimatePresence } from 'framer-motion';
import { useThree } from '@react-three/fiber';

export function Route() {
  const context = useContext(TripPageContext);

  const { viewport } = useThree();

  if (!context?.selectedRouteLeg) {
    return null;
  }
  const { selectedRouteLeg } = context;

  const selectedRoute = myRoute[selectedRouteLeg - 1];

  const extraCities = selectedRoute?.extraCities?.map((coord) => placeObjectOnPlanet(coord, globeRadius)) || [];

  return (
    <group>
      <RouteTrip {...selectedRoute} />
      <AnimatePresence>
        {extraCities.map((markerInfo) => {
          return (
            <ExtraCity
              key={markerInfo.position[0]}
              markerInfo={markerInfo}
              zoom={getZoom(selectedRouteLeg, viewport.width)}
            />
          );
        })}
      </AnimatePresence>
    </group>
  );
}
