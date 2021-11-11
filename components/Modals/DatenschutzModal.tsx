import React from 'react';
import { Modal } from '@webeetle/windy';
import { Organisation, OrganisationType } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface ModalProps {
  opened: boolean;
  closeModal: (...args: any[]) => any;
}

const DatenschutzModal: React.FC<ModalProps> = ({ opened, closeModal }) => {
  const router = useRouter();

  return (
    <Modal
      isOpen={opened}
      title="Datenschutzerklärung"
      onClickIcon={closeModal}
      size="lg"
    >
      <h2 className="text-2xl mb-4">1. Datenschutz auf einen Blick</h2>
      <h3 className="text-xl mb-4">Allgemeine Hinweise</h3>{' '}
      <p className="mb-4">
        Die folgenden Hinweise geben einen einfachen &Uuml;berblick
        dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie
        diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
        denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
        Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie
        unserer unter diesem Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.
      </p>
      <h3 className="text-xl mb-4">Datenerfassung auf dieser Website</h3>{' '}
      <h4 className="font-semibold">
        Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?
      </h4>{' '}
      <p className="mb-4">
        Die Datenverarbeitung auf dieser Website erfolgt durch den
        Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt
        &bdquo;Hinweis zur Verantwortlichen Stelle&ldquo; in dieser
        Datenschutzerkl&auml;rung entnehmen.
      </p>{' '}
      <h4 className="font-semibold">Wie erfassen wir Ihre Daten?</h4>{' '}
      <p className="mb-4">
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
        mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie in
        ein Kontaktformular eingeben.
      </p>{' '}
      <p className="mb-4">
        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch
        der Website durch unsere IT-Systeme erfasst. Das sind vor allem
        technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder
        Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
        automatisch, sobald Sie diese Website betreten.
      </p>{' '}
      <h4 className="font-semibold">Wof&uuml;r nutzen wir Ihre Daten?</h4>{' '}
      <p className="mb-4">
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
        Website zu gew&auml;hrleisten. Andere Daten k&ouml;nnen zur Analyse
        Ihres Nutzerverhaltens verwendet werden.
      </p>{' '}
      <h4 className="font-semibold">
        Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?
      </h4>{' '}
      <p className="mb-4">
        Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber
        Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen
        Daten zu erhalten. Sie haben au&szlig;erdem ein Recht, die Berichtigung
        oder L&ouml;schung dieser Daten zu verlangen. Wenn Sie eine Einwilligung
        zur Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung
        jederzeit f&uuml;r die Zukunft widerrufen. Au&szlig;erdem haben Sie das
        Recht, unter bestimmten Umst&auml;nden die Einschr&auml;nkung der
        Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren
        steht Ihnen ein Beschwerderecht bei der zust&auml;ndigen
        Aufsichtsbeh&ouml;rde zu.
      </p>{' '}
      <p className="mb-4">
        Hierzu sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen Sie
        sich jederzeit an uns wenden.
      </p>
      <h2 className="text-2xl mb-4">2. Hosting</h2>
      <h3 className="text-xl mb-4">Hetzner</h3>{' '}
      <p className="mb-4">
        Wir hosten unsere Website bei Hetzner. Anbieter ist die Hetzner Online
        GmbH, Industriestr. 25, 91710 Gunzenhausen (nachfolgend: Hetzner).
      </p>{' '}
      <p className="mb-4">
        Details entnehmen Sie der Datenschutzerkl&auml;rung von Hetzner:{' '}
        <a
          href="https://www.hetzner.com/de/rechtliches/datenschutz"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://www.hetzner.com/de/rechtliches/datenschutz
        </a>
        .
      </p>{' '}
      <p className="mb-4">
        Die Verwendung von Hetzner erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
        f DSGVO. Wir haben ein berechtigtes Interesse an einer m&ouml;glichst
        zuverl&auml;ssigen Darstellung unserer Website. Sofern eine
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
        ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die
        Einwilligung ist jederzeit widerrufbar.
      </p>
      <h2 className="text-2xl mb-4">
        3. Allgemeine Hinweise und Pflicht&shy;informationen
      </h2>
      <h3 className="text-xl mb-4">Datenschutz</h3>{' '}
      <p className="mb-4">
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen
        Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich
        und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
        Datenschutzerkl&auml;rung.
      </p>{' '}
      <p className="mb-4">
        Wenn Sie diese Website benutzen, werden verschiedene personenbezogene
        Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie
        pers&ouml;nlich identifiziert werden k&ouml;nnen. Die vorliegende
        Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben und
        wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch, wie und zu welchem
        Zweck das geschieht.
      </p>{' '}
      <p className="mb-4">
        Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet
        (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken
        aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff
        durch Dritte ist nicht m&ouml;glich.
      </p>
      <h3 className="text-xl mb-4">Hinweis zur verantwortlichen Stelle</h3>{' '}
      <p className="mb-4">
        Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser
        Website ist:
      </p>{' '}
      <p className="mb-4">
        BildungsCent e.V.
        <br />
        Oranienstraße 183
        <br />
        10999 Berlin
      </p>
      <p className="mb-4">
        Telefon: +49 30 610 81 44 80
        <br />
        Fax: +49 30 610 81 44 50
        <br />
        E-Mail: info@bildungscent.de
      </p>
      <p className="mb-4">
        Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person,
        die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel
        der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen,
        E-Mail-Adressen o. &Auml;.) entscheidet.
      </p>
      <h3 className="text-xl mb-4">Speicherdauer</h3>{' '}
      <p className="mb-4">
        Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere
        Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei
        uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt. Wenn
        Sie ein berechtigtes L&ouml;schersuchen geltend machen oder eine
        Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
        gel&ouml;scht, sofern wir keine anderen rechtlich zul&auml;ssigen
        Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen Daten haben
        (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
        letztgenannten Fall erfolgt die L&ouml;schung nach Fortfall dieser
        Gr&uuml;nde.
      </p>
      <h3 className="text-xl mb-4">
        Widerruf Ihrer Einwilligung zur Datenverarbeitung
      </h3>{' '}
      <p className="mb-4">
        Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer
        ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen eine
        bereits erteilte Einwilligung jederzeit widerrufen. Die
        Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten
        Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.
      </p>
      <h3 className="text-xl mb-4">
        Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen
        sowie gegen Direktwerbung (Art. 21 DSGVO)
      </h3>{' '}
      <p className="mb-4">
        WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F
        DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE SICH
        AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER
        PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH F&Uuml;R
        EIN AUF DIESE BESTIMMUNGEN GEST&Uuml;TZTES PROFILING. DIE JEWEILIGE
        RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE
        DIESER DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN
        WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES
        SEI DENN, WIR K&Ouml;NNEN ZWINGENDE SCHUTZW&Uuml;RDIGE GR&Uuml;NDE
        F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
        FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER
        GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG VON
        RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
      </p>{' '}
      <p className="mb-4">
        WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
        BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
        VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
        DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS PROFILING,
        SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
        WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT
        MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21
        ABS. 2 DSGVO).
      </p>
      <h3 className="text-xl mb-4">
        Beschwerde&shy;recht bei der zust&auml;ndigen Aufsichts&shy;beh&ouml;rde
      </h3>{' '}
      <p className="mb-4">
        Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen
        ein Beschwerderecht bei einer Aufsichtsbeh&ouml;rde, insbesondere in dem
        Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts, ihres Arbeitsplatzes
        oder des Orts des mutma&szlig;lichen Versto&szlig;es zu. Das
        Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher
        oder gerichtlicher Rechtsbehelfe.
      </p>
      <h3 className="text-xl mb-4">
        Recht auf Daten&shy;&uuml;bertrag&shy;barkeit
      </h3>{' '}
      <p className="mb-4">
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
        oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an sich
        oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren Format
        aush&auml;ndigen zu lassen. Sofern Sie die direkte &Uuml;bertragung der
        Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur,
        soweit es technisch machbar ist.
      </p>
      <h3 className="text-xl mb-4">SSL- bzw. TLS-Verschl&uuml;sselung</h3>{' '}
      <p className="mb-4">
        Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
        &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen
        oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
        TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen
        Sie daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo;
        auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer
        Browserzeile.
      </p>{' '}
      <p className="mb-4">
        Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen
        die Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen
        werden.
      </p>
      <h3 className="text-xl mb-4">Auskunft, L&ouml;schung und Berichtigung</h3>{' '}
      <p className="mb-4">
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
        das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten
        personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck
        der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
        L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
        personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.
      </p>
      <h3 className="text-xl mb-4">
        Recht auf Einschr&auml;nkung der Verarbeitung
      </h3>{' '}
      <p className="mb-4">
        Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
        personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich
        jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der
        Verarbeitung besteht in folgenden F&auml;llen:
      </p>{' '}
      <ul>
        {' '}
        <li className="list-disc">
          Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen
          Daten bestreiten, ben&ouml;tigen wir in der Regel Zeit, um dies zu
          &uuml;berpr&uuml;fen. F&uuml;r die Dauer der Pr&uuml;fung haben Sie
          das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </li>{' '}
        <li className="list-disc">
          Wenn die Verarbeitung Ihrer personenbezogenen Daten
          unrechtm&auml;&szlig;ig geschah/geschieht, k&ouml;nnen Sie statt der
          L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung verlangen.
        </li>{' '}
        <li className="list-disc">
          Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie
          sie jedoch zur Aus&uuml;bung, Verteidigung oder Geltendmachung von
          Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht, statt der
          L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </li>{' '}
        <li className="list-disc">
          Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben,
          muss eine Abw&auml;gung zwischen Ihren und unseren Interessen
          vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
          &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der
          Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
        </li>{' '}
      </ul>{' '}
      <p className="mb-4">
        Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
        eingeschr&auml;nkt haben, d&uuml;rfen diese Daten &ndash; von ihrer
        Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur
        Geltendmachung, Aus&uuml;bung oder Verteidigung von
        Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen
        nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines
        wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen Union oder
        eines Mitgliedstaats verarbeitet werden.
      </p>
      <h2 className="text-2xl mb-4">4. Datenerfassung auf dieser Website</h2>
      <h3 className="text-xl mb-4">Cookies</h3>{' '}
      <p className="mb-4">
        Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;.
        Cookies sind kleine Textdateien und richten auf Ihrem Endger&auml;t
        keinen Schaden an. Sie werden entweder vor&uuml;bergehend f&uuml;r die
        Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente
        Cookies) auf Ihrem Endger&auml;t gespeichert. Session-Cookies werden
        nach Ende Ihres Besuchs automatisch gel&ouml;scht. Permanente Cookies
        bleiben auf Ihrem Endger&auml;t gespeichert, bis Sie diese selbst
        l&ouml;schen&nbsp;oder eine automatische L&ouml;schung durch Ihren
        Webbrowser erfolgt.
      </p>{' '}
      <p className="mb-4">
        Teilweise k&ouml;nnen auch Cookies von Drittunternehmen auf Ihrem
        Endger&auml;t gespeichert werden, wenn Sie unsere Seite betreten
        (Third-Party-Cookies). Diese erm&ouml;glichen uns oder Ihnen die Nutzung
        bestimmter Dienstleistungen des Drittunternehmens (z.&nbsp;B. Cookies
        zur Abwicklung von Zahlungsdienstleistungen).
      </p>{' '}
      <p className="mb-4">
        Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch
        notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren
        w&uuml;rden (z.&nbsp;B. die Warenkorbfunktion oder die Anzeige von
        Videos). Andere Cookies dienen dazu, das Nutzerverhalten
        auszuwerten&nbsp;oder Werbung anzuzeigen.
      </p>{' '}
      <p className="mb-4">
        Cookies, die zur Durchf&uuml;hrung des elektronischen
        Kommunikationsvorgangs (notwendige Cookies) oder zur Bereitstellung
        bestimmter, von Ihnen erw&uuml;nschter Funktionen (funktionale Cookies,
        z.&nbsp;B. f&uuml;r die Warenkorbfunktion) oder zur Optimierung der
        Website (z.&nbsp;B. Cookies zur Messung des Webpublikums) erforderlich
        sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert,
        sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber
        hat ein berechtigtes Interesse an der Speicherung von Cookies zur
        technisch fehlerfreien und optimierten Bereitstellung seiner Dienste.
        Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde,
        erfolgt die Speicherung der betreffenden Cookies ausschlie&szlig;lich
        auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die
        Einwilligung ist jederzeit widerrufbar.
      </p>{' '}
      <p className="mb-4">
        Sie k&ouml;nnen Ihren Browser so einstellen, dass Sie &uuml;ber das
        Setzen von Cookies informiert werden und Cookies nur im Einzelfall
        erlauben, die Annahme von Cookies f&uuml;r bestimmte F&auml;lle oder
        generell ausschlie&szlig;en sowie das automatische L&ouml;schen der
        Cookies beim Schlie&szlig;en des Browsers aktivieren. Bei der
        Deaktivierung von Cookies kann die Funktionalit&auml;t dieser Website
        eingeschr&auml;nkt sein.
      </p>{' '}
      <p className="mb-4">
        Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt
        werden, werden wir Sie hier&uuml;ber im Rahmen dieser
        Datenschutzerkl&auml;rung gesondert informieren und ggf. eine
        Einwilligung abfragen.
      </p>
      <h3 className="text-xl mb-4">Server-Log-Dateien</h3>{' '}
      <p className="mb-4">
        Der Provider der Seiten erhebt und speichert automatisch Informationen
        in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
        &uuml;bermittelt. Dies sind:
      </p>{' '}
      <ul>
        {' '}
        <li className="list-disc">Browsertyp und Browserversion</li>{' '}
        <li className="list-disc">verwendetes Betriebssystem</li>{' '}
        <li className="list-disc">Referrer URL</li>{' '}
        <li className="list-disc">Hostname des zugreifenden Rechners</li>{' '}
        <li className="list-disc">Uhrzeit der Serveranfrage</li>{' '}
        <li className="list-disc">IP-Adresse</li>{' '}
      </ul>{' '}
      <p className="mb-4">
        Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird
        nicht vorgenommen.
      </p>{' '}
      <p className="mb-4">
        Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
        f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der
        technisch fehlerfreien Darstellung und der Optimierung seiner Website
        &ndash; hierzu m&uuml;ssen die Server-Log-Files erfasst werden.
      </p>
      <p className="mb-4">
        Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a>
      </p>
    </Modal>
  );
};

export default DatenschutzModal;
