import { Button, Input, Text, useDisclosure } from '@chakra-ui/react';
import { usePostHog } from 'posthog-js/react';
import { ChangeEvent, useState } from 'react';
import { handleImport } from '../../../../../backend';
import { MyModal } from '../../../../../component/modal/MyModal';
import { MyIcon } from '../../../../../component/MyIcon';

export function ImportAction() {
  const posthog = usePostHog();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    posthog?.capture('db_import');
    handleImport({ file })
      .then(() => {
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Button
        colorScheme="twitter"
        onClick={onOpen}
      >
        <MyIcon name="warning" /> Import
      </Button>
      <MyModal
        title="Importer le fichier"
        isOpen={isOpen}
        onClose={onClose}
        disabled={!file}
        confirmLabel="Confirmer"
        onSubmit={handleUploadClick}
      >
        <Text>Veuillez sélectionner le fichier que vous avez reçu pendant l'export pour remplacer vos données</Text>
        <Input
          type="file"
          onChange={handleFileChange}
        />
      </MyModal>
    </>
  );
}
