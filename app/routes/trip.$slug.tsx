import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { getGQLClient } from '~/utils/graphql';
import { useTripContext } from './trip';
import { useLoaderData } from '@remix-run/react';
import type { Dispatch } from 'react';
import { useEffect } from 'react';
import type { CityFieldsFragment } from '~/gql/graphql';
import BackButton from '~/components/trip/BackButton';

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: 'Unknown city | Olympic Trip | John Heher' }, { name: 'description', content: `City not found` }];
  }

  const { city } = data;
  return [
    { title: `${city?.name} | Olympic Trip | John Heher` },
    { name: 'description', content: `John Heher's past or future trip to ${city?.name}` }
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const referSlug = url.searchParams.get('refer');

  if (!params.slug) {
    return json({ city: null, refer: null });
  }

  const sdk = getGQLClient();

  const now = new Date().toISOString();

  const response = await sdk.GetCity({ now, slug: params.slug });

  if (!response?.data?.cityBySlug?.name) {
    return json({ city: null, refer: null });
  }

  return json({
    city: response.data.cityBySlug,
    refer: referSlug ? { name: response?.data?.cityBySlug?.name, slug: referSlug } : null
  });
}

function CityTest({
  city,
  dispatch,
  refer
}: {
  city: CityFieldsFragment;
  dispatch: Dispatch<any>;
  refer: {
    name: any;
    slug: string;
  } | null;
}) {
  useEffect(() => {
    if (city?.slug) {
      dispatch({ type: 'SELECTED_ROUTE_LEG', selectedRouteLeg: null });
      dispatch({ type: 'SELECTED_CITY', selectedCity: city.slug });
      dispatch({ type: 'SELECTED_CITY_DATA', selectedCityData: city });

      const body = document.body;
      body.style.setProperty('background', 'var(--globe-background)');
    }
  }, [dispatch, city]);

  if (!city?.name) {
    return null;
  }

  return <BackButton refer={refer} />;
}

function CityPage() {
  const tripContext = useTripContext();
  const loaderData = useLoaderData<typeof loader>();

  if (!tripContext || !loaderData?.city) {
    return null;
  }

  const { dispatch } = tripContext;

  return <CityTest city={loaderData.city as CityFieldsFragment} dispatch={dispatch} refer={loaderData.refer} />;
}

export default CityPage;
