import { Box, Input, Text } from '@chakra-ui/react';

export function CustomerFields({ control, register }: any) {
  return (
    <>
      <Box p={1}>
        <Text>Nom</Text>
        <Input
          placeholder="Biocoop"
          {...register('name')}
        />
      </Box>
      <Box p={1}>
        <Text>Adresse 1</Text>
        <Input
          placeholder="42 rue du petit-pois"
          {...register('address1')}
        />
      </Box>
      <Box p={1}>
        <Text>Adresse 2</Text>
        <Input
          placeholder=""
          {...register('address2')}
        />
      </Box>
      <Box p={1}>
        <Text>Code postal</Text>
        <Input
          placeholder="33000"
          {...register('zip')}
        />
      </Box>
      <Box p={1}>
        <Text>Ville</Text>
        <Input
          placeholder="Bordeaux"
          {...register('city')}
        />
      </Box>
    </>
  );
}
