import { Flex, Heading, SimpleGrid } from '@chakra-ui/react';
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
      <div>
        <span className="bold">Oseille</span> est une application web qui permet de gérer ses{' '}
        <span className="bold">bons de livraisons</span> et ses <span className="bold">factures,</span>.
      </div>
      <div>
        adaptée à l'usage des <span className="bold">maraîchers</span>
        <MyIcon name={'vegetable'} />, notamment pour la gestion des produits, clients et tarifs.
      </div>
      <div>
        <span className="bold">Oseille</span> est une application{' '}
        <span className="bold">gratuite, en code libre, et qui fonctionne sans internet.</span>
      </div>
      <div>Toutes les fonctionnalités sont issues de demandes directes des maraîchers qui utilisent l'app.</div>
      <div>Contactez-moi pour que l'application réponde à vos besoins.</div>
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
