import { PaperProducts } from '../pages/papier';
import { MobilityDescription, MobilityType } from '../types/mobility';
import { PaperType } from '../types/paper';

const DARRDICHTE_KG_M3 = 600;
const UMRECHNUNGSFAKTOR = 3.67;

const treeToCO2 = (
  circumference: number,
  height: number,
  darrdichte: number = DARRDICHTE_KG_M3
): number => {
  const radiusInM = circumference / (2 * Math.PI);

  const volumeInM3 = (Math.PI * Math.pow(radiusInM, 2) * height) / 2;

  const darrdichteTotal = darrdichte * volumeInM3;

  const kohlenstoffanteil = darrdichteTotal * 0.5;

  const co2InKg = kohlenstoffanteil * UMRECHNUNGSFAKTOR;

  if (isNaN(co2InKg)) {
    return 0;
  }

  return co2InKg;
};

const paperToCO2 = (gram: number, type: PaperType): number => {
  return Number(gram * PaperProducts.find(e => e.type === type).thgpst);
};

// https://www.umweltbundesamt.de/themen/verkehr-laerm/emissionsdaten#grafik
const Mobilities: MobilityDescription[] = [
  {
    type: 'pkw',
    title: 'Auto in km',
    thgpkm: 154
  },
  {
    type: 'bahn',
    title: 'Zug in km',
    thgpkm: 54
  },
  {
    type: 'bus',
    title: 'Bus in km',
    thgpkm: 83
  },
  {
    type: 'ubahn',
    title: 'S-Bahn / U-Bahn in km',
    thgpkm: 54
  },
  {
    type: 'fahrrad',
    title: 'Fahrrad in km',
    thgpkm: 0
  },
  {
    type: 'fuss',
    title: 'zu Fuß in km',
    thgpkm: 0
  }
];

const mobilityToCO2 = (distanceInKm: number, type: MobilityType): number => {
  return Number(
    (distanceInKm / 1000) * Mobilities.find(e => e.type === type).thgpkm
  );
};

export { treeToCO2, paperToCO2, mobilityToCO2 };
