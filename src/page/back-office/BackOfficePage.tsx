import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';

export function BackOfficePage() {
  const posthog = usePostHog();
  useEffect(() => {
    posthog?.capture('backoffice_page_viewed');
  }, []);
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
