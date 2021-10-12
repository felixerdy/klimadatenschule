import { PaperProducts } from '../pages/papier';
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

  return co2InKg;
};

const paperToCO2 = (gram: number, type: PaperType): number => {
  return Number(gram * PaperProducts.find(e => e.type === type).thgpst);
};

export { treeToCO2, paperToCO2 };
