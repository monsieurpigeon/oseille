import { Box, Image, Input, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addLogo, LogoInput } from '../../backend';
import { logoSchema } from '../../page/settings/sections/farm-section/blocks/LogoSettingBlock';
import { SideKickFeeling } from '../modules/sidekick/enums';
import { useSideKick } from '../modules/sidekick/SideKickContext';
import { MyModal } from './MyModal';

export function FarmLogoModal() {
  const { say } = useSideKick();

  const navigate = useNavigate();
  const onClose = () => {
    navigate('..');
  };
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
    <MyModal
      isOpen={true}
      onClose={handleClose}
      onSubmit={methods.handleSubmit(onSubmit)}
      title="Ajouter un logo"
    >
      <LogoFields methods={methods} />
    </MyModal>
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
