import { Box, Button, Flex, HStack, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSnapshot } from 'valtio';
import { z } from 'zod';
import { FarmInput, db, destroyDatabase, exportData, store, updateFarm } from '../../backend';
import FileUploadSingle from '../../component/form/FileUploadSingle';
import { ConfirmationModal } from '../../component/modal/ConfirmationModal';
import { MyH1, MyH2 } from '../../component/typography/MyFont';
import { DEFAULT_FARM, DEFAULT_FOOTER } from '../../utils/defaults';

const EMPTY_FARM: FarmInput = {
  title: '',
  address1: '',
  address2: '',
  zip: '',
  city: '',
  footer: '',
};

export const farmSchema = z.object({
  title: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  footer: z.string(),
});

export function Settings() {
  const { farm } = useSnapshot(store);

  const { register, handleSubmit, reset } = useForm<FarmInput>({
    resolver: zodResolver(farmSchema),
    defaultValues: { ...EMPTY_FARM, ...farm },
  });

  useEffect(() => {
    if (farm) reset(farm);
  }, [farm]);

  const onSubmit = (e: FarmInput) => farm && updateFarm({ ...farm, ...e }).catch(console.error);

  return (
    <div className="catalog">
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Réglages</MyH1>
        </div>
        <div className="catalog-list">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <MyH2>Mon Footer</MyH2>
            <Flex
              direction="column"
              gap={3}
            >
              <Text>S'affiche en bas des documents</Text>
              <Input
                placeholder={DEFAULT_FOOTER}
                {...register('footer')}
              />
              <Button type="submit">Mettre à jour</Button>
            </Flex>
          </form>
        </div>
      </div>
      <div className="catalog-side">
        <div className="catalog-header">
          <MyH1>Import / Export</MyH1>
        </div>
        <div className="catalog-list">
          <ConfirmationModal
            label="Export"
            title="Tout récupérer"
            message="Vous allez récupérer une copie de toute votre base de donnée dans un fichier, à faire régulièrement et stocker sur un support différent"
            onConfirm={() => {
              db.allDocs({ include_docs: true })
                .then((data) => data.rows.map(({ doc }) => doc))
                .then((data) => exportData(data))
                .catch(console.error);
            }}
          />
          <ConfirmationModal
            label="Armageddon"
            color="red"
            title="Tout effacer"
            message="Vous allez supprimer toute la base de donnée, assurez vous d'avoir bien fait un export de vos données"
            onConfirm={() => {
              destroyDatabase().catch(console.error);
            }}
          />
          <FileUploadSingle />
        </div>
      </div>
    </div>
  );
}
