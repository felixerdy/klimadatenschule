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

const ImpressumModal: React.FC<ModalProps> = ({ opened, closeModal }) => {
  const router = useRouter();

  return (
    <Modal isOpen={opened} title="Impressum" onClickIcon={closeModal} size="lg">
      <div>
        <h3>Impressum</h3>
        <div>
          <div>
            <div>
              <div>
                <h2>Verantwortlich für den Inhalt dieser Website:</h2>
                <p>
                  BildungsCent e.V.
                  <br />
                  Oranienstraße 183
                  <br />
                  D-10999 Berlin
                  <br />
                  Tel.: +49 30 610 81 44 80
                  <br />
                  Fax: +49 30 610 81 44 50
                  <br />
                  E-Mail:{' '}
                  <a href="mailto:info@bildungscent.de">info@bildungscent.de</a>
                </p>
                <p>
                  Silke Ramelow (Vorstandsvorsitzende), Michael
                  Wend&nbsp;(Stellvertr.), Dr. Christina Masuch
                  <br />
                  Vereinsregister Nummer VR 22596 Amtsgericht Charlottenburg
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div>
          <p>Umsatzsteuer-ID-Nr.: DE124090847</p>
        </div>
        <br />
        <div>
          <h2>Verantwortlich für journalistisch-redaktionelle Inhalte:</h2>
          <p>Silke Ramelow, Vorstandvorsitzende</p>
        </div>
        <br />
        <div>
          <h2>Web-Design und Betreuung:</h2>
          <p>
            Christiane John, Leiterin Visuelle Kommunikation
            <br />
            Oranienstraße 183, 10999 Berlin, E-Mail: cjohn@bildungscent.de
          </p>
        </div>
        <br />
        <div>
          <h2>Haftungshinweis:</h2>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
            Haftung für die Inhalte externer Links (Querverweise auf Webinhalte
            Dritter). Für den Inhalt der verlinkten Seiten sind ausschließlich
            deren Betreiber*innen verantwortlich, es sei denn, wir machen uns
            die Inhalte zu eigen oder sind an dem Angebot beteiligt.
            <br />
            Hiermit wird ausdrücklich der Nutzung von im Rahmen der
            Anbieter*innenkennzeichnung veröffentlichten Kontaktdaten durch
            Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung
            und Informationsmaterialien widersprochen.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImpressumModal;
