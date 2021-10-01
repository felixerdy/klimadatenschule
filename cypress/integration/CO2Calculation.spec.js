// CO2Calculation.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

import { treeToCO2 } from '../../tools/index';

describe('CO2 Calculation Test', () => {
  it('Fichte CO2 Calculation', () => {
    // Fichte
    // https://www.wald.de/waldwissen/wie-viel-kohlendioxid-co2-speichert-der-wald-bzw-ein-baum/
    const co2 = Math.floor(treeToCO2(157, 35, 400));

    expect(co2).to.equal(2519);
  });
  it('Buche CO2 Calculation', () => {
    // Fichte
    // https://www.wald.de/waldwissen/wie-viel-kohlendioxid-co2-speichert-der-wald-bzw-ein-baum/
    const co2 = Math.floor(treeToCO2(157, 35, 680));

    expect(co2).to.equal(4283);
  });
});
