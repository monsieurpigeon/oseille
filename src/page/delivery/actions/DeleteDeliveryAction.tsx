import { usePostHog } from 'posthog-js/react';
import { Delivery, deleteDelivery } from '../../../backend';
import { DeleteButton } from '../../../component/buttons';
import { useConfirm } from '../../../component/modal/confirm-modal/ConfirmContext';
import { useSideKick } from '../../../component/modules/sidekick/SideKickContext';
import { SideKickFeeling } from '../../../component/modules/sidekick/enums';

interface DeleteDeliveryActionProps {
  delivery: Delivery;
}

export function DeleteDeliveryAction({ delivery }: DeleteDeliveryActionProps) {
  const posthog = usePostHog();
  const isEditable = !delivery.invoiceId;
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
      deleteDelivery(delivery).then(() =>
        say({
          sentence: `La livraison ${delivery.documentId} a bien été supprimée`,
          autoShutUp: true,
          feeling: SideKickFeeling.GOOD,
        }),
      );
    }
  };

  return (
    <DeleteButton
      onClick={handleDeleteDelivery}
      disabled={!isEditable}
    />
  );
}
