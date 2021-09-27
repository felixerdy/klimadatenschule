import Link from 'next/link';
import React, { useState } from 'react';
import DatenschutzModal from './Modals/DatenschutzModal';

export default function Footer() {
  const [datenschutzModalOpen, setDatenschutzModalOpen] = useState(false);

  return (
    <div className="bg-footer">
      <div className="container py-14 px-6 mx-auto flex flex-col md:flex-row">
        <div className="flex-1 mt-4">
          <p className="font-semibold">Kontakt</p>
          <p>BildungsCent e.V.</p>
          <p> Oranienstraße 183</p>
          <p>D-10999 Berlin</p>
          <br />
          <p>Tel +49 30 610 8144 80</p>
          <p>Fax +49 30 610 8144 50</p>
          <p>E-Mail klimadatenschule@bildungscent.de</p>
        </div>
        <div className="flex-1  mt-4">
          <p>
            KlimaDatenSchule ist ein Programm von BildungsCent e.V. und wird
            gemeinsam mit mediale pfade.org – Verein für Medienbildung e.V. und
            re:edu GmbH & Co. KG umgesetzt. Es wird gefördert vom
            Bundesministerium für Umwelt, Naturschutz und nukleare Sicherheit
            aufgrund eines Beschlusses des Deutschen Bundestages.
          </p>
        </div>
        <div className="flex-1  mt-4">
          <p className="font-semibold">Rechtliche Hinweise</p>
          <p>
            <Link href="#">
              <a>Impressum</a>
            </Link>
          </p>
          <p
            className="cursor-pointer"
            onClick={() => setDatenschutzModalOpen(true)}
          >
            Datenschutzhinweise
          </p>
          <p>Teilnahembestimmungen</p>
        </div>
      </div>
      <DatenschutzModal
        opened={datenschutzModalOpen}
        closeModal={() => setDatenschutzModalOpen(false)}
      ></DatenschutzModal>
    </div>
  );
}
