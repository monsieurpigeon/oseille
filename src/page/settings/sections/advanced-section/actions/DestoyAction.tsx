import { Button } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { destroyDatabase } from '../../../../../backend';
import { useConfirm } from '../../../../../component/modal/confirm-modal/ConfirmContext';

export function DestroyAction() {
  const posthog = usePostHog();
  const { confirm } = useConfirm();

  const destroyDb = async () => {
    if (
      await confirm({
        title: 'Tout effacer',
        message:
          "Vous allez supprimer toute la base de donnée, assurez vous d'avoir bien fait un export de vos données",
      })
    ) {
      posthog?.capture('armageddon');
      destroyDatabase()
        .then(() => window.location.reload())
        .catch(console.error);
    }
  };

  return (
    <Button
      colorScheme="red"
      onClick={destroyDb}
    >
      Armageddon
    </Button>
  );
}
