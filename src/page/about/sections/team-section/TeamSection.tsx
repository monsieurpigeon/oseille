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
          width="369px"
          alignSelf="flex-start"
          src="https://media.licdn.com/dms/image/D4E03AQGO6toZm8opag/profile-displayphoto-shrink_400_400/0/1665435666497?e=1701302400&v=beta&t=s-gqC_rEAuw_-HRXaxLCVfeqceNgX_yZ9coji7mu9AA"
        />
        <Flex
          justifyContent="space-between"
          marginTop={2}
        >
          <Box>
            <a
              href="https://www.facebook.com/maxime.pigeon/"
              target="_blank"
            >
              <Box>Facebook</Box>
            </a>
            <a
              href="https://www.instagram.com/remote.farm"
              target="_blank"
            >
              <Box>Instagram</Box>
            </a>
            <a
              href="https://www.linkedin.com/in/maxime-pigeon/"
              target="_blank"
            >
              <Box>Linkedin</Box>
            </a>
            <a
              href="https://github.com/monsieurpigeon"
              target="_blank"
            >
              <Box>Github</Box>
            </a>
            <a
              href="https://www.youtube.com/channel/UCn1da__rpNMxGzcDTPauaWg"
              target="_blank"
            >
              <Box>Youtube</Box>
            </a>
          </Box>
          <Flex
            direction="column"
            alignItems="flex-end"
          >
            <Box>06 45 66 56 55</Box>
            <Box>maxpige@gmail.com</Box>
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
            Je ne suis pas maraîcher, mais je travaille pour{' '}
            <a
              href="https://elzeard.co"
              target="_blank"
            >
              Elzeard
            </a>
            , une super application de gestion complète de fermes maraîchères, et j'ai de nombreuses occasions de
            rencontrer des maraîchers et de comprendre leurs besoins.
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
          <Box>
            <Text>Mon objectif avec cette application :</Text>
            <Text>
              <Text as="b">Faire gagner 1h par semaine à 35 maraîchers</Text>, et cloner ma petite semaine de travail de
              citadin.
            </Text>
          </Box>
          <Text>La vie est trop courte pour copier-coller des cases dans Excel.</Text>
          <Text>Vous avez des choses bien plus grandes à réaliser autour de chez vous.</Text>
        </Flex>
      </Box>
    </Flex>
  );
}
