import type { Coordinate } from 'types/globe';

export type CityType = {
  coord: Coordinate;
  scale: number;
  name: string;
  type: 'summer' | 'winter';
  years: string[];
};

export const coordinates: { [key: string]: Coordinate } = {
  athens: [37.9838, -23.7275],
  paris: [48.8566, -2.3522],
  stLouis: [38.627, 90.1994],
  london: [51.5072, 0.1276],
  amsterdam: [52.37, -4.89],
  stockholm: [59.3293, -18.0686],
  antwerp: [51.2213, -4.4051],
  losAngeles: [34.0522, 118.2437],
  berlin: [52.52, -13.405],
  helsinki: [60.1699, -24.9384],
  melbourne: [-37.8136, -144.9631],
  rome: [41.9028, -12.4964],
  tokyo: [35.6762, -139.6503],
  mexico: [19.4326, 99.1332],
  munich: [48.1351, -11.582],
  montreal: [45.5017, 73.5673],
  moscow: [55.7558, -37.6173],
  seoul: [37.5665, -126.978],
  barcelona: [41.3874, -2.1686],
  atlanta: [33.749, 84.388],
  sydney: [-33.8688, -151.2093],
  beijing: [39.9042, -116.4074],
  rio: [-22.9068, 43.1729],

  chamonix: [45.9237, -6.8694],
  stMoritz: [46.4908, -9.8355],
  lakePlacid: [44.2795, 73.9799],
  garmisch: [47.4919, -11.0948],
  oslo: [59.9139, -10.7522],
  cortina: [46.5405, -12.1357],
  palisades: [39.1976, 120.2354],
  innsbruck: [47.2692, -11.4041],
  grenoble: [45.1885, -5.7245],
  sapporo: [43.0618, -141.3545],
  sarajevo: [43.8563, -18.4131],
  calgary: [51.0447, 114.0719],
  albertville: [45.6755, -6.3927],
  lillehammer: [61.1153, -10.4662],
  nagano: [36.6485, -138.195],
  saltLake: [40.7608, 111.891],
  torino: [45.0703, -7.6869],
  vancouver: [49.2827, 123.1207],
  sochi: [43.6028, -39.7342],
  pyeongchang: [37.3705, -128.39]
};

export const cities: CityType[] = [
  { coord: coordinates['athens'], scale: 1.2, name: 'athens', type: 'summer', years: ['1896', '2004'] },
  { coord: coordinates['paris'], scale: 1.2, name: 'paris', type: 'summer', years: ['1900', '1924'] },
  { coord: coordinates['stLouis'], scale: 1.2, name: 'st-louis', type: 'summer', years: ['1904'] },
  { coord: coordinates['london'], scale: 1.2, name: 'london', type: 'summer', years: ['1908', '1948', '2012'] },
  { coord: coordinates['stockholm'], scale: 1.2, name: 'stockholm', type: 'summer', years: ['1912'] },
  { coord: coordinates['antwerp'], scale: 1.2, name: 'antwerp', type: 'summer', years: ['1920'] },
  { coord: coordinates['chamonix'], scale: 1.2, name: 'chamonix', type: 'winter', years: ['1924'] },
  { coord: coordinates['stMoritz'], scale: 1.2, name: 'st-moritz', type: 'winter', years: ['1928'] },
  { coord: coordinates['amsterdam'], scale: 1.2, name: 'amsterdam', type: 'summer', years: ['1928'] },
  { coord: coordinates['lakePlacid'], scale: 1.2, name: 'lake-placid', type: 'winter', years: ['1932'] },
  { coord: coordinates['losAngeles'], scale: 1.5, name: 'los-angeles', type: 'summer', years: ['1932'] },
  { coord: coordinates['berlin'], scale: 1.2, name: 'berlin', type: 'summer', years: ['1936'] },
  { coord: coordinates['garmisch'], scale: 1.2, name: 'garmisch-partenkirchen', type: 'winter', years: ['1936'] },
  { coord: coordinates['oslo'], scale: 1.2, name: 'oslo', type: 'winter', years: ['1952'] },
  { coord: coordinates['helsinki'], scale: 1.2, name: 'helsinki', type: 'summer', years: ['1952'] },
  { coord: coordinates['melbourne'], scale: 1.2, name: 'melbourne', type: 'summer', years: ['1956'] },
  { coord: coordinates['cortina'], scale: 1.2, name: 'cortina-dampezzo', type: 'winter', years: ['1956'] },
  { coord: coordinates['rome'], scale: 1.2, name: 'rome', type: 'summer', years: ['1960'] },
  { coord: coordinates['palisades'], scale: 1.2, name: 'palisades-tahoe', type: 'winter', years: ['1960'] },
  { coord: coordinates['tokyo'], scale: 1.2, name: 'tokyo', type: 'summer', years: ['1964', '2020'] },
  { coord: coordinates['innsbruck'], scale: 1.2, name: 'innsbruck', type: 'winter', years: ['1928', '1948'] },
  { coord: coordinates['mexico'], scale: 1.2, name: 'mexico-city', type: 'summer', years: ['1968'] },
  { coord: coordinates['grenoble'], scale: 1.2, name: 'grenoble', type: 'winter', years: ['1968'] },
  { coord: coordinates['sapporo'], scale: 1.2, name: 'sapporo', type: 'winter', years: ['1972'] },
  { coord: coordinates['munich'], scale: 1.2, name: 'munich', type: 'summer', years: ['1972'] },
  { coord: coordinates['montreal'], scale: 1.2, name: 'montreal', type: 'summer', years: ['1976'] },
  { coord: coordinates['moscow'], scale: 1.2, name: 'moscow', type: 'summer', years: ['1980'] },
  { coord: coordinates['sarajevo'], scale: 1.2, name: 'sarajevo', type: 'winter', years: ['1984'] },
  { coord: coordinates['calgary'], scale: 1.2, name: 'calgary', type: 'winter', years: ['1988'] },
  { coord: coordinates['seoul'], scale: 1.2, name: 'seoul', type: 'summer', years: ['1988'] },
  { coord: coordinates['barcelona'], scale: 1.2, name: 'barcelona', type: 'summer', years: ['1992'] },
  { coord: coordinates['albertville'], scale: 1.2, name: 'albertville', type: 'winter', years: ['1992'] },
  { coord: coordinates['lillehammer'], scale: 1.2, name: 'lillehammer', type: 'winter', years: ['1994'] },
  { coord: coordinates['atlanta'], scale: 1.2, name: 'atlanta', type: 'summer', years: ['1996'] },
  { coord: coordinates['nagano'], scale: 1.2, name: 'nagano', type: 'winter', years: ['1998'] },
  { coord: coordinates['sydney'], scale: 1.2, name: 'sydney', type: 'summer', years: ['2000'] },
  { coord: coordinates['saltLake'], scale: 1.2, name: 'salt-lake-city', type: 'winter', years: ['2002'] },
  { coord: coordinates['torino'], scale: 1.2, name: 'torino', type: 'winter', years: ['2006'] },
  { coord: coordinates['beijing'], scale: 1.2, name: 'beijing', type: 'summer', years: ['2008'] },
  { coord: coordinates['vancouver'], scale: 1.2, name: 'vancouver', type: 'winter', years: ['2010'] },
  { coord: coordinates['sochi'], scale: 1.2, name: 'sochi', type: 'winter', years: ['2014'] },
  { coord: coordinates['rio'], scale: 1.2, name: 'rio-de-janeiro', type: 'summer', years: ['2016'] },
  { coord: coordinates['pyeongchang'], scale: 1.2, name: 'pyeongchang', type: 'winter', years: ['2018'] }
];
