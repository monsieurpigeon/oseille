import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Customer, CustomerInput, updateCustomer } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { MyMessage } from '../../../component/MyMessage';
import { customerSchema } from './CustomerCreateModal';
import { CustomerFields } from './CustomerFields';

export function CustomerEditModal() {
  const {
    customers: [customer],
  } = useRouteLoaderData('customer') as { customers: Customer[] };
  const navigate = useNavigate();
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

  const { register, handleSubmit, formState } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
  });

  return (
    <MyModal
      isOpen={true}
      title="Modifier le client"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={!formState.isDirty}
    >
      <MyMessage text="Si vous changez les coordonnées de ce client, les modifications apparaîtront dans tous les documents." />
      <CustomerFields register={register} />
    </MyModal>
  );
}
