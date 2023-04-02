import { Flex } from '@chakra-ui/react';
import { MyH1, MyLink } from '../../component/typography/MyFont';

export function Contact() {
  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Contact</MyH1>
        </div>
        <div className="catalog-list">
          <p>Cette application est toujours en développement.</p>
          <p>Si vous avez des questions ou des suggestions, appelez moi : 06 45 66 56 55</p>
          <p>Si vous avez trop d'argent vous pouvez m'envoyer un Lydia.</p>
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
        </div>
      </div>
    </div>
  );
}
