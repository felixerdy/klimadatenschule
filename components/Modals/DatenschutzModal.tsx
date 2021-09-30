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
      title="Datenschutzhinweise"
      onClickIcon={closeModal}
      size="lg"
    >
      <div class="builder-text-content">
        <h3>Datenschutz</h3>
        <p>
          Wir freuen uns über Ihren Besuch auf unserer Webseite.{' '}
          <a href="https://www.bildungscent.de/">BildungsCent e.V.</a> nimmt den
          Schutz Ihrer personenbezogenen Daten sehr ernst. Im Folgenden
          informieren wir über die Erhebung personenbezogener Daten bei Nutzung
          unserer Webseite.
        </p>
        <p>
          <strong>1. Verantwortliche Stelle und Datenschutzbeauftragte</strong>
        </p>
        <p>
          BildungsCent e.V.
          <br />
          Oranienstraße 183
          <br />
          10999 Berlin
          <br />
          Telefon: +49 30 610 81 44 80
          <br />
          Fax: +49 30 610 81 44 50
          <br />
          E-Mail: <a href="mailto:info@bildungscent.de">info@bildungscent.de</a>
        </p>
        <p>
          Unsere Datenschutzbeauftragte erreichen Sie unter{' '}
          <a href="mailto:webmaster@bildungscent.de">
            webmaster@bildungscent.de
          </a>{' '}
          oder unserer Postadresse mit dem Zusatz „die Datenschutzbeauftragte“.
        </p>
        <p>
          <strong>
            2. Allgemeine Datenverarbeitung beim Aufruf unserer Webseite
          </strong>
          <br />
          Wir möchten Sie im Folgenden über die Verarbeitung personenbezogener
          Daten beim Aufruf unserer Webseite informieren. Personenbezogene Daten
          im Sinne der Datenschutzgrundverordnung (DSGVO) sind alle
          Informationen, die sich auf eine identifizierte oder identifizierbare
          natürliche Person (im Folgenden „betroffene Person“) beziehen. Davon
          erfasst sind etwa Ihr Name, Ihre Anschrift oder Ihre E-Mail-Adresse.
          <br />
          Sofern Sie unsere Webseite lediglich aufrufen uns aber keinerlei
          Informationen zukommen lassen (beispielsweise über unser
          Kontaktformular oder auf andere Weise) sammelt der Webserver des
          BildungsCent e.V. beim Aufruf unserer Webseite nur diejenigen Daten,
          die das von Ihnen benutzte Webbrowserprogramm automatisch übermittelt
          und speichert diese vorübergehend. Dazu gehören die folgenden
          Informationen:
        </p>
        <p>
          • Informationen über den Browsertyp und die verwendete Version
          <br />• Das Betriebssystem des Nutzers/der Nutzerin
          <br />• Den Internet-Service-Provider des Nutzers/der Nutzerin
          <br />• Die IP-Adresse des Nutzers/der Nutzerin
          <br />• Zugriffsstatus/HTTP-Statuscode
          <br />• Datum und Uhrzeit des Zugriffs
          <br />• Webseiten, von denen das System des Nutzers/der Nutzerin auf
          unsere Internetseite gelangt
          <br />• Webseiten, die vom System des Nutzers über unsere Webseite
          aufgerufen werden
        </p>
        <p>
          Diese Daten werden technisch benötigt, um Ihnen die Webseite
          anzuzeigen und die Sicherheit der Webseite zu gewährleisten. Wir
          werten diese Daten ausschließlich zu statistischen Zwecken aus, um
          mögliche technische Fehler zu beheben und ggf. Angriffe und
          Sicherheitsrisiken identifizieren und abwehren zu können. Sie werden
          nicht mit anderen Informationen verknüpft, die eine Identifizierung
          Ihrer Person ermöglichen.
        </p>
        <p>
          Rechtsgrundlage für die vorübergehende Speicherung der Daten und der
          Logfiles ist unser berechtigtes Interesse an der Sicherheit und
          Stabilität unserer Webseite (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p>
          <strong>3. Einsatz von Cookies</strong>
          <br />
          Bei Ihrer Nutzung unserer Webseite werden Cookies auf Ihrem Rechner
          gespeichert. Bei Cookies handelt es sich um kleine Textdateien, die
          auf Ihrer Festplatte dem von Ihnen verwendeten Browser zugeordnet
          gespeichert werden und durch welche der Stelle, die den Cookie setzt,
          bestimmte Informationen zufließen. Cookies können keine Programme
          ausführen oder Viren auf Ihren Computer übertragen. Sie dienen dazu,
          das Internetangebot insgesamt nutzerfreundlicher und effektiver zu
          machen. Rechtsgrundlage für den Einsatz der Cookies ist Art. 6 Abs. 1
          lit. f DSGVO.
          <br />
          Diese Webseite nutzt folgende Arten von Cookies, deren Umfang und
          Funktionsweise im Folgenden erläutert werden:
        </p>
        <p>
          a) Transiente Cookies
          <br />
          Diese Cookies werden automatisiert gelöscht, wenn Sie den Browser
          schließen. Dazu zählen insbesondere die Session-Cookies. Diese
          speichern eine sogenannte Session-ID, mit der sich verschiedene
          Anfragen Ihres Browsers der gemeinsamen Sitzung zuordnen lassen.
          Dadurch kann Ihr Rechner wiedererkannt werden, wenn Sie auf unsere
          Webseite zurückkehren. Die Session-Cookies werden gelöscht, wenn Sie
          sich ausloggen oder den Browser schließen.
        </p>
        <p>
          b) Persistente Cookies
          <br />
          Diese Cookies werden automatisiert nach einer vorgegebenen Dauer
          gelöscht, die sich je nach Cookie unterscheiden kann. Sie können die
          Cookies in den Sicherheitseinstellungen Ihres Browsers jederzeit
          löschen.
        </p>
        <p>
          c) Verhinderung von Cookies
          <br />
          Sie können Ihre Browser-Einstellung entsprechend Ihren Wünschen
          konfigurieren und z. B. die Annahme von Third-Party-Cookies oder allen
          Cookies ablehnen. Wir weisen Sie darauf hin, dass Sie dann eventuell
          nicht alle Funktionen dieser Webseite nutzen können.
        </p>
        <p>
          d) Rechtsgrundlagen und Speicherdauer
          <br />
          Die Rechtsgrundlagen für mögliche Verarbeitungen personenbezogener
          Daten und deren Speicherdauer variieren und werden in den folgenden
          Abschnitten dargestellt.
          <br />
          Cookie Einstellungen aufrufen
        </p>
        <p>
          4. Kontakt
          <br />
          Wenn Sie uns per E-Mail oder über unser Kontaktformular kontaktieren,
          werden die von Ihnen mitgeteilten Daten (beispielsweise Ihre
          E-Mail-Adresse, ggf. Ihr Name und Ihre Telefonnummer) von uns zu dem
          Zweck gespeichert, Ihr Anliegen zu bearbeiten. Soweit wir über unser
          Kontaktformular Eingaben abfragen, die nicht für eine Kontaktaufnahme
          erforderlich sind, haben wir diese stets als optional gekennzeichnet.
          Eine Mitteilung dieser Angaben erfolgt ausdrücklich auf freiwilliger
          Basis und mit Ihrer Einwilligung. Soweit es sich hierbei um Angaben zu
          Kommunikationskanälen (beispielsweise E-Mail-Adresse, Telefonnummer)
          handelt, willigen Sie außerdem ein, dass wir Sie ggf. auch über diesen
          Kommunikationskanal kontaktieren, um Ihr Anliegen zu beantworten. Die
          in diesem Zusammenhang anfallenden Daten löschen wir, nachdem die
          Speicherung zur Erfüllung des Zwecks nicht mehr erforderlich ist.
          Sofern gesetzliche Aufbewahrungspflichten einer Löschung
          entgegenstehen, schränken wir die Verarbeitung ein.
        </p>
        <p>
          Sie haben selbstverständlich jederzeit die Möglichkeit, Ihre
          Einwilligung uns gegenüber für die Zukunft zu widerrufen. Wenden Sie
          sich hierzu einfach an{' '}
          <a href="mailto:info@bildungscent.de">info@bildungscent.de</a>.
        </p>
        <p>
          <strong>5. Bewerbung zur Programmteilnahme</strong>
          <br />
          Sie haben die Möglichkeit, sich für die Teilnahme an unseren
          Programmen über ein Onlineformular anzumelden.
        </p>
        <p>
          Ihre personenbezogenen Daten, die Sie BildungsCent e.V. im Rahmen der
          Anmeldung übermitteln, werden ausschließlich von BildungsCent e.V. zum
          Zwecke der Anmeldung und Programmteilnahme verarbeitet. Die Daten
          werden für die Dauer der Teilnahme und entsprechend gesetzlicher
          Verpflichtungen gespeichert.
        </p>
        <p>
          Rechtsgrundlage der Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO.
        </p>
        <p>
          Soweit wir über unser Onlineformular Eingaben abfragen, die nicht für
          eine Kontaktaufnahme erforderlich sind, haben wir diese stets als
          optional gekennzeichnet. Eine Mitteilung dieser Angaben erfolgt
          ausdrücklich auf freiwilliger Basis und mit Ihrer Einwilligung, Art. 6
          Abs. 1 lit. a DSGVO.
          <br />
          Im Rahmen einiger unserer Programmausschreibungen binden wir unsere
          Anmeldeformulare auf Webseiten unserer Partner ein. Zweck ist die
          Optimierung und die umfassende Bereitstellung unserer
          Programmangebote. Wenn Sie die Formulare nutzen wird Ihre IP-Adresse
          an die jeweiligen Partner übertragen. Darüber hinaus werden
          Informationen zu Ihrem Browser wie Betriebssystem, verweisende
          Webseite oder Besuchszeit an den Seitenbetreiber übertragen.
          Rechtsgrundlage hierfür sind unsere berechtigten Interessen gemäß Art.
          6 Abs. 1 lit. f. DSGVO. Informationen zu der Datenverarbeitung durch
          unsere Partner entnehmen Sie bitte den jeweiligen
          Datenschutzbestimmungen des Seitenbetreibers.
        </p>
        <p>
          Die Daten werden für die Dauer der Programmteilnahme und entsprechend
          gesetzlicher Verpflichtungen gespeichert.
        </p>
        <p>
          <strong>
            6. Erweiterte Datenverwendung Im Rahmen unserer Programme
          </strong>
          <br />
          BildungsCent e.V. ist nach freiwilliger, gesondert zu erklärender und
          protokollierter Einwilligung in die „erweiterte Datenverwendung“ durch
          den/die Nutzer*in berechtigt, personenbezogene Daten sowie Profildaten
          und demografische Daten für folgende Zwecke zu verarbeiten:
        </p>
        <p>
          • der Aufnahme in ein Teilnehmerverzeichnis,
          <br />• der Zusendung von Informationen über unsere Online-Angebote
          und Programme,
          <br />• der Personalisierung und optimalen Ausrichtung der Dienste an
          den Interessen und Vorlieben des Nutzers/der Nutzerin.
        </p>
        <p>
          Rechtsgrundlage ist Ihre Einwilligung, Art. 6 Abs. 1 lit. a DSGVO.
          Weitere Informationen entnehmen Sie bitte den Teilnahmebedingungen der
          einzelnen Programme, die wir Ihnen bei Programmaufnahme auch noch
          einmal gesondert zusenden.
        </p>
        <p>
          <strong>7. Weitergabe Ihrer personenbezogenen Daten an Dritte</strong>
          <br />
          BildungsCent e.V. gibt Ihre personenbezogenen Daten grundsätzlich
          nicht an Dritte weiter, es sei denn, Sie haben vorher Ihre
          ausdrückliche Einwilligung erklärt oder es besteht eine gesetzliche
          Verpflichtung zur Datenweitergabe. Soweit Sie Ihre Einwilligung
          erteilt haben, können Sie sie jederzeit mit Wirkung für die Zukunft
          durch einfache Mitteilung per E-Mail an die Adresse{' '}
          <a href="mailto:info@bildungscent.de">info@bildungscent.de</a>{' '}
          widerrufen.
        </p>
        <p>
          Wir arbeiten mit einer Reihe von Dienstleistern zusammen, die
          technische und inhaltliche Aufgaben bei der Bereitstellung unserer
          Webseite übernehmen. Hierzu zählen Dienstleistungen wie Hosting und
          Wartung unserer Webseite, bei der uns die Mercoline GmbH unterstützt.
        </p>
        <p>
          Sofern externe Dienstleister mit Ihren personenbezogenen Daten in
          Berührung kommen, stellen wird durch technische und organisatorische
          Maßnahmen sowie Verträge nach Art. 28 DSGVO den Schutz Ihrer
          personenbezogenen Daten sicher.
        </p>
        <p>
          <strong>8. Webseitenanalyse</strong>
          <br />
          Für Zwecke der Analyse und Optimierung unserer Webseiten verwenden wir
          verschiedene Dienste, die im Folgenden dargestellt werden. So können
          wir z. B. analysieren, wie viele Nutzer*innen unsere Seite besuchen,
          welche Informationen am gefragtesten sind oder wie Nutzer*innen das
          Angebot auffinden. Wir erfassen unter anderem Daten darüber, von
          welcher Internetseite eine betroffene Person auf eine Internetseite
          gekommen ist (sogenannter Referrer), auf welche Unterseiten der
          Internetseite zugegriffen oder wie oft und für welche Verweildauer
          eine Unterseite betrachtet wurde. Dies hilft uns, unsere Angebote
          nutzerfreundlich auszugestalten und zu verbessern. Die dabei erhobenen
          Daten dienen nicht dazu, einzelne Benutzer*innen persönlich zu
          identifizieren. Es werden anonyme bzw. höchstens pseudonyme Daten
          erhoben. Rechtsgrundlage dafür ist Art. 6 Abs. 1 f DSGVO.
        </p>
        <p>
          <em>
            <strong>Matomo</strong>
          </em>
        </p>
        <p>
          Soweit Sie Ihre Einwilligung erklärt haben, wird auf unserer Webseite
          der Open-Source-Webanalysedienst Matomo, einen Dienst der „InnoCraft
          Ltd“, ein Unternehmen mit Sitz in 150 Willis St, 6011 Wellington,
          Neuseeland, eingesetzt. Da InnoCraft außerhalb der EU ansässig ist,
          hat das InnoCraft einen Vertreter in der EU benannt (
          <a href="mailto:privacy@innocraft.com">privacy@innocraft.com</a>).
          Neuseeland verfügt gemäß Beschluss der EU Kommission ein angemessenes
          Datenschutzniveau. Matomo verwendet Cookies, durch welche eine Analyse
          der Benutzung der Webseite möglich wird. Zu diesem Zweck werden die im
          Cookie erfassten Nutzungsinformationen (einschließlich Ihrer gekürzten
          IP-Adresse) an unseren Server übertragen und zu Nutzungsanalysezwecken
          gespeichert. Mit Matomo werden keine Daten an Server übermittelt, die
          außerhalb unserer Kontrolle liegen. Ihre IP-Adresse wird bei diesem
          Vorgang umgehend anonymisiert, so dass Sie als Nutzer für uns nicht
          identifizierbar sind. Die gesammelten Informationen über Ihre
          Benutzung dieser Webseite werden nicht an Dritte weitergegeben. Wir
          nutzen die erhobenen Daten zur statistischen Analyse des
          Nutzerverhaltens zum Zweck der Optimierung der Funktionalität und
          Stabilität der Website und zu Bewerbung unserer Angebote. Unser
          Interesse an und Zweck der Datenverarbeitung liegt in der Optimierung
          unserer Website, der Anpassung der Inhalte und der Verbesserung
          unseres Angebotes. Wir speichern die Analysedaten nur, so lange es der
          Zweck der Datenverarbeitung erfordert, maximal jedoch 13 Monate.
        </p>
        <p>
          Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft
          widerrufen, indem Sie die Nutzung von Matomo unter „Cookie
          Einstellungen aufrufen“ wieder abwählen.
        </p>
        <p>
          Sie können das Setzen von (einzelnen oder allen) Cookies durch eine
          entsprechende Einstellung Ihrer Browsers verhindern, es kann jedoch
          sein, dass Sie in diesem Fall gegebenenfalls nicht sämtliche
          Funktionen dieser Website voll umfänglich nutzen können.
        </p>
        <p>
          Sie können auch Ihre Erfassung durch Matomo nachfolgend per Mausklick
          jederzeit verhindern. Es wird dann über Ihren Browser ein
          Opt-Out-Cookie gesetzt, was zur Folge hat, dass Matomo keinerlei
          Sitzungsdaten erhebt. Bitte beachten Sie: Wenn Sie Ihre Cookies
          löschen, wird auch das Opt-Out-Cookie gelöscht und muss von Ihnen
          erneut gesetzt werden.
          <br />
          Cookie Einstellungen aufrufen
        </p>
        <p>
          <strong>
            9. Werbung
            <br />
          </strong>
          Wir verwenden Cookies für Marketingzwecke, um unsere Nutzer*innen mit
          interessengerechter Werbung anzusprechen. Zusätzlich verwenden wir die
          Cookies, um die Wahrscheinlichkeit der Ausspielung einer Werbeanzeige
          einzuschränken und die Effektivität unserer Werbemaßnahmen zu messen.
          Diese Information können auch mit Dritten, wie z. B. Ad-Netzwerken,
          geteilt werden. Rechtsgrundlage dafür ist Art. 6 Abs. 1 f DSGVO. Für
          die mit der Datenverarbeitung verfolgten Zwecke besteht das
          berechtigte Interesse des Direktmarketings. Sie haben das Recht
          jederzeit Widerspruch gegen die Verarbeitung Ihrer Daten zum Zwecke
          derartiger Werbung einzulegen. Dazu stellen wir Ihnen im Folgenden
          Opt-Out-Möglichkeiten der jeweiligen Dienste zur Verfügung. Sie können
          alternativ in Ihren Browsereinstellungen das Setzen von Cookies
          verhindern.
        </p>
        <p>Google AdWords &amp; Conversion Tracking</p>
        <p>
          Um auf unsere Dienstleistungen aufmerksam zu machen, schalten wir
          Google-Adwords-Anzeigen. Die Anzeigen werden nach Suchanfragen bei
          Google auf Webseiten des Google-Werbenetzwerkes eingeblendet und
          orientieren sich an den Produkten und Dienstleistungen, die Sie beim
          letzten Besuch unserer Webseite angeklickt haben. Mit Hilfe von
          Cookies wird registriert, wie viele Nutzer*innen über eine unserer
          Anzeigen zu uns gefunden haben. Mit Hilfe der daraus gewonnenen
          anonymen Statistiken können wir unsere Anzeigen optimieren. Die uns
          von Google zur Verfügung gestellten Statistiken beinhalten die
          Gesamtzahl der Nutzer*innen, die auf eine unserer Anzeigen geklickt
          haben, und ggf. ob diese zu einer mit einem Conversion-Tag versehenen
          Seite unseres Webauftrittes weitergeleitet wurden. Anhand dieser
          Statistiken können wir auch nachvollziehen, bei welchen Suchbegriffen
          besonders oft auf unsere Anzeige geklickt wurde und welche Anzeigen zu
          einer Kontaktaufnahme über das Kontaktformular durch den/die Nutzer*in
          führen. Wir erhalten jedoch keine Informationen, mit denen sich
          Nutzer*innen persönlich identifizieren lassen. Auch das AdWords-Cookie
          dient nicht der persönlichen Identifizierung und wird nach 30 Tagen
          gelöscht.
        </p>
        <p>
          Betroffene Personen sind alle Nutzer*innen unseres Online-Angebotes.
          Rechtsgrundlage für die Nutzung von Google AdWords ist unser
          berechtigtes Interesse an der Optimierung unseres Angebotes und dem
          wirtschaftlichen Betrieb und der Förderung unseres Geschäftes durch
          Werbung, Art. 6 Abs. 1 lit. f DSGVO. Die Speicherung der Cookies
          erfolgt durch Google beim Klick auf eine Anzeige und kann über die
          Einstellungen Ihres Browsers unterbunden werden. In diesem Falle
          fließt Ihr Besuch unserer Webseite auch nicht in die anonymen
          Nutzerstatistiken ein.
        </p>
        <p>
          Wenn Sie keine nutzerbasierte Werbung erhalten wollen, können Sie die
          Schaltung von Werbeanzeigen mithilfe der{' '}
          <a href="https://adssettings.google.com/anonymous?hl=de&amp;sig=ACi0TCh0Xv9OH9zgy2F8fyCIlkf8JJ87-uDy0UopBlBzEpl4xQRgRvAgZHzFir-nXpZvqwxB1BUm7Gu_zSPpdQ4bKS3jQUS1t7qcWqhGEDI_DpHS1SvxoEk">
            Anzeigeneinstellung
          </a>{' '}
          von Google deaktivieren. Weitere Informationen dazu, welche Arten von
          und wie Google Cookies verwendet, können Sie in der{' '}
          <a href="https://policies.google.com/privacy?gl=de">
            Datenschutzerklärung
          </a>{' '}
          von Google und unter{' '}
          <a href="https://policies.google.com/technologies/cookies?hl=de#types-of-cookies">
            Von Google verwendete Cookie-Arten
          </a>{' '}
          nachlesen.
        </p>
        <p>
          <strong>10. Ihre Rechte</strong>
          <br />
          Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
          betreffenden personenbezogenen Daten:
        </p>
        <p>
          Allgemeine Rechte
          <br />
          Sie haben ein Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Widerspruch gegen die Verarbeitung und
          auf Datenübertragbarkeit. Soweit eine Verarbeitung auf Ihrer
          Einwilligung beruht, haben Sie das Recht, diese uns gegenüber mit
          Wirkung für die Zukunft zu widerrufen.
        </p>
        <p>
          Rechte bei der Datenverarbeitung nach dem berechtigten Interesse
          <br />
          Sie haben gem. Art. 21 Abs.1 DSGVO das Recht, aus Gründen, die sich
          aus Ihrer besonderen Situation ergeben, jederzeit gegen die
          Verarbeitung Sie betreffender personenbezogener Daten, die aufgrund
          von Art. 6 Abs.1 e DSGVO (Datenverarbeitung im öffentlichen Interesse)
          oder aufgrund Artikel 6 Abs.1 f DSGVO (Datenverarbeitung zur Wahrung
          eines berechtigten Interesses) erfolgt, Widerspruch einzulegen; dies
          gilt auch für ein auf diese Vorschrift gestütztes Profiling. Im Falle
          Ihres Widerspruchs verarbeiten wir Ihre personenbezogenen Daten nicht
          mehr, es sei denn, wir können zwingende schutzwürdige Gründe für die
          Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten
          überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung
          oder Verteidigung von Rechtsansprüchen.
        </p>
        <p>
          Rechte bei Direktwerbung
          <br />
          Sofern wir Ihre personenbezogenen Daten verarbeiten, um Direktwerbung
          zu betreiben, so haben Sie gem. Art. 21 Abs. 2 DSGVO das Recht,
          jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden
          personenbezogenen Daten zum Zwecke derartiger Werbung einzulegen, dies
          gilt auch für das Profiling, soweit es mit solcher Direktwerbung in
          Verbindung steht.
          <br />
          Im Falle Ihres Widerspruchs gegen die Verarbeitung zum Zwecke der
          Direktwerbung werden wir Ihre personenbezogenen Daten nicht mehr für
          diese Zwecke verarbeiten.
        </p>
        <p>
          Recht auf Beschwerde bei einer Aufsichtsbehörde
          <br />
          Sie haben zudem das Recht, sich bei einer zuständigen
          Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
          personenbezogenen Daten durch uns zu beschweren.
          <br />
          Bei Fragen rund um das Thema Datenschutz und die Verarbeitung Ihrer
          personenbezogenen Daten, wenden Sie sich an unsere
          Datenschutzbeauftragte (Kontakt siehe oben). Diese steht Ihnen auch
          gerne bei Anträgen, Auskunftsersuchen, Anregungen oder Beschwerden zur
          Verfügung.
        </p>
        <p>Stand Dezember 2020</p>
      </div>
    </Modal>
  );
};

export default DatenschutzModal;
