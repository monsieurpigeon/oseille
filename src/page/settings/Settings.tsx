import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { StyledH1, StyledH2 } from '../../component/typography/MyFont';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { destroyDatabase, store, updateFarmName } from '../../backend';
import { MyTextInput } from '../../component/form/input/MyTextInput';
import { MyButton } from '../../component/form/button/MyButton';

export function Settings() {
  const [farmTitle, setFarmTitle] = useState('');
  const { farm } = useSnapshot(store);

  useEffect(() => {
    setFarmTitle(farm?.title || '');
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
    </MyScreenLayout>
  );
}
