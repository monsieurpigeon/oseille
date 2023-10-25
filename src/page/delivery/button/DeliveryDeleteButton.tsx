import { usePostHog } from 'posthog-js/react';
import { useNavigate } from 'react-router-dom';
import { Delivery, deleteDelivery } from '../../../backend';
import { DeleteButton } from '../../../component/buttons';
import { useConfirm } from '../../../component/modal/confirm-modal/ConfirmContext';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';

interface DeleteDeliveryActionProps {
  delivery: Delivery;
}

export function DeliveryDeleteButton({ delivery }: DeleteDeliveryActionProps) {
  const navigate = useNavigate();
  const posthog = usePostHog();
  const isEditable = !delivery.invoice;
  const { say } = useSideKick();
  const { confirm } = useConfirm();

  const handleDeleteDelivery = async () => {
    if (
      await confirm({
        title: 'Supprimer la livraison',
        message: 'Vous ne pourrez pas la récupérer',
      })
    ) {
      posthog?.capture('delivery_delete');
      await deleteDelivery(delivery);
      say({
        sentence: `La livraison ${delivery.documentId} a bien été supprimée`,
        autoShutUp: true,
        feeling: SideKickFeeling.GOOD,
      });
      navigate('..');
    }
  };

  return (
    <DeleteButton
      onClick={handleDeleteDelivery}
      disabled={!isEditable}
    />
  );
}
