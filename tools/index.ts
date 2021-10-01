const DARRDICHTE_KG_M3 = 600;
const UMRECHNUNGSFAKTOR = 3.67;

const treeToCO2 = (
  circumference: number,
  height: number,
  darrdichte: number = DARRDICHTE_KG_M3
): number => {
  const radius = circumference / (2 * Math.PI);
  const radiusInM = radius / 100;

  const volumeInM3 = (Math.PI * Math.pow(radiusInM, 2) * height) / 2;

  const darrdichteTotal = darrdichte * volumeInM3;

  const kohlenstoffanteil = darrdichteTotal * 0.5;

  const co2InKg = kohlenstoffanteil * UMRECHNUNGSFAKTOR;

  return co2InKg;
};

export { treeToCO2 };
