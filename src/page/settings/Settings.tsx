import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { StyledH1 } from '../../component/typography/Font';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { store, updateFarmName } from '../../backend';
import { TextInput } from '../../component/form/input/TextInput';
import { MyButton } from '../../component/form/button/MyButton';

export function Settings() {
  const [farmTitle, setFarmTitle] = useState('');
  const { farm } = useSnapshot(store);

  useEffect(() => {
    setFarmTitle(farm?.title || '');
  }, [farm]);

  return (
    <ScreenLayout>
      <StyledH1>Reglages</StyledH1>
      Ma ferme : {farm?.title}
      <TextInput
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
    </ScreenLayout>
  );
}
