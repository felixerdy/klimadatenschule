const TreeInfo = () => (
  <>
    <p className="my-2">
      Eine Tonne Holz bindet ungefähr eine halbe Tonne Kohlenstoff. Um zu
      berechnen, wie viel Kohlenstoff die von euch kartierten Bäume ungefähr
      speichern, müssen wir also die Masse (m) der Bäume ermitteln – die Hälfte
      der Masse entspricht dann dem Kohlenstoffgehalt (C).
    </p>
    <p className="my-2">
      Dabei gehen wir in der <i>KlimaDaten-App</i> folgendermaßen vor:
    </p>
    <ol className="list-decimal">
      <li className="my-2">
        Volumen des Baumes (V) berechnen mit den von euch gemessenen Werten zur
        Höhe (h) und dem Umfang (u) des Baumes.
        <p className="my-2">
          Es gibt verschiedene Möglichkeiten, um das Volumen eines Baumes zu
          berechnen. Wir nutzen hier eine Vereinfachung und bestimmen das
          Volumen eines Baumes näherungsweise mit dem Volumen eines Zylinders.
          Wir nehmen damit an, dass der nach oben hin dünner werdende Baumstamm
          durch die vielen Äste und auch die Wurzeln unter der Erde ausgeglichen
          wird.
        </p>
        <p className="my-2">
          <p className="font-semibold">Volumenformel für einen Zylinder</p>
          <p>V = π * r² * h</p>
          <p>
            Dazu benötigt man den Radius (r), der mit dem Umfang (u) berechnet
            werden kann:
          </p>
          <p>r = u / (2 * π)</p>
        </p>
      </li>
      <li className="my-2">
        Masse des Baumes berechnen
        <p className="my-2">
          Um die Masse (m) des Baumes zu berechnen, wird das Volumen des Baumes
          (V) mit der Dichte des trockenen Holzes (D) (auch Darrdichte genannt)
          multipliziert.
        </p>
        <p className="my-2">m = V * D</p>
        <p>
          Die Dichte des trockenen Holzes (D) ist von der Baumart abhängig. In
          der <i>KlimaDaten-App</i> nutzen wir einen Durchschnittswert von 452
          kg/m³ basierend auf Daten des IPCC für Baumarten unserer Klimazone.
        </p>
      </li>
      <li className="my-2">
        Kohlenstoffgehalt (C) berechnen
        <p className="my-2">C = 0,5 * m</p>
      </li>
      <li className="my-2">
        Kohlenstoffgehalt (C) in CO₂ umrechnen
        <p className="my-2">
          Der in den Bäumen gespeicherte Kohlenstoff kann mit einem Faktor von
          3,67 zu CO₂ umgerechnet werden (1 kg C entspricht 3,67 kg CO₂).
        </p>
        <p className="my-2">CO₂ = C * 3,67</p>
        <p className="my-2">
          Wie viel CO₂ ein Baum binden kann, hängt von verschiedenen Faktoren
          ab; zum Beispiel vom Alter und dem Standort des Baumes oder von der
          Baumart. In unserer Berechnung können wir nicht alle einzelnen
          Faktoren berücksichtigen.
        </p>
      </li>
    </ol>
  </>
);

const TreeSource = () => (
  <>
    <ul className="my-2 list-disc">
      <li>
        <span className="font-semibold">
          Kohlenstoffanteil der gesamten Holzmasse und Faktor zur Umrechnung von
          Kohlenstoff zu CO₂:
        </span>{' '}
        co2online (ohne Datum): Wie viel CO₂ wird bei der Verbrennung von Holz
        frei? Unter:{' '}
        <a
          href="https://www.co2online.de/service/klima-orakel/beitrag/wie-viel-co2-wird-bei-der-verbrennung-von-holz-frei-8572/"
          className="text-blue-800 break-all"
          target="_blank"
          rel="noreferrer"
        >
          https://www.co2online.de/service/klima-orakel/beitrag/wie-viel-co2-wird-bei-der-verbrennung-von-holz-frei-8572/
        </a>
        , letzter Zugriff 09.12.2021.
      </li>
      <li>
        <span className="font-semibold">
          Näherung des Baumvolumens als Zylinder:
        </span>{' '}
        OroVerde – die Tropenwaldstiftung (ohne Datum): “Wieviel ist das in
        Bäumen?” - Beispielrechnung. Unter:{' '}
        <a
          href="https://regenwald-unterrichtsmaterial.oroverde.de/fileadmin/user_upload/Unterrichtseinheiten/Hintergrund-Dateien/07.04_LI_WievielinBaeumen.pdf"
          className="text-blue-800 break-all"
          target="_blank"
          rel="noreferrer"
        >
          https://regenwald-unterrichtsmaterial.oroverde.de/fileadmin/user_upload/Unterrichtseinheiten/Hintergrund-Dateien/07.04_LI_WievielinBaeumen.pdf
        </a>
        , letzter Zugriff 09.12.2021.
      </li>
      <li>
        <span className="font-semibold">
          Holzdichte ausgewählter Baumarten der gemäßigten und borealen
          Klimazonen:
        </span>{' '}
        IPCC (2006): 2006 IPCC Guidelines for National Greenhouse Gas
        Inventories, Chapter 4 Forest Land. Tabelle 4.14, Seite 71. Unter:{' '}
        <a
          href="https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/4_Volume4/V4_04_Ch4_Forest_Land.pdf"
          className="text-blue-800 break-all"
          target="_blank"
          rel="noreferrer"
        >
          https://www.ipcc-nggip.iges.or.jp/public/2006gl/pdf/4_Volume4/V4_04_Ch4_Forest_Land.pdf
        </a>
        , letzter Zugriff 09.12.2021.
      </li>
    </ul>
  </>
);

export { TreeInfo, TreeSource };
