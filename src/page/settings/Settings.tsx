import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { db, destroyDatabase, exportData, FarmInput, store, updateFarmFooter, updateFarmName } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { MyH1, MyH2 } from '../../component/typography/MyFont';
import { DEFAULT_FARM } from '../../utils/defaults';
import FileUploadSingle from '../../component/form/FileUploadSingle';
import { ConfirmationModal } from '../../component/modal/ConfirmationModal';

const EMPTY_FARM: FarmInput = {
  title: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
};

export function Settings() {
  const [farmInput, setFarmInput] = useState(EMPTY_FARM);
  const [farmFooter, setFarmFooter] = useState('');
  const { farm } = useSnapshot(store);

  useEffect(() => {
    setFarmInput((f) => ({ ...f, title: farmInput.title || '' }));
    setFarmFooter(farm?.footer || '');
  }, [farm]);

  return (
    <ScreenLayout>
      <MyH1>Réglages</MyH1>

      <ConfirmationModal
        label="Export"
        title="Tout récupérer"
        message="Vous allez récupérer une copie de toute votre base de donnée dans un fichier, à faire régulièrement et stocker sur un support différent"
        onConfirm={() => {
          db.allDocs({ include_docs: true })
            .then((data) => data.rows.map(({ doc }) => doc))
            .then((data) => exportData(data))
            .catch(console.error);
        }}
      />
      <ConfirmationModal
        label="Armageddon"
        title="Tout effacer"
        message="Vous allez supprimer toute la base de donnée, assurez vous d'avoir bien fait un export de vos données"
        onConfirm={() => {
          destroyDatabase().catch(console.error);
        }}
      />
      <FileUploadSingle />
      <MyH2>Ma ferme</MyH2>
      {farm?.title ? (
        <div>{farm.title}</div>
      ) : (
        <>
          <MyTextInput
            placeholder={DEFAULT_FARM.title}
            value={farmInput.title!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, title: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder={DEFAULT_FARM.address1}
            value={farmInput.address1!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, address1: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder={DEFAULT_FARM.address2}
            value={farmInput.address2!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, address2: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder={DEFAULT_FARM.zip}
            value={farmInput.zip!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, zip: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder={DEFAULT_FARM.city}
            value={farmInput.city!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, city: e.target.value }));
            }}
          />

          <MyButton
            label="Baptiser"
            onClick={() => {
              updateFarmName(farmInput);
            }}
          />
        </>
      )}
      <MyH2>Mon Footer</MyH2>
      <MyTextInput
        placeholder="s'affiche en bas des documents"
        value={farmFooter}
        onChange={(e) => {
          setFarmFooter(e.target.value);
        }}
      />
      <MyButton
        label="Mettre a jour"
        onClick={() => {
          updateFarmFooter({ footer: farmFooter });
        }}
      />
    </ScreenLayout>
  );
}
