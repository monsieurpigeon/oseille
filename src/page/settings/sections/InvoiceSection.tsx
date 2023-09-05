import { Button, Flex, FormControl, FormLabel, HStack, Input, Select, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FarmInput, updateFarm } from '../../../backend';
import { MyH2 } from '../../../component/typography/MyFont';
import { DEFAULT_FOOTER } from '../../../utils/defaults';
import { useFarmParameters } from '../../../utils/hooks/useFarmParameters';
import { EMPTY_FARM } from '../Settings';

export const configSchema = z.object({
  footer: z.string(),
  isTVA: z.string(),
  bioLabel: z.string(),
  rib: z.string(),
  iban: z.string(),
  bic: z.string(),
  siret: z.string(),
  naf: z.string(),
  tva: z.string(),
});

export function InvoiceSection() {
  const { farm } = useFarmParameters();
  const { register, handleSubmit, reset, formState } = useForm<FarmInput>({
    resolver: zodResolver(configSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  const onSubmit = (e: FarmInput) => {
    farm && updateFarm({ ...farm, ...e }).catch(console.error);
  };

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <MyH2>Ma configuration</MyH2>
        <HStack>
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
          <Flex
            direction="column"
            mt={3}
            mb={3}
          >
            <FormLabel
              flexGrow={1}
              htmlFor="isTVA"
            >
              Agriculture biologique ?
            </FormLabel>
            <Select {...register('bioLabel')}>
              <option value="non">NON</option>
              <option value="fr-bio-01">FR-BIO-01</option>
            </Select>
          </Flex>
          <Flex
            direction="column"
            gap={3}
          >
            <Text>Mon pied de page: S'affiche en bas des documents</Text>
            <Input
              placeholder={DEFAULT_FOOTER}
              {...register('footer')}
            />
          </Flex>
        </HStack>
        <HStack>
          <Flex
            direction="column"
            mt={3}
            mb={3}
          >
            <FormLabel
              flexGrow={1}
              htmlFor="rib"
            >
              RIB
            </FormLabel>
            <Input
              placeholder={'RIB'}
              {...register('rib')}
            />
          </Flex>
          <Flex
            direction="column"
            mt={3}
            mb={3}
          >
            <FormLabel
              flexGrow={1}
              htmlFor="iban"
            >
              IBAN
            </FormLabel>
            <Input
              placeholder={'IBAN'}
              {...register('iban')}
            />
          </Flex>
          <Flex
            direction="column"
            mt={3}
            mb={3}
          >
            <FormLabel
              flexGrow={1}
              htmlFor="bic"
            >
              BIC
            </FormLabel>
            <Input
              placeholder={'BIC'}
              {...register('bic')}
            />
          </Flex>
        </HStack>
        <HStack>
          <Flex
            direction="column"
            mt={3}
            mb={3}
          >
            <FormLabel
              flexGrow={1}
              htmlFor="siret"
            >
              SIRET
            </FormLabel>
            <Input
              placeholder={'SIRET'}
              {...register('siret')}
            />
          </Flex>

          <Flex
            direction="column"
            mt={3}
            mb={3}
          >
            <FormLabel
              flexGrow={1}
              htmlFor="naf"
            >
              NAF
            </FormLabel>
            <Input
              placeholder={'NAF'}
              {...register('naf')}
            />
          </Flex>

          <Flex
            direction="column"
            mt={3}
            mb={3}
          >
            <FormLabel
              flexGrow={1}
              htmlFor="tva"
            >
              N° TVA
            </FormLabel>
            <Input
              placeholder={'N° TVA'}
              {...register('tva')}
            />
          </Flex>
        </HStack>

        <Button
          type="submit"
          colorScheme={formState.isDirty ? 'blue' : 'gray'}
        >
          Mettre à jour
        </Button>
      </FormControl>
    </form>
  );
}
