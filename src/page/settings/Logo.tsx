import { Box, Text, Button, Input, useDisclosure, Image } from '@chakra-ui/react';
import { CreateModal } from '../../component/modal/CreateModal';
import { LogoInput, addLogo } from '../../backend';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFarmParameters } from '../../utils/hooks/useFarmParameters';

export const logoSchema = z.object({
  data: z.string(),
});

export function Logo() {
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
    <>
      {logo && (
        <Image
          boxSize="150px"
          src={logo}
        />
      )}
      <Button
        size="lg"
        onClick={onOpen}
      >
        {logo ? 'Modifier le logo' : 'Ajouter un logo'}
      </Button>
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
    </>
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
