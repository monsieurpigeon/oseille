import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { FarmInput, store, updateFarm } from '../../backend';
import { MyNumberInput } from '../../component/form/MyNumberInput';
import { MyHeader } from '../../component/layout/page-layout/MyHeader';
import { MyPage } from '../../component/layout/page-layout/MyPage';
import { MyScrollList } from '../../component/layout/page-layout/MyScrollList';
import { MySide } from '../../component/layout/page-layout/MySide';
import { MyH1, MyH2 } from '../../component/typography/MyFont';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { Configuration } from './Configuration';
import { Farm } from './Farm';
import { Logo } from './Logo';
import { DestroyAction } from './components/actions/DestoyAction';
import { ExportAction } from './components/actions/ExportAction';
import { ImportAction } from './components/actions/ImportAction';

export const EMPTY_FARM: FarmInput = {
  title: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  phone: '',
  email: '',
  footer: '',
  rib: '',
  iban: '',
  bic: '',
  siret: '',
  naf: '',
  tva: '',
  isTVA: 'non',
  bioLabel: 'non',
};

export const farmSchema = z.object({
  title: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  footer: z.string(),
  isTVA: z.string(),
  bioLabel: z.string(),
});

export const documentsSchema = z.object({
  invoiceId: z.number().gte(0),
  deliveryId: z.number().gte(0),
});

interface DocumentIdInput {
  invoiceId: number;
  deliveryId: number;
}

export function Settings() {
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
    <MyPage>
      <MySide>
        <MyHeader>
          <MyH1>Réglages</MyH1>
        </MyHeader>
        <MyScrollList>
          <Logo />
          <Farm farm={farm} />
          <Configuration farm={farm} />
        </MyScrollList>
      </MySide>
      <MySide>
        <MyHeader>
          <MyH1>Réglages avancés</MyH1>
        </MyHeader>
        <MyScrollList>
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
        </MyScrollList>
      </MySide>
    </MyPage>
  );
}
