import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProductInput, addProduct } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { ProductFields } from '../ProductFields';

export const productSchema = z.object({
  name: z.string().min(1),
  unit: z.string(),
  tva: z.string().optional(),
});

export function CreateProductAction() {
  const posthog = usePostHog();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { say } = useSideKick();

  const { control, register, handleSubmit, reset } = useForm<ProductInput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      unit: 'kg',
      tva: '5.5',
    },
  });
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 100);
  };

  const onSubmit = (e: ProductInput) => {
    posthog?.capture('product_add');
    return addProduct(e)
      .then(() =>
        say({
          sentence: `Le produit ${e.name} a bien été enregistré`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(handleClose)
      .catch(console.error);
  };

  return (
    <>
      <Button
        colorScheme="twitter"
        onClick={onOpen}
      >
        Nouveau
      </Button>
      <MyModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Nouveau produit"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProductFields
          control={control}
          register={register}
        />
      </MyModal>
    </>
  );
}
