import { zodResolver } from '@hookform/resolvers/zod';
import { usePostHog } from 'posthog-js/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { addCustomer, CustomerInput } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { EMPTY_CUSTOMER } from '../../../utils/defaults';
import { CustomerFields } from './CustomerFields';

export const customerSchema = z.object({
  name: z.string().min(1),
  address1: z.string().min(1),
  address2: z.string(),
  zip: z.string().min(1),
  city: z.string().min(1),
  notes: z.string(),
  phone: z.string(),
  tvaRef: z.string().optional().nullable(),
});

export function CustomerCreateModal() {
  const posthog = usePostHog();
  const navigate = useNavigate();

  const { say } = useSideKick();

  const { register, handleSubmit } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: EMPTY_CUSTOMER,
  });

  const handleClose = (value?: { id: string }) => {
    if (value?.id) navigate(`../${value?.id}`);
    else navigate(-1);
  };

  const onSubmit = (e: CustomerInput) => {
    posthog?.capture('customer_add');
    return addCustomer(e)
      .then(handleClose)
      .then(() =>
        say({
          sentence: `Le client ${e.name} a bien été enregistré`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      )
      .catch(console.error);
  };

  return (
    <MyModal
      isOpen={true}
      title="Nouveau client"
      onClose={handleClose}
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomerFields register={register} />
    </MyModal>
  );
}
