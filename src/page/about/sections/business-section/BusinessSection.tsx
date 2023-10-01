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
        <Text>L'intégralité des fonctionnalités hors-ligne de cette application resteront toujours gratuites.</Text>
        <Text>
          Lorsque je rajouterais la possibilité de synchroniser l'information en ligne alors il sera demandé une
          participation financière pour en profiter. Le bonus sera : multi-utilisateur, multi-appareil, sauvegarde en
          ligne, app mobile, etc.
        </Text>
        <Text>
          Si j'avais un gros paquet d'oseille qui me tombait du ciel, je réunirais les compétences nécessaires pour que
          l'utilisation d'<span className="bold">Oseille</span> par des maraîchers soit financée par les impôts qu'ils
          payent déjà.
        </Text>
        <Text>Plutôt logique pour une application qui permet de gagner du temps pour gérer sa TVA...</Text>
      </Flex>
      <Flex
        direction="column"
        gap="4"
        width="100%"
        flexGrow={1}
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
                  <Text>Frais de serveur</Text>
                  <Text>{priceFormatter(0)}</Text>
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
                  <Text>{priceFormatter(0)}</Text>
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
              <Flex alignSelf="center">
                <Box>
                  <Text>
                    Si vous souhaitez soutenir mon travail, vous pouvez m'encourager financièrement sur{' '}
                    <span className="bold">Tipeee</span>.
                  </Text>
                  <Text>Pas la peine de donner plus de {priceFormatter(1)} par mois.</Text>
                  <Text>J'ai besoin d'utilisateurs, pas d'argent.</Text>
                </Box>
                <LinkOverlay
                  href="https://fr.tipeee.com/oseille-app/"
                  target="_blank"
                  alignSelf="center"
                >
                  <Button
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
