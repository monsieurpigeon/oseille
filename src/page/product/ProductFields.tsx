import { Box, Input, Select, Text } from '@chakra-ui/react';
import { MyNumberInput } from '../../component/form/MyNumberInput';

export const ProductFields = ({ control, register }: any) => {
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
        <MyNumberInput
          control={control}
          name="price"
          min={0}
          step={0.2}
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
