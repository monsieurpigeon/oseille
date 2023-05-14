import { Button } from '@chakra-ui/react';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { FarmInput, db, destroyDatabase, exportData, store } from '../../backend';
import FileUploadSingle from '../../component/form/FileUploadSingle';
import { useConfirm } from '../../component/modal/confirm-dialog/ConfirmContext';
import { MyH1 } from '../../component/typography/MyFont';
import { Configuration } from './Configuration';
import { Farm } from './Farm';
import { Logo } from './Logo';

export const EMPTY_FARM: FarmInput = {
  title: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  phone: '',
  email: '',
  footer: '',
  rib: '',
  iban: '',
  bic: '',
  siret: '',
  naf: '',
  tva: '',
  isTVA: 'non',
  bioLabel: 'non',
};

export const farmSchema = z.object({
  title: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  footer: z.string(),
  isTVA: z.string(),
  bioLabel: z.string(),
});

export function Settings() {
  const { farm } = useSnapshot(store);
  const { confirm } = useConfirm();

  const exportDb = async () => {
    if (
      await confirm({
        title: 'Tout récupérer',
        message:
          'Vous allez récupérer une copie de toute votre base de donnée dans un fichier, à faire régulièrement et stocker sur un support différent',
      })
    ) {
      db.allDocs({ include_docs: true })
        .then((data) => data.rows.map(({ doc }) => doc))
        .then((data) => exportData(data))
        .catch(console.error);
    }
  };

  const destroyDb = async () => {
    if (
      await confirm({
        title: 'Tout effacer',
        message: `Vous allez supprimer toute la base de donnée, assurez vous d'avoir bien fait un export de vos données`,
      })
    ) {
      destroyDatabase().catch(console.error);
    }
  };

  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Réglages</MyH1>
        </div>
        <div className="catalog-list">
          <Logo />
          <Farm farm={farm} />
          <Configuration farm={farm} />
        </div>
      </div>
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Import / Export</MyH1>
        </div>
        <div className="catalog-list">
          <Button
            colorScheme="twitter"
            onClick={exportDb}
          >
            Export
          </Button>
          <Button
            colorScheme="red"
            onClick={destroyDb}
          >
            Armageddon
          </Button>
          <FileUploadSingle />
        </div>
      </div>
    </div>
  );
}
