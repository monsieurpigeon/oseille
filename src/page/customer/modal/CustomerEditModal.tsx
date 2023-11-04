import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CustomerInput, updateCustomer } from '../../../backend';
import { MyMessage } from '../../../component/MyMessage';
import { MyModal } from '../../../component/modal/MyModal';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useData } from '../../../context/DataContext';
import { customerSchema } from './CustomerCreateModal';
import { CustomerFields } from './CustomerFields';

export function CustomerEditModal() {
  const { id } = useParams();
  const { getCustomer } = useData();
  const cancelRef = useRef<any>();
  const navigate = useNavigate();

  const customer = useMemo(() => (id ? getCustomer(id) : undefined), [id]);

  const { say } = useSideKick();

  const handleClose = () => navigate('..');

  const onSubmit = (e: CustomerInput) => {
    customer &&
      updateCustomer({ ...customer, ...e })
        .then(handleClose)
        .then(() =>
          say({
            sentence: `Le client ${e.name} a bien été enregistré`,
            autoShutUp: true,
            feeling: SideKickFeeling.GOOD,
          }),
        );
  };

  const { control, register, handleSubmit, reset, formState } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
  });

  return (
    <MyModal
      isOpen={true}
      cancelRef={cancelRef}
      title="Modifier le client"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!formState.isDirty}
    >
      <MyMessage text="Si vous changez les coordonnées de ce client, les modifications apparaîtront dans tous les documents." />
      <CustomerFields
        control={control}
        register={register}
      />
    </MyModal>
  );
}
