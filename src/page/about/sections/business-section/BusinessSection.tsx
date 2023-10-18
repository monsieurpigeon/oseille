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
                <Heading size="sm">Dépenses</Heading>
                <Flex justifyContent="space-between">
                  <Text>Nom de domaine (1 an)</Text>
                  <Text>{priceFormatter(20)}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>Impression de 700 flyers</Text>
                  <Text>{priceFormatter(75)}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>Frais de serveur</Text>
                  <Text>{priceFormatter(5)}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>Salaires</Text>
                  <Text>{priceFormatter(0)}</Text>
                </Flex>
              </Flex>
              <Divider orientation="vertical" />
              <Flex
                direction="column"
                marginLeft={4}
              >
                <Heading size="sm">Recettes</Heading>
                <Flex justifyContent="space-between">
                  <Text>Dons</Text>
                  <Text>{priceFormatter(1)}</Text>
                </Flex>
                <Flex justifyContent="space-between">
                  <Text>Levée de fonds</Text>
                  <Text>{priceFormatter(0)}</Text>
                </Flex>
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
                <Box>
                  <Text>
                    Si vous souhaitez soutenir mon travail, vous pouvez m'encourager financièrement sur{' '}
                    <span className="bold">Tipeee</span>.
                  </Text>
                  <Text>Pas la peine de donner plus de {priceFormatter(1)} par mois.</Text>
                  <Text>En parler autour de vous c'est mieux.</Text>
                </Box>
                <LinkOverlay
                  href="https://fr.tipeee.com/oseille-app/"
                  target="_blank"
                  alignSelf="center"
                >
                  <Button
                    size="lg"
                    colorScheme="twitter"
                    width="200px"
                    height="80px"
                  >
                    Je soutiens
                  </Button>
                </LinkOverlay>
              </Flex>
            </CardBody>
          </Card>
        </LinkBox>
      </Flex>
    </Flex>
  );
}
