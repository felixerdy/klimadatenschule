import { PaperProducts } from '../pages/papier';
import { PaperType } from '../types/paper';
import { Mobilities } from '../pages/mobilitaet';
import { MobilityType } from '../types/mobility';

// based on average from IPCC report
// https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/4_Volume4/V4_04_Ch4_Forest_Land.pdf
// p. 71 table 4.14
const DARRDICHTE_KG_M3 = 452;
const UMRECHNUNGSFAKTOR = 3.67;

const treeToCO2 = (
  circumference: number,
  height: number,
  darrdichte: number = DARRDICHTE_KG_M3
): number => {
  const radiusInM = circumference / (2 * Math.PI);

  const volumeInM3 = Math.PI * Math.pow(radiusInM, 2) * height;

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

const mobilityToCO2 = (distanceInKm: number, type: MobilityType): number => {
  return Number(
    (distanceInKm / 1000) * Mobilities.find(e => e.type === type).thgpkm
  );
};

export { treeToCO2, paperToCO2, mobilityToCO2 };
