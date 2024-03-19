import { Box, Image, Input, Text, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { useRouteLoaderData } from 'react-router-dom';
import { z } from 'zod';
import { addLogo, LogoInput } from '../../../../../backend';
import { MyModal } from '../../../../../component/modal/MyModal';
import { SideKickFeeling } from '../../../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../../../component/modules/sidekick/SideKickContext';
import { SettingCard } from '../../../components/SettingCard';

export const logoSchema = z.object({
  data: z.string(),
  image: z.any(),
});

export function LogoSettingBlock() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { say } = useSideKick();
  const { logo } = useRouteLoaderData('farm') as { logo: string };

  const methods = useForm<LogoInput>({
    resolver: zodResolver(logoSchema),
    defaultValues: { data: '' },
  });

  const handleClose = () => {
    onClose();
    methods.reset();
  };

  const onSubmit = (e: LogoInput) =>
    addLogo(e)
      .then(() =>
        say({
          sentence: `Le logo a bien été enregistré`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(handleClose)
      .then(() => window.location.reload())
      .catch(console.error);

  return (
    <SettingCard
      title="Mon Logo"
      onUpdate={onOpen}
    >
      {logo && (
        <Image
          boxSize="150px"
          src={logo}
        />
      )}
      {!logo && <Text>Aucun logo</Text>}
      {isOpen && (
        <MyModal
          isOpen={true}
          onClose={handleClose}
          onSubmit={methods.handleSubmit(onSubmit)}
          title="Ajouter un logo"
        >
          <LogoFields methods={methods} />
        </MyModal>
      )}
    </SettingCard>
  );
}

const LogoFields = ({ methods }: { methods: UseFormReturn<LogoInput> }) => {
  const { register, control, setValue } = methods;
  const image = useWatch({ control, name: 'image' });
  const [data, setData] = useState('');

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = ({ target }: ProgressEvent<FileReader>) => {
        if (target && target.result) {
          setData(target.result as string);
          setValue('data', target.result as string);
        }
      };
      reader.readAsDataURL((image as Blob[])[0]);
    }
  }, [image]);

  return (
    <Box p={1}>
      <Text>Nom</Text>
      <Input
        type="file"
        {...register('image')}
      />
      {data && (
        <Image
          boxSize="150px"
          src={data}
        />
      )}
    </Box>
  );
};
