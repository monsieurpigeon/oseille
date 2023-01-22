import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { destroyDatabase, FarmInput, store, updateFarmFooter, updateFarmName } from '../../backend';
import { MyButton } from '../../component/form/button/MyButton';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyH1, MyH2 } from '../../component/typography/MyFont';

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
    <MyScreenLayout>
      <MyH1>Reglages</MyH1>
      <MyButton
        label="Armageddon"
        onClick={() => {
          destroyDatabase().catch(console.error);
        }}
      />
      <MyH2>Ma ferme</MyH2>
      {farm?.title ? (
        <div>{farm.title}</div>
      ) : (
        <>
          <MyTextInput
            placeholder="La ferme sans nom"
            value={farmInput.title!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, title: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder="1 rue du chèque en bois"
            value={farmInput.address1!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, address1: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder="BP 12345"
            value={farmInput.address2!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, address2: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder="33000"
            value={farmInput.zip!}
            onChange={(e) => {
              setFarmInput((f) => ({ ...f, zip: e.target.value }));
            }}
          />
          <MyTextInput
            placeholder="Bordeaux"
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
    </MyScreenLayout>
  );
}
