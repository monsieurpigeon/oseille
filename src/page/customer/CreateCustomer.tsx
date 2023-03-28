import { Box, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CustomerInput, addCustomer } from '../../backend';
import { MyCreateModal } from '../../component/modal/MyCreateModal';

const EMPTY_CUSTOMER: CustomerInput = {
  name: '',
  address1: '',
  address2: '',
  city: '',
  zip: '',
};

const schema = z.object({
  name: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  city: z.string().min(1),
  zip: z.string().min(1),
});

export function CreateCustomer() {
  const { register, handleSubmit, reset } = useForm<CustomerInput>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_CUSTOMER,
  });

  return (
    <MyCreateModal
      onCreate={addCustomer}
      handleSubmit={handleSubmit}
      reset={reset}
      title="Nouveau client"
    >
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
    </MyCreateModal>
  );
}
