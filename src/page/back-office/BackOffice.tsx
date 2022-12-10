import { MyScreenLayout } from '../../component/layout/MyScreenLayout';
import { MyH1 } from '../../component/typography/MyFont';

export function BackOffice() {
  return (
    <MyScreenLayout>
      <MyH1>Back Office</MyH1>
      <p>Vous ne devriez pas etre la</p>
    </MyScreenLayout>
  );
}
