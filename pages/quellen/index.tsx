import React from 'react';
import Layout from '../../components/Layout';
import FlexSplitLayout from '../../components/Layouts/FlexSplitLayout';
import Image from 'next/image';
import BaumIcon from '../../public/images/kds-icon-baeume.svg';
import MobilitaetIcon from '../../public/images/kds-icon-mobilitaet.svg';
import PapierIcon from '../../public/images/kds-icon-papier.svg';
import NutritionIcon from '../../public/images/kds-icon-ernaehrung.svg';
import { TreeInfo, TreeSource } from '../../components/InfoText/tree';

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
              <h1 className="text-4xl">Bäume</h1>
              <TreeInfo />

              <p className="mt-8 text-2xl">Quellen:</p>
              <TreeSource />
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
              <p className="my-2">
                Verschiedene Verkehrsmittel stoßen unterschiedlich viele
                Treibhausgase aus. Dabei spielt auch die Auslastung der
                Verkehrsmittel eine entscheidende Rolle – also zum Beispiel, ob
                nur eine Person im Auto sitzt oder vier Personen. Die Berechnung
                der CO₂-Emissionen basiert auf Zahlen des Umweltbundesamtes.
                Diese Zahlen beziehen die durchschnittliche Auslastung von
                Verkehrsmitteln mit ein – beim Autoverkehr sind das zum Beispiel
                im Jahr 2019 und 2020 1,4 Personen pro PKW gewesen. Die
                Auslastungswerte werden so mit einberechnet, dass die Daten
                Personenkilometer widerspiegeln. Das bedeutet, dass die
                CO₂-Emissionen der jeweiligen Verkehrsmittel pro Person
                angegeben werden – ein Auto stößt also eigentlich die 1,4-fache
                Menge der angegebenen Treibhausgase pro Kilometer aus.
              </p>
              <p className="my-2">
                Das Umweltbundesamt berechnet die Daten mit einem speziellen
                Computerprogramm namens TREMOD, welches vom IFEU-Institut
                entwickelt wurde. Damit können die Daten laufend aktualisiert
                werden. Weitere Infos zu TREMOD gibt es hier:{' '}
                <a
                  href="https://www.umweltbundesamt.de/themen/verkehr-laerm/emissionsdaten#TREMOD"
                  className="text-blue-800 break-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.umweltbundesamt.de/themen/verkehr-laerm/emissionsdaten#TREMOD
                </a>
                .
              </p>
              <p className="mt-8 text-2xl">Quellen:</p>
              <ul className="list-disc my-2">
                <li>
                  <span className="font-semibold">
                    Emissionen verschiedener Verkehrsmittel in Deutschland pro
                    Person und pro Kilometer:
                  </span>{' '}
                  <a
                    href="https://www.umweltbundesamt.de/bild/vergleich-der-durchschnittlichen-emissionen-0"
                    className="text-blue-800 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Umweltbundesamt
                  </a>{' '}
                  (11/2021): Vergleich der durchschnittlichen Emissionen
                  einzelner Verkehrsmittel im Personenverkehr in Deutschland,{' '}
                  <a
                    href="https://www.umweltbundesamt.de/sites/default/files/medien/366/bilder/dateien/uba_emissionstabelle_personenverkehr_2020.pdf"
                    className="text-blue-800 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.umweltbundesamt.de/sites/default/files/medien/366/bilder/dateien/uba_emissionstabelle_personenverkehr_2020.pdf
                  </a>
                  , letzter Zugriff 04.12.2021.
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
              <p className="my-2">
                Der Papierrechner der <i>KlimaDaten-App</i> basiert auf dem
                Nachhaltigkeitsrechner der Initiative Pro Recyclingpapier. Die
                Daten beruhen auf einer Studie des Instituts für Energie- und
                Umweltforschung Heidelberg (IFEU-Institut) von 2006. Die Studie
                hat die Herstellungsprozesse von Büropapier aus Frischfasern und
                Recyclingpapier aus 100% Altpapier analysiert und jeweils deren
                Umweltbilanz berechnet. Die Studie ist bereits 15 Jahre alt und
                dennoch sind die Zahlen die aktuellsten, die es in diesem
                Bereich gibt. Dies zeigt, dass die Datenlage zu Emissionen der
                Papierproduktion in Deutschland nicht aktuell ist und hier
                dringender Aufholbedarf besteht.
              </p>
              <p className="my-2">
                Um in unserer App die CO₂-Emissionen der Papierprodukte zu
                berechnen, wird der CO₂-Ausstoß pro Blatt Papier mit der
                üblichen Anzahl von Blättern in den jeweiligen Heften, Blöcken
                oder Mappen multipliziert. Die Blattanzahl, mit der die Werte
                multipliziert werden, ist in den Beschreibungen der
                Eingabefelder jeweils angegeben. Die Werte sind nicht genau,
                weil zum Beispiel der Umschlag der Hefte nicht mit einberechnet
                wird. Auch dies zeigt, dass die Datenlage zu CO₂-Emissionen
                verschiedener konkreter Papierprodukte nicht ausreichend ist.
              </p>
              <p className="my-2">
                Um die CO₂-Emissionen der Papierprodukte präziser darstellen zu
                können, werden die Angaben in diesem Bereich in Gramm
                ausgegeben.
              </p>
              <p className="mt-8 text-2xl">Quellen:</p>
              <ul className="list-disc my-2">
                <li>
                  <span className="font-semibold">
                    Nachhaltigkeitsrechner der Initiative Pro Recyclingpapier.
                  </span>{' '}
                  Unter:{' '}
                  <a
                    href="https://www.papiernetz.de/informationen/nachhaltigkeitsrechner/"
                    className="text-blue-800 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.papiernetz.de/informationen/nachhaltigkeitsrechner/
                  </a>
                  , letzter Zugriff 04.12.2021.
                </li>
                <li>
                  <span className="font-semibold">
                    Datenquelle des Nachhaltigkeitrechners der Initiative Pro
                    Recyclingpapier:
                  </span>{' '}
                  IFEU- Institut (2006): Ökologischer Vergleich von Büropapieren
                  in Abhängigkeit vom Faserrohstoff. Unter:{' '}
                  <a
                    href="http://www.papiernetz.de/wp-content/uploads/ifeu-studie_langfassung.pdf"
                    className="text-blue-800 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    http://www.papiernetz.de/wp-content/uploads/ifeu-studie_langfassung.pdf
                  </a>
                  , letzter Zugriff 04.12.2021.
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
              <h1 className="text-4xl">Ernährung</h1>
              <p className="my-2">
                Um den CO₂-Fußabdruck einzelner Gerichte zu ermitteln, könnt ihr
                entweder den Klimatarier-CO₂-Recher verwenden, oder den
                CO₂-Rechner von schools4future.
              </p>
              <p className="my-2 font-semibold">Klimatarier-CO₂-Recher</p>
              <p className="my-2">
                Die CO₂ -Werte im Klimatarier-Rechner stammen vom IFEU-Institut.
                Um verschiedene Produktionsmethoden und Produktionsorte sowie
                saisonalen und nicht-saisonalen Anbau zu berücksichtigen, werden
                in diesem Rechner die Werte so berechnet, dass sie einem
                durchschnittlichen Lebensmittel in Deutschland entsprechen. Mehr
                Informationen dazu, wie die CO₂-Werte von Lebensmitteln im
                Klimatarier-Rechner ermittelt wurden, findet ihr{' '}
                <a
                  href="https://web.archive.org/web/20210814110817/https://www.klimatarier.com/de/Fragen/Glossar#CO2Lebensmittel"
                  className="text-blue-800 break-all"
                  target="_blank"
                  rel="noreferrer"
                >
                  hier
                </a>
                .
              </p>
              <p className="my-2 font-semibold">
                CO₂-Rechner von school4future
              </p>
              <p className="my-2">
                Die CO₂-Werte im CO₂-Rechner von schools4future stammen vom
                IFEU-Institut und vom Ökoinstitut. Die genauen Datenquellen sind
                im CO₂-Rechner aufgelistet. Bei diesem Rechner ist es möglich,
                zwischen konventionell produzierten Lebensmitteln und
                Bio-Lebensmitteln, sowie zwischen lokalen und nicht-lokalen
                Produkten zu unterscheiden.
              </p>
              <p className="my-2">
                Wie viele CO₂-Emissionen bei der Produktion einzelner
                Lebensmittel entstehen, ist von vielen verschiedenen Faktoren
                abhängig. Es macht zum Beispiel einen Unterschied, wo, wann und
                wie ein Lebensmittel angebaut wurde. Da beide CO₂-Rechner mit
                Durchschnittswerten arbeiten, ist der CO₂-Fußabdruck eines
                Gerichts also nicht immer ganz präzise. Trotzdem liefert er eine
                gute Orientierung und hilft dabei, verschiedene Gerichte
                miteinander zu vergleichen. So können Möglichkeiten, um
                Treibhausgase einzusparen, sichtbar gemacht werden.
              </p>

              <p className="mt-8 text-2xl">Quellen:</p>
              <ul className="list-disc my-2">
                <li>
                  <span className="font-semibold">Klimatarier-CO₂-Recher</span>{' '}
                  (2016) Unter:{' '}
                  <a
                    href="https://web.archive.org/web/20210814110817/https://www.klimatarier.com/de/Fragen/Glossar#CO2Lebensmittel"
                    className="text-blue-800 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://web.archive.org/web/20210814110817/https://www.klimatarier.com/de/Fragen/Glossar#CO2Lebensmittel
                  </a>
                  , letzter Zugriff 09.12.2021.
                </li>
                <li>
                  <span className="font-semibold">
                    CO₂-Rechner von schools4future
                  </span>{' '}
                  (2021) Unter:{' '}
                  <a
                    href="https://schools4future.de/materialien_co2-rechner/"
                    className="text-blue-800 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://schools4future.de/materialien_co2-rechner/
                  </a>
                  , letzter Zugriff 04.12.2021.
                </li>
                <li>
                  <span className="font-semibold">
                    Ergänzende Quelle für CO₂-Fußabdrücke vieler Lebensmittel in
                    Deutschland:
                  </span>{' '}
                  IFEU-Institut (2020): Ökologische Fußabdrücke von
                  Lebensmitteln und Gerichten in Deutschland. Unter:{' '}
                  <a
                    href=" https://www.ifeu.de/fileadmin/uploads/Reinhardt-Gaertner-Wagner-2020-Oekologische-Fu%C3%9Fabdruecke-von-Lebensmitteln-und-Gerichten-in-Deutschland-ifeu-2020.pdf"
                    className="text-blue-800 break-all"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://www.ifeu.de/fileadmin/uploads/Reinhardt-Gaertner-Wagner-2020-Oekologische-Fu%C3%9Fabdruecke-von-Lebensmitteln-und-Gerichten-in-Deutschland-ifeu-2020.pdf
                  </a>
                  , letzter Zugriff 04.12.2021.
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
