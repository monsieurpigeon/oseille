import { Text, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Customer, CustomerInput, updateCustomer } from '../../../backend';
import { MyIcon } from '../../../component/MyIcon';
import { EditButton } from '../../../component/buttons';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { CustomerFields } from '../CustomerFields';
import { customerSchema } from './CreateCustomerAction';

interface EditCustomerActionProps {
  customer: Customer;
}

export function EditCustomerAction({ customer }: EditCustomerActionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const { say } = useSideKick();

  const { control, register, handleSubmit, reset, formState } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
  });

  useEffect(() => {
    reset(customer);
  }, [customer]);

  const onSubmit = (e: CustomerInput) => {
    customer &&
      updateCustomer({ ...customer, ...e })
        .then(() =>
          say({
            sentence: `Le client ${e.name} a bien été enregistré`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        )
        .then(onClose);
  };

  return (
    <>
      <EditButton onClick={onOpen} />
      <MyModal
        isOpen={isOpen}
        cancelRef={cancelRef}
        title="Modifier le client"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        disabled={!formState.isDirty}
      >
        <Text
          border="1px solid grey"
          padding="2"
          borderRadius="6"
        >
          <MyIcon name="warning" /> Si vous changez les coordonnées de ce client, les modifications apparaîtront dans
          tous les documents.
        </Text>
        <CustomerFields
          control={control}
          register={register}
        />
      </MyModal>
    </>
  );
}
