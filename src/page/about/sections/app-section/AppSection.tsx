import { Flex, Heading, Link, SimpleGrid, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { MyIcon } from '../../../../component/MyIcon';
import { FEATURES } from '../../../../updateMe';
import { FeatureCard } from './FeatureCard';

export function AppSection() {
  return (
    <Flex
      direction="column"
      flexGrow={1}
      height="0"
      overflowY="scroll"
    >
      <Text>
        <Text as="b">Oseille</Text> est une application web qui permet de gérer ses{' '}
        <Text as="b">bons de livraisons</Text> et ses <Text as="b">factures</Text>,
      </Text>
      <Text>
        adaptée à l'usage des <Text as="b">maraîchers</Text>
        <MyIcon name="vegetable" />, notamment pour la gestion des produits, des clients et des tarifs.
      </Text>
      <Text>
        <Text as="b">Oseille</Text> est une application{' '}
        <Text as="b">gratuite, en code libre, et qui fonctionne même sans internet.</Text>
      </Text>
      <Text>Toutes les fonctionnalités sont issues de demandes directes des maraîchers qui utilisent l'app.</Text>
      <Text>N'hésitez pas à aller leur dire merci.</Text>
      <Link
        as={RouterLink}
        to={'/about/team'}
      >
        Et contactez-moi pour que l'application réponde à vos besoins.
      </Link>
      <Heading
        size="md"
        marginTop={8}
      >
        Historique des améliorations de l'application
      </Heading>
      <SimpleGrid
        padding={2}
        marginTop={8}
        flexGrow={1}
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {FEATURES.map((feat, index) => (
          <FeatureCard
            feature={feat}
            key={index}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
