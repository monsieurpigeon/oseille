import { Text } from '@chakra-ui/react';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1 } from '../../component/typography/MyFont';

export function SecretPage() {
  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Zone V.I.P.</MyH1>
        </MyHeader>
        <Text>Je rajouterais ici les choses à tester avant de les rendre accessibles à tout le monde</Text>
      </MySide>
    </MyPage>
  );
}
