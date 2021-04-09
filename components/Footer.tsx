import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="bg-indigo-900 text-white">
      <div className="container py-14 px-6 mx-auto flex flex-col md:flex-row">
        <div className="flex-1 mt-4">
          <p className="font-semibold">Kontakt</p>
          <p>re:edu GmbH & Co. KG</p>
          <p>Von-Steuben-Str. 21</p>
          <p>48143 Münster</p>
        </div>
        <div className="flex-1  mt-4">
          <p className="font-semibold">Rechtliche Hinweise</p>
          <p>
            <Link href="#">
              <a>Impressum</a>
            </Link>
          </p>
          <p>
            <Link href="#">
              <a>Datenschutz</a>
            </Link>
          </p>
        </div>
        <div className="flex-1  mt-4">
          <p>
            KlimaDatenSchule ist ein Programm von BildungsCent e.V. und wird
            gemeinsam mit mediale pfade.org – Verein für Medienbildung e.V.
            umgesetzt. Es wird gefördert vom Bundesministerium für Umwelt,
            Naturschutz und nukleare Sicherheit aufgrund eines Beschlusses des
            Deutschen Bundestages.
          </p>
        </div>
      </div>
    </div>
  );
}
