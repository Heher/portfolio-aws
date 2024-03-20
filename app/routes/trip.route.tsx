import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useEffect } from 'react';
import { Selector } from '~/components/route/Selector';
import { useTripContext } from './trip';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getGQLClient } from '~/utils/graphql';
import BackButton from '~/components/trip/BackButton';

export type RouteContext = {
  dispatch: React.Dispatch<any>;
};

export const meta: MetaFunction = () => {
  return [
    { title: 'My Route | Olympic Trip' },
    {
      name: 'description',
      content: "John Heher's Olympic trip route."
    },
    {
      name: 'og:title',
      content: 'My Route | Olympic Trip'
    },
    {
      name: 'og:image',
      content: '/olympic-cities-og.jpg'
    }
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const referSlug = url.searchParams.get('refer');

  const sdk = getGQLClient();

  if (referSlug) {
    const referResponse = await sdk.GetCityName({ slug: referSlug });
    // const refer = referResponse?.data?.cityBySlug?.name || null;
    return json({ refer: { name: referResponse?.data?.cityBySlug?.name, slug: referSlug } });
  }

  return json({ refer: null });
}

function RoutePage() {
  const { width, appState, dispatch } = useTripContext();
  const { selectedRouteLeg } = appState;

  useEffect(() => {
    dispatch({ type: 'SELECTED_CITY', selectedCity: null });
    dispatch({ type: 'SELECTED_CITY_DATA', selectedCityData: null });

    const body = document.body;
    body.style.setProperty('background', 'var(--globe-background)');
  }, [dispatch]);

  const loaderData = useLoaderData<typeof loader>() || {};

  return (
    <div>
      <BackButton refer={loaderData.refer} />
      {selectedRouteLeg !== null && <Selector width={width} />}
      <Outlet context={{ dispatch }} />
    </div>
  );
}

export default RoutePage;
