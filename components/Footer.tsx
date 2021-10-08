import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import DatenschutzModal from './Modals/DatenschutzModal';
import ImpressumModal from './Modals/ImpressumModal';

import BildungsCentLogo from '../public/logos/logo_bc.png';
import MedialePfadeLogo from '../public/logos/logo_mp.png';
import ReeduLogo from '../public/logos/logo_reedu.svg';
import NKILogo from '../public/logos/logo_nki.png';

export default function Footer() {
  const [datenschutzModalOpen, setDatenschutzModalOpen] = useState(false);
  const [impressumModalOpen, setImpressumModalOpen] = useState(false);

  return (
    <div className="bg-footer">
      <div className="container py-14 px-6 mx-auto flex flex-col md:flex-row">
        <div className="flex-1 mt-4">
          <p className="font-semibold">Kontakt</p>
          <p>BildungsCent e.V.</p>
          <p>Oranienstraße 183</p>
          <p>D-10999 Berlin</p>
          <br />
          <p>
            Tel <a href="tel:+49 30 610 8144 80">+49 30 610 8144 80</a>
          </p>
          <p>Fax +49 30 610 8144 50</p>
          <a
            className="underline"
            href="mailto:klimadatenschule@bildungscent.de"
          >
            klimadatenschule@bildungscent.de
          </a>
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
        <div className="flex-1 mt-4 p-4 flex flex-col items-center text-center">
          <a href="https://bildungscent.de/" className="w-32 py-4">
            <Image src={BildungsCentLogo} alt="BildungsCent Logo"></Image>
          </a>
          <div className="flex items-center">
            <a href="https://reedu.de/" className="w-32">
              <Image src={ReeduLogo} alt="re:edu Logo"></Image>
            </a>
            <a href="https://medialepfade.org/" className="w-32">
              <Image src={MedialePfadeLogo} alt="Mediale Pfade Logo"></Image>
            </a>
          </div>
          <div className="w-64 rounded overflow-hidden">
            <Image src={NKILogo} alt="nki Logo"></Image>
          </div>
        </div>
        <div className="flex-1  mt-4">
          <p
            className="cursor-pointer"
            onClick={() => setImpressumModalOpen(true)}
          >
            Impressum
          </p>
          <p
            className="cursor-pointer"
            onClick={() => setDatenschutzModalOpen(true)}
          >
            Datenschutzhinweise
          </p>
        </div>
      </div>
      <DatenschutzModal
        opened={datenschutzModalOpen}
        closeModal={() => setDatenschutzModalOpen(false)}
      ></DatenschutzModal>
      <ImpressumModal
        opened={impressumModalOpen}
        closeModal={() => setImpressumModalOpen(false)}
      ></ImpressumModal>
    </div>
  );
}
