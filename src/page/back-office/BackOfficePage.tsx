import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';

export function BackOfficePage() {
  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Back Office</MyH1>
        </MyHeader>
        <p>Vous ne devriez pas être la</p>
      </MySide>
    </MyPage>
  );
}
