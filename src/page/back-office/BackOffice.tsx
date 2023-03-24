import { ScreenLayout } from '../../component/layout/ScreenLayout';
import { MyH1 } from '../../component/typography/MyFont';

export function BackOffice() {
  return (
    <ScreenLayout>
      <MyH1>Back Office</MyH1>
      <p>Vous ne devriez pas etre la</p>
    </ScreenLayout>
  );
}
