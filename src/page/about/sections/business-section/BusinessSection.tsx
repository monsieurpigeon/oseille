import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { MONEY_IN, MONEY_OUT } from '../../../../updateMe';
import { priceFormatter } from '../../../../utils/formatter';

export function BusinessSection() {
  return (
    <Flex
      flexGrow={1}
      gap={8}
    >
      <Flex
        direction="column"
        flexGrow={1}
        gap="4"
        maxWidth="500px"
        textAlign="justify"
      >
        <Heading size="md">Principes</Heading>
        <Text>
          L'intégralité des fonctionnalités hors-ligne de cette application resteront <Text as="b">toujours</Text>{' '}
          gratuites.
        </Text>
        <Text>
          Lorsque je rajouterais la possibilité de synchroniser l'information en ligne alors il sera demandé une
          participation financière pour en profiter. Le bonus sera : multi-utilisateur, multi-appareil, sauvegarde en
          ligne, app mobile, etc.
        </Text>
        <Text>
          Si j'avais un gros paquet d'oseille qui me tombait du ciel, je réunirais les compétences nécessaires pour que
          l'utilisation d'<Text as="b">Oseille</Text> par des maraîchers soit financée par les impôts qu'ils payent
          déjà.
        </Text>
        <Text>Plutôt logique pour une application qui permet de gagner du temps pour gérer sa TVA...</Text>
        <Text>Si l'application vous plait, envoyez-là à vos amis par e-mail, Discord ou Facebook.</Text>
        <Text>Je n'ai pas beaucoup d'argent à gaspiller dans de la publicité.</Text>
      </Flex>
      <Flex
        direction="column"
        gap="4"
        flexGrow={1}
        maxWidth="800px"
      >
        <Heading size="md">Bilan financier</Heading>
        <Card>
          <CardBody>
            <SimpleGrid
              height="100%"
              templateColumns="50% 0 50%"
              columns={3}
            >
              <Flex
                direction="column"
                marginRight={4}
              >
                <Flex justifyContent="space-between">
                  <Text as="b">Dépenses</Text>
                  <Text as="b">{priceFormatter(MONEY_OUT.reduce((memo, el) => memo + el.value, 0))}</Text>
                </Flex>
                {MONEY_OUT.map((el, index) => (
                  <Flex
                    justifyContent="space-between"
                    key={index}
                  >
                    <Text>{el.label}</Text>
                    <Text>{priceFormatter(el.value)}</Text>
                  </Flex>
                ))}
              </Flex>
              <Divider orientation="vertical" />
              <Flex
                direction="column"
                marginLeft={4}
              >
                <Flex justifyContent="space-between">
                  <Text as="b">Recettes</Text>
                  <Text as="b">{priceFormatter(MONEY_IN.reduce((memo, el) => memo + el.value, 0))}</Text>
                </Flex>
                {MONEY_IN.map((el, index) => (
                  <Flex
                    justifyContent="space-between"
                    key={index}
                  >
                    <Text>{el.label}</Text>
                    <Text>{priceFormatter(el.value)}</Text>
                  </Flex>
                ))}
              </Flex>
            </SimpleGrid>
          </CardBody>
        </Card>
        <LinkBox>
          <Card border="1px solid yellow">
            <CardBody>
              <Flex
                alignSelf="center"
                gap={8}
              >
                <Box textAlign="justify">
                  <Text>
                    Si vous souhaitez soutenir mon travail, vous pouvez m'encourager financièrement sur{' '}
                    <span className="bold">Tipeee</span>.
                  </Text>
                </Box>
                <LinkOverlay
                  href="https://fr.tipeee.com/oseille-app/"
                  target="_blank"
                  alignSelf="center"
                >
                  <Button colorScheme="twitter">Je soutiens</Button>
                </LinkOverlay>
              </Flex>
            </CardBody>
          </Card>
        </LinkBox>
      </Flex>
    </Flex>
  );
}
