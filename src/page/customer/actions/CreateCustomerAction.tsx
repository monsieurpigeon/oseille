import { Button, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CustomerInput, addCustomer } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { EMPTY_CUSTOMER } from '../../../utils/defaults';
import { CustomerFields } from '../CustomerFields';

export const customerSchema = z.object({
  name: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  notes: z.string(),
  phone: z.string(),
});

export function CreateCustomerAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const { control, register, handleSubmit, reset } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: EMPTY_CUSTOMER,
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      reset();
    }, 100);
  };

  const { say } = useSideKick();

  const onSubmit = (e: CustomerInput) =>
    addCustomer(e)
      .then(() =>
        say({
          sentence: `Le client ${e.name} a bien été enregistré`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .then(handleClose)
      .catch(console.error);

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
        title="Nouveau client"
        onClose={handleClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomerFields
          register={register}
          control={control}
        />
      </MyModal>
    </>
  );
}
