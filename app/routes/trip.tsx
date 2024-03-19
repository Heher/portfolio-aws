import type { MetaFunction } from '@remix-run/node';
import { Outlet, useLocation, useOutletContext } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Dispatch } from 'react';
import { Suspense, createContext, useEffect, useReducer, lazy } from 'react';
import useMeasure from 'react-use-measure';
// import { GlobeContainer } from '~/components/globe/GlobeContainer';
import { ImageModal } from '~/components/modals/ImageModal';
import CitySlider from '~/components/olympiad-city/CitySlider';

import visits from '~/data/visits';
import type { CityFieldsFragment } from '~/gql/graphql';
import type { Visit } from '~/types/globe';

const LazyGlobeContainer = lazy(() => import('~/components/globe/GlobeContainer').then(module => ({ default: module.GlobeContainer }));

export const meta: MetaFunction = () => {
  return [
    { title: 'John Heher | Olympic Trip' },
    {
      name: 'description',
      content: "John Heher's Olympic trip: visiting every city that has hosted the Olympic Games."
    },
    {
      name: 'og:title',
      content: 'John Heher | Olympic Trip'
    },
    {
      name: 'og:image',
      content: '/olympic-cities-og.jpg'
    }
  ];
};

type TripPageState = {
  selectedImage: string | null;
  moveableGlobe: boolean;
  selectedCity: string | null;
  selectedCityData: CityFieldsFragment | null;
  selectedRouteLeg: number | null;
  loaded: boolean;
};

export type OutletContextType = {
  handleImageModal: (img: string | null) => void;
  width: number;
  visits: Visit[];
  toggleBodyBackground: () => void;
  appState: TripPageState;
  dispatch: Dispatch<any>;
};

type Action =
  | { type: 'IMAGE'; selectedImage: string | null }
  | { type: 'MOVEABLE_GLOBE'; moveableGlobe: boolean }
  | { type: 'SELECTED_CITY'; selectedCity: string | null }
  | { type: 'SELECTED_CITY_DATA'; selectedCityData: CityFieldsFragment | null }
  | { type: 'SELECTED_ROUTE_LEG'; selectedRouteLeg: number | null }
  | { type: 'LOADED'; loaded: boolean };

export type ContextType = TripPageState & {
  width: number;
  visits: Visit[];
};

const reducer = (state: TripPageState, action: Action) => {
  switch (action.type) {
    case 'IMAGE':
      return { ...state, selectedImage: action.selectedImage };
    case 'MOVEABLE_GLOBE':
      return { ...state, moveableGlobe: action.moveableGlobe };
    case 'SELECTED_CITY':
      return { ...state, selectedCity: action.selectedCity };
    case 'SELECTED_CITY_DATA':
      return { ...state, selectedCityData: action.selectedCityData };
    case 'SELECTED_ROUTE_LEG':
      return { ...state, selectedRouteLeg: action.selectedRouteLeg };
    case 'LOADED':
      return { ...state, loaded: action.loaded };
    default:
      return state;
  }
};

function GlobeFallback() {
  return <div>Loading...</div>;
}

const initialState: TripPageState = {
  selectedImage: null,
  moveableGlobe: false,
  selectedCity: null,
  selectedCityData: null,
  selectedRouteLeg: null,
  loaded: false
};

function toggleBodyBackground() {
  const body = document.body;

  body.classList.toggle('bg-[var(--globe-background)]');
  body.classList.toggle('bg-[var(--nav-background)]');
}

export const TripPageContext = createContext<ContextType | null>(null);
export const TripPageDispatchContext = createContext<Dispatch<any> | null>(null);

export default function TripPage() {
  const location = useLocation();
  const [pageContainerRef, { width }] = useMeasure({ debounce: 300 });

  const [state, dispatch] = useReducer(reducer, initialState);

  const { selectedImage, selectedCity, selectedCityData } = state;

  useEffect(() => {
    if (location?.pathname === '/' || location?.pathname === '/trip') {
      dispatch({ type: 'SELECTED_CITY', selectedCity: null });
      dispatch({ type: 'SELECTED_ROUTE_LEG', selectedRouteLeg: null });
    }
  }, [location.pathname]);

  function handleImageModal(img: string | null) {
    const body = document.body;

    body.classList.toggle('bg-slate-200');
    dispatch({ type: 'IMAGE', selectedImage: img });
  }

  return (
    <main ref={pageContainerRef} className={`relative mx-auto min-h-[100dvh] w-full max-w-[var(--max-width)]`}>
      <div className="fixed left-0 top-0 z-[-1] h-full min-h-[100dvh] w-full bg-gradient-to-b from-[var(--globe-background)] to-[var(--nav-background)] to-50%"></div>
      <div className="body-container mx-auto h-[100dvh] max-w-[var(--max-width)]">
        {width > 0 && (
          <motion.div
            className={`globe-container fixed left-0 top-0 -z-0 h-full w-full `}
            transition={{ type: 'tween', ease: 'anticipate', duration: 0.6 }}
            initial={false}
          >
            <Suspense fallback={<GlobeFallback />}>
              <TripPageContext.Provider value={{ ...state, width, visits }}>
                <TripPageDispatchContext.Provider value={dispatch}>
                  <LazyGlobeContainer />
                </TripPageDispatchContext.Provider>
              </TripPageContext.Provider>
            </Suspense>
          </motion.div>
        )}
        <AnimatePresence mode="wait">
          <Outlet
            context={{
              handleImageModal,
              width,
              visits,
              toggleBodyBackground,
              appState: state,
              dispatch
            }}
          />
        </AnimatePresence>
        <AnimatePresence>
          {selectedCity && <CitySlider data={selectedCityData} visits={visits} handleImageModal={handleImageModal} />}
        </AnimatePresence>
        {selectedImage && <ImageModal img={selectedImage} closeModal={() => handleImageModal(null)} />}
      </div>
    </main>
  );
}

export const useTripContext = () => {
  return useOutletContext<OutletContextType>();
};
