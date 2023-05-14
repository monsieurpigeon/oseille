import { Button, Flex, FormControl, FormLabel, HStack, Input, Select, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { FarmInput, db, destroyDatabase, exportData, store, updateFarm } from '../../backend';
import FileUploadSingle from '../../component/form/FileUploadSingle';
import { useConfirm } from '../../component/modal/confirm-dialog/ConfirmContext';
import { MyH1, MyH2 } from '../../component/typography/MyFont';
import { DEFAULT_FARM, DEFAULT_FOOTER } from '../../utils/defaults';
import { Logo } from './Logo';

const EMPTY_FARM: FarmInput = {
  title: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  footer: '',
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

export function Settings() {
  const { farm } = useSnapshot(store);
  const { confirm } = useConfirm();

  const { register, handleSubmit, reset } = useForm<FarmInput>({
    resolver: zodResolver(farmSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  const onSubmit = (e: FarmInput) => farm && updateFarm({ ...farm, ...e }).catch(console.error);

  const exportDb = async () => {
    if (
      await confirm({
        title: 'Tout récupérer',
        message:
          'Vous allez récupérer une copie de toute votre base de donnée dans un fichier, à faire régulièrement et stocker sur un support différent',
      })
    ) {
      db.allDocs({ include_docs: true })
        .then((data) => data.rows.map(({ doc }) => doc))
        .then((data) => exportData(data))
        .catch(console.error);
    }
  };

  const destroyDb = async () => {
    if (
      await confirm({
        title: 'Tout effacer',
        message: `Vous allez supprimer toute la base de donnée, assurez vous d'avoir bien fait un export de vos données`,
      })
    ) {
      destroyDatabase().catch(console.error);
    }
  };

  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Réglages</MyH1>
        </div>
        <div className="catalog-list">
          <Logo />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <MyH2>Ma ferme</MyH2>
              {
                <Flex
                  direction="column"
                  gap="3"
                  marginBottom="20px"
                >
                  <Input
                    placeholder={DEFAULT_FARM.title}
                    {...register('title')}
                  />
                  <Input
                    placeholder={DEFAULT_FARM.address1}
                    {...register('address1')}
                  />
                  <Input
                    placeholder={DEFAULT_FARM.address2}
                    {...register('address2')}
                  />
                  <HStack>
                    <Input
                      placeholder={DEFAULT_FARM.zip}
                      {...register('zip')}
                    />

                    <Input
                      placeholder={DEFAULT_FARM.city}
                      {...register('city')}
                    />
                  </HStack>

                  <Button type="submit">Baptiser</Button>
                </Flex>
              }

              <MyH2>Ma configuration</MyH2>
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
                <Button type="submit">Mettre à jour</Button>
              </Flex>
            </FormControl>
          </form>
        </div>
      </div>
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Import / Export</MyH1>
        </div>
        <div className="catalog-list">
          <Button
            colorScheme="twitter"
            onClick={exportDb}
          >
            Export
          </Button>
          <Button
            colorScheme="red"
            onClick={destroyDb}
          >
            Armageddon
          </Button>
          <FileUploadSingle />
        </div>
      </div>
    </div>
  );
}
