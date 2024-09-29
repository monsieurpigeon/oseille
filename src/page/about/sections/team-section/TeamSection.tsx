import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

export function TeamSection() {
  return (
    <Flex
      gap={8}
      alignItems="stretch"
      flexGrow={1}
    >
      <Flex direction="column">
        <Image
          width="250px"
          alignSelf="flex-start"
          src="/portrait.jpeg"
        />
        <Flex
          justifyContent="space-between"
          marginTop={2}
        >
          <Box>
            <a
              href="https://www.facebook.com/maxime.pigeon/"
              target="_blank"
              rel="noreferrer"
            >
              <Box>Facebook</Box>
            </a>
            <a
              href="https://www.instagram.com/remote.farm"
              target="_blank"
              rel="noreferrer"
            >
              <Box>Instagram</Box>
            </a>
            <a
              href="https://www.linkedin.com/in/maxime-pigeon/"
              target="_blank"
              rel="noreferrer"
            >
              <Box>Linkedin</Box>
            </a>
            <a
              href="https://github.com/monsieurpigeon"
              target="_blank"
              rel="noreferrer"
            >
              <Box>Github</Box>
            </a>
            <a
              href="https://www.youtube.com/channel/UCn1da__rpNMxGzcDTPauaWg"
              target="_blank"
              rel="noreferrer"
            >
              <Box>Youtube</Box>
            </a>
          </Box>
          <Flex
            direction="column"
            alignItems="flex-end"
          >
            <Box>06 45 66 56 55</Box>
            <Box>contact@oseille.app</Box>
          </Flex>
        </Flex>
      </Flex>

      <Box
        overflowY="scroll"
        flexGrow={1}
      >
        <Heading>Bonjour</Heading>
        <Flex
          gap={4}
          direction="column"
          marginTop={8}
          maxWidth="500px"
          height={0}
          textAlign="justify"
        >
          <Text>
            Je m'appelle Maxime, je suis développeur web, je vis à Bordeaux et je fabrique l'application{' '}
            <Text as="b">Oseille</Text> sur mon temps libre.
          </Text>
          <Text>
            Je m'inspire de la permaculture pour développer <Text as="b">Oseille</Text> afin d'aller en permanence à
            l'économie maximum (de temps, d'argent et de tracas) pour pouvoir la proposer gratuitement.
          </Text>
          <Text>
            Chaque problème est une opportunité potentielle, il faut voir grand et commencer petit. Les bonnes idées
            poussent partout et le seul effort à fournir devrait être de trouver un langage commun pour pouvoir les
            partager.
          </Text>

          <Text>
            Je ne suis pas maraîcher, mais j'ai de nombreuses occasions de rencontrer des maraîchers et de comprendre
            leurs besoins.
          </Text>
          <Text>
            Par soucis d'économie je ne développerais QUE les fonctionnalités qu'un maraîcher me demandera d'ajouter. Si
            vous souhaitez participer à l'amélioration d'<span className="bold">Oseille</span> : contactez-moi !
          </Text>
          <Text>
            <span className="bold">Oseille</span> est également un support pédagogique puisque je m'en sers pour aider
            de nouveaux développeurs web à apprendre ce métier. Certaines fonctionnalités ont été développées par des
            débutants que je conseille dans leur reconversion professionnelle. Si vous êtes intéressé par le
            développement web : contactez-moi !
          </Text>
          <Text>La vie est trop courte pour copier-coller des cases dans Excel.</Text>
          <Text>Vous avez des choses bien plus grandes à réaliser autour de chez vous.</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
