import React from 'react';
import Layout from '../../components/Layout';
import FlexSplitLayout from '../../components/Layouts/FlexSplitLayout';
import Image from 'next/image';
import BaumIcon from '../../public/images/kds-icon-baeume.svg';
import MobilitaetIcon from '../../public/images/kds-icon-mobilitaet.svg';
import PapierIcon from '../../public/images/kds-icon-papier.svg';
import NutritionIcon from '../../public/images/kds-icon-ernaehrung.svg';

const Sources = () => {
  return (
    <Layout>
      <div className="page">
        <h1 className="text-5xl text-center uppercase my-20">
          Daten&shy;quellen
        </h1>
        <main>
          <FlexSplitLayout>
            <div className="flex-1" id="baeume">
              <div className="max-w-xs">
                <Image src={BaumIcon} alt="Baum Icon"></Image>
              </div>
            </div>
            <div className="flex-1">
              <h1 className=" text-4xl">Bäume</h1>
              <p className="my-2">
                Die Speicherung von CO₂ in Bäumen ist von verschiedenen Faktoren
                wie das Alter, die Baumart oder den Standort abhängig.
                Grundsätzlich muss zunächst die Holzmasse bestimmt werden. Diese
                wird über den Umfang und die Höhe berechnet. Die Holzmasse wird
                dann halbiert um das zylindrische Volumen (Grundfläche in
                Brusthöhe x Gesamthöhe des Baumes) in sein tatsächliches Volumen
                umzurechnen.
              </p>
              <p className="my-2">
                Mit der{' '}
                <a
                  href="https://de.wikipedia.org/wiki/Darrdichte"
                  className="text-blue-800"
                >
                  Darrdichte
                </a>{' '}
                (beschreibt die Dichte des trockenen Holzes) wird die trockene
                Holzmasse bestimmt woraus wiederum der Kohlenstoffanteil
                berechnet werden kann (50% der trockenen Holzmasse). Da die
                Darrdichte von der Baumart abhängig ist, wird in dieser App ein
                Durchschnittswert von 600 kg/m³ verwendet. Aus dem
                Kohlenstoffanteil wird letztendlich über den Umrechnungsfaktor
                3,67 die Masse von CO₂ berechnet.
              </p>
              <p className="mt-2">Quellen:</p>
              <ul>
                <li className="list-disc">
                  <a
                    href="https://www.wald.de/waldwissen/wie-viel-kohlendioxid-co2-speichert-der-wald-bzw-ein-baum/"
                    className="text-blue-800"
                  >
                    Berechnung Stiftung Unternehmen Wald
                  </a>
                </li>
                <li className="list-disc">
                  <a
                    href="https://www.co2online.de/service/klima-orakel/beitrag/wie-viele-baeume-braucht-es-um-eine-tonne-co2-zu-binden-10658/"
                    className="text-blue-800"
                  >
                    Expertenantwort co2online
                  </a>
                </li>
                <li className="list-disc">
                  <a
                    href="https://www.paulownia-baumschule.de/klimabaum/"
                    className="text-blue-800"
                  >
                    Der Klimabaum Paulownia Baumschule
                  </a>
                </li>
              </ul>
            </div>
          </FlexSplitLayout>
          <hr className="my-8" />
          <FlexSplitLayout>
            <div className="flex-1" id="mobilitaet">
              <div className="max-w-xs">
                <Image src={MobilitaetIcon} alt="Mobilität Icon"></Image>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-4xl">Mobilität</h1>
              <p>
                Verschiedene Verkehrsmittel stoßen unterschiedlich viel CO2 aus.
                Dabei spielt auch die Auslastung eine entscheidene Rolle. Die
                Berechnung basiert auf Zahlen des Umweltbundesamtes welche
                ebenfalls die durchschnittliche Auslastung von Verkehrsmitteln
                mit einbezieht.
              </p>
              <p className="mt-2">Quellen:</p>
              <ul>
                <li className="list-disc">
                  <a
                    href="https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0"
                    className="text-blue-800"
                  >
                    Umweltbundesamt
                  </a>
                </li>
              </ul>
            </div>
          </FlexSplitLayout>
          <hr className="my-8" />
          <FlexSplitLayout>
            <div className="flex-1" id="papier">
              <div className="max-w-xs">
                <Image src={PapierIcon} alt="Papier Icon"></Image>
              </div>
            </div>
            <div className="flex-1">
              <h1 className=" text-4xl">Papier</h1>
              <p>
                Der Papierrechner dieser App basiert auf dem Rechner der
                &quot;Initiative Pro Recyclingpapier&quot; wessen Daten auf
                einer Studie des IFEU-Institut für Energie- und Umweltforschung
                Heidelberg basieren. Der CO2 Ausstoß pro Blatt Papier wird mit
                der üblichen Anzahl von Blättern in den jeweiligen Heften
                multipliziert. Aufgrund der geringen Menge wird der CO2 Ausstoß
                hier in Gramm ausgegeben
              </p>
              <p className="mt-2">Quellen:</p>
              <ul>
                <li className="list-disc">
                  <a
                    href="https://www.papiernetz.de/informationen/nachhaltigkeitsrechner/"
                    className="text-blue-800"
                  >
                    Rechner Papiernetz
                  </a>
                </li>
                <li className="list-disc">
                  <a
                    href="http://www.papiernetz.de/wp-content/uploads/ifeu-studie_langfassung.pdf"
                    className="text-blue-800"
                  >
                    Studie IFEU
                  </a>
                </li>
              </ul>
            </div>
          </FlexSplitLayout>
          <hr className="my-8" />
          <FlexSplitLayout>
            <div className="flex-1" id="ernaehrung">
              <div className="max-w-xs">
                <Image src={NutritionIcon} alt="Ernährung Icon"></Image>
              </div>
            </div>
            <div className="flex-1">
              <h1 className=" text-4xl">Ernährung</h1>
              <p>
                Die CO2-Werte im Rechner wurden vom IFEU-Institut für Energie-
                und Umweltforschung Heidelberg berechnet. Der CO2 Ausstoß von
                Lebensmitteln ist stark von verschiedenen Faktoren wie Anbau,
                Transport oder Lagerung abhängig.
              </p>
              <p className="mt-2">Quellen:</p>
              <ul>
                <li className="list-disc">
                  <a
                    href="https://web.archive.org/web/20210814110817/https://www.klimatarier.com/de/Fragen/Glossar#CO2Lebensmittel"
                    className="text-blue-800"
                  >
                    Glossar Klimatarier
                  </a>
                </li>
              </ul>
            </div>
          </FlexSplitLayout>
        </main>
      </div>
    </Layout>
  );
};

export default Sources;
