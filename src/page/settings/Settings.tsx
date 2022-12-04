import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { StyledH1 } from '../../component/typography/MyFont';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store, updateFarmName } from '../../backend';
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
      Ma ferme : {farm?.title}
      <MyTextInput
        placeholder="Ma ferme"
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
    </MyScreenLayout>
  );
}
