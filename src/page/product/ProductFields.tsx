import { Box, Input, Select, Text } from '@chakra-ui/react';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export const ProductFields = ({ control, register }: any) => {
  const { isTVA } = useFarmParameters();
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
        <Text>Unité</Text>
        <Select {...register('unit')}>
          <option value={'kg'}>kg</option>
          <option value={'piece'}>piece</option>
        </Select>
      </Box>
      {isTVA && (
        <Box p={1}>
          <Text>Taux de TVA</Text>
          <Select {...register('tva')}>
            <option value={'0'}>0%</option>
            <option value={'5.5'}>5.5%</option>
            <option value={'10'}>10%</option>
            <option value={'20'}>20%</option>
          </Select>
        </Box>
      )}
    </>
  );
};
