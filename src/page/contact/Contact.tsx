import { Flex } from '@chakra-ui/react';
import { MyH1, MyLink } from '../../component/typography/MyFont';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';

export function Contact() {
  return (
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Contact</MyH1>
        </MyHeader>
        <MyScrollList>
          <p>Cette application est toujours en développement.</p>
          <p>Si vous avez des questions ou des suggestions...</p>
          <p>...appelez moi : 06 45 66 56 55</p>
          <p>Et si vous avez trop d'argent vous pouvez m'envoyer un Lydia.</p>
          <Flex
            marginTop="50px"
            gap={4}
          >
            <MyLink
              href="https://www.facebook.com/maxime.pigeon/"
              target="_blank"
              p={2}
              border={'1px'}
            >
              Facebook
            </MyLink>
            <MyLink
              href="https://www.linkedin.com/in/maxime-pigeon/"
              target="_blank"
              p={2}
              border={'1px'}
            >
              LinkedIn
            </MyLink>
          </Flex>
        </MyScrollList>
      </MySide>
    </MyPage>
  );
}
