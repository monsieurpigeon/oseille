import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { store, updateFarm } from '../../../backend';
import { MyNumberInput } from '../../../component/form/MyNumberInput';
import { MyH2 } from '../../../component/typography/MyFont';
import { useFarmParameters } from '../../../utils/hooks/useFarmParameters';
import { DestroyAction } from '../components/actions/DestoyAction';
import { ExportAction } from '../components/actions/ExportAction';
import { ImportAction } from '../components/actions/ImportAction';

export const documentsSchema = z.object({
  invoiceId: z.number().gte(0),
  deliveryId: z.number().gte(0),
});

interface DocumentIdInput {
  invoiceId: number;
  deliveryId: number;
}

export function AdvancedSection() {
  const snap = useSnapshot(store);
  const { farm } = useFarmParameters();

  const { control, formState, handleSubmit, reset } = useForm<DocumentIdInput>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
    },
  });

  useEffect(() => {
    reset({
      invoiceId: farm?.invoiceId,
      deliveryId: farm?.deliveryId,
    });
  }, [farm]);

  const onSubmit = (e: DocumentIdInput) => farm && updateFarm({ ...farm, ...e });

  return (
    <>
      <Box>
        <MyH2>Import / Export</MyH2>
        <Text>Tout enregistrer, tout supprimer, tout recharger</Text>

        <HStack>
          <ExportAction />
          <DestroyAction />
          <ImportAction />
        </HStack>
      </Box>
      <Box>
        <MyH2>Numéro de documents</MyH2>
        <Text>À utiliser à vos risques et périls. Le mieux étant de ne pas y toucher.</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            gap={3}
            alignItems="flex-end"
          >
            <Box flexGrow={1}>
              <Text>Prochaine livraison:</Text>
              <MyNumberInput
                min={1}
                control={control}
                name="deliveryId"
              />
            </Box>
            <Box flexGrow={1}>
              <Text>Prochaine facture:</Text>
              <MyNumberInput
                min={1}
                control={control}
                name="invoiceId"
              />
            </Box>
            <Button
              type="submit"
              colorScheme={formState.isDirty ? 'blue' : 'gray'}
            >
              Enregistrer
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}
