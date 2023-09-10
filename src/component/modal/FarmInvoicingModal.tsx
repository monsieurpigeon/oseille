import { Flex, FormLabel, Input, Select, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../backend';
import { EMPTY_FARM } from '../../page/settings/Settings';
import { DEFAULT_FOOTER } from '../../utils/defaults';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { MyModal } from './MyModal';

interface FarmInvoicingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const configSchema = z.object({
  footer: z.string(),
  isTVA: z.string(),
});

export function FarmInvoicingModal({ isOpen, onClose }: FarmInvoicingModalProps) {
  const { farm } = useFarmParameters();
  const cancelRef = useRef<any>();

  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(configSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  const onSubmit = (e: FarmInput) => {
    farm &&
      updateFarm({ ...farm, ...e })
        .then(onClose)
        .catch(console.error);
  };

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  return (
    <MyModal
      cancelRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Mes factures"
      disabled={!formState.isDirty}
    >
      <Flex
        direction="column"
        mt={3}
        mb={3}
      >
        <FormLabel
          flexGrow={1}
          htmlFor="isTVA"
        >
          Gérer la TVA ?
        </FormLabel>
        <Select {...register('isTVA')}>
          <option value="non">NON</option>
          <option value="oui">OUI</option>
        </Select>
      </Flex>
      <Flex direction="column">
        <FormLabel>Mon pied de page</FormLabel>
        <Text>S'affiche en bas des documents</Text>
        <Input
          placeholder={DEFAULT_FOOTER}
          {...register('footer')}
        />
      </Flex>
    </MyModal>
  );
}
