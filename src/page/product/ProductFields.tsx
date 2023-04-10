import { Box, Input, Select, Text } from '@chakra-ui/react';

export const ProductFields = ({ register }: any) => {
  return (
    <>
      <Box p={1}>
        <Text>Nom</Text>
        <Input
          placeholder="Tomates cerises"
          {...register('name')}
        />
      </Box>
      <Box p={1}>
        <Text>Prix</Text>
        <Input
          {...register('price', {
            valueAsNumber: true,
          })}
        />
      </Box>
      <Box p={1}>
        <Text>Unité</Text>
        <Select {...register('unit')}>
          <option value={'kg'}>kg</option>
          <option value={'piece'}>piece</option>
        </Select>
      </Box>
    </>
  );
};
