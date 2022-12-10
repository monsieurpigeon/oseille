import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyH1, MyH2 } from '../../component/typography/MyFont';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { destroyDatabase, store, updateFarmFooter, updateFarmName } from '../../backend';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyButton } from '../../component/form/button/MyButton';

export function Settings() {
  const [farmTitle, setFarmTitle] = useState('');
  const [farmFooter, setFarmFooter] = useState('');
  const { farm } = useSnapshot(store);

  useEffect(() => {
    setFarmTitle(farm?.title || '');
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
            value={farmTitle}
            onChange={(e) => {
              setFarmTitle(e.target.value);
            }}
          />
          <MyButton
            label="Baptiser"
            onClick={() => {
              updateFarmName({ title: farmTitle });
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
