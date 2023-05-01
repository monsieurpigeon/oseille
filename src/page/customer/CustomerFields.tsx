import { Box, Input, Text, Textarea } from '@chakra-ui/react';
import { DEFAULT_CUSTOMER } from '../../utils/defaults';

export function CustomerFields({ control, register }: any) {
  return (
    <>
      <Box p={1}>
        <Text>Nom</Text>
        <Input
          placeholder={DEFAULT_CUSTOMER.name}
          {...register('name')}
        />
      </Box>
      <Box p={1}>
        <Text>Adresse 1</Text>
        <Input
          placeholder={DEFAULT_CUSTOMER.address1}
          {...register('address1')}
        />
      </Box>
      <Box p={1}>
        <Text>Adresse 2</Text>
        <Input
          placeholder={DEFAULT_CUSTOMER.address2}
          {...register('address2')}
        />
      </Box>
      <Box p={1}>
        <Text>Code postal</Text>
        <Input
          placeholder={DEFAULT_CUSTOMER.zip}
          {...register('zip')}
        />
      </Box>
      <Box p={1}>
        <Text>Ville</Text>
        <Input
          placeholder={DEFAULT_CUSTOMER.city}
          {...register('city')}
        />
      </Box>
      <Box p={1}>
        <Text>Notes</Text>
        <Textarea
          placeholder="06 12 34 56 78, bonjour@maferme.fr"
          {...register('notes')}
        />
      </Box>
    </>
  );
}
