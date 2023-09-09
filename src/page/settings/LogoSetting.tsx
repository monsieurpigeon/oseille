import { Box, Button, Image, Input, Text, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { LogoInput, addLogo } from '../../backend';
import { CreateModal } from '../../component/modal/CreateModal';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';
import { SettingCard } from './components/SettingCard';

export const logoSchema = z.object({
  data: z.string(),
});

export function LogoSetting() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { logo } = useFarmParameters();

  const { control, register, setValue, handleSubmit, reset } = useForm<LogoInput>({
    resolver: zodResolver(logoSchema),
    defaultValues: { data: '' },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (e: LogoInput) => addLogo(e).then(handleClose).catch(console.error);

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
      <CreateModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Ajouter un logo"
        body={
          <LogoFields
            control={control}
            register={register}
            setValue={setValue}
          />
        }
        footer={
          <>
            <Button
              ref={cancelRef}
              onClick={handleClose}
            >
              Annuler
            </Button>
            <Button
              colorScheme="twitter"
              type="submit"
              ml={3}
            >
              Enregistrer
            </Button>
          </>
        }
      />
    </SettingCard>
  );
}

const LogoFields = ({ control, register, setValue }: any) => {
  const image = useWatch({ control, name: 'image' });
  const [data, setData] = useState('');

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = ({ target: { result } }: any) => {
        setData(result);
        setValue('data', result);
      };
      reader.readAsDataURL(image[0]);
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
