import { Delivery, deleteDelivery } from '../../../backend';
import { DeleteButton } from '../../../component/buttons';
import { useConfirm } from '../../../component/modal/confirm-modal/ConfirmContext';

interface DeleteDeliveryActionProps {
  delivery: Delivery;
}

export function DeleteDeliveryAction({ delivery }: DeleteDeliveryActionProps) {
  const isEditable = !delivery.invoiceId;
  const { confirm } = useConfirm();

  const handleDeleteDelivery = async () => {
    if (
      await confirm({
        title: 'Supprimer la livraison',
        message: 'Vous ne pourrez pas la récupérer',
      })
    ) {
      deleteDelivery(delivery);
    }
  };

  return (
    <DeleteButton
      onClick={handleDeleteDelivery}
      disabled={!isEditable}
    />
  );
}
