import type { CityFieldsFragment, CityOlympiadFragment, OlympiadFieldsFragment } from '~/gql/graphql';
import type { Visit } from '~/types/globe';

export function cityStatus(
  olympiads: (CityOlympiadFragment | null)[],
  visits: Visit[]
): { amountCompleted: number; totalOlympiads: number } {
  let amountCompleted = 0;

  olympiads.forEach((olympiad) => {
    const visit = visits.find(
      (visit) => visit.year === olympiad?.year.toString() && visit.type === olympiad.olympiadType?.toLowerCase()
    );

    if (visit) amountCompleted++;
  });

  return {
    amountCompleted,
    totalOlympiads: olympiads.length
  };
}

//* Not sure why this isn't working with variables
//* but I had to change it to hex values to get it to work
// export function statusColor(amountCompleted: number, totalOlympiads: number, card = false) {
//   let color = '[color:var(--negative)]';

//   if (amountCompleted === totalOlympiads) {
//     color = '[color:var(--positive)]';
//   }

//   if (amountCompleted < totalOlympiads && amountCompleted > 0) {
//     color = '[#FFA566]';
//   }

//   if (card) {
//     return `bg-${color}`;
//   }

//   return `border-${color}`;
// }

export function statusColor(amountCompleted: number, totalOlympiads: number) {
  if (amountCompleted === totalOlympiads) {
    return 'positive';
  }

  if (amountCompleted < totalOlympiads && amountCompleted > 0) {
    return 'incomplete';
  }

  return `negative`;
}

export function statusColorSlug(amountCompleted: number, totalOlympiads: number) {
  if (amountCompleted === totalOlympiads) {
    return 'from-[var(--positive)] to-50%';
  }

  if (amountCompleted < totalOlympiads && amountCompleted > 0) {
    return 'from-[var(--incomplete)] to-50%';
  }

  return `from-[var(--negative)] to-50%`;
}

export function filterOutNonOlympiadsForCity(
  cityName: string,
  olympiads: (CityOlympiadFragment | null)[] | undefined | null
) {
  if (!olympiads) {
    return [];
  }

  //* filter out 1906 Athens and 1956 Stockholm
  return olympiads.filter((olympiad) => {
    if (!olympiad) {
      return false;
    }

    if (olympiad.year === 1906) {
      return false;
    }

    if (olympiad.year === 1956) {
      if (cityName === 'Stockholm') {
        return false;
      }
    }
    return true;
  });
}

export function filterOutNonOlympiads(olympiads: readonly OlympiadFieldsFragment[]) {
  //* filter out 1906 Athens and 1956 Stockholm
  return olympiads.filter((olympiad) => {
    if (!olympiad) {
      return false;
    }

    if (olympiad.year === 1906) {
      return false;
    }

    if (olympiad.year === 1956) {
      const { name } = olympiad.city as CityFieldsFragment;
      if (name === 'Stockholm') {
        return false;
      }
    }
    return true;
  });
}
