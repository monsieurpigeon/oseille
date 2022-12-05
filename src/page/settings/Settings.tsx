import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { StyledH1, StyledH2 } from '../../component/typography/MyFont';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import {destroyDatabase, store, updateFarmFooter, updateFarmName} from '../../backend';
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
      <StyledH1>Reglages</StyledH1>
      <MyButton
        label="Armageddon"
        onClick={() => {
          destroyDatabase().catch(console.error);
        }}
      />
      <StyledH2>Ma ferme</StyledH2>
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
      <StyledH2>Mon Footer</StyledH2>
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
