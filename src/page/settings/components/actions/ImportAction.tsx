import { Button, Input, Text, useDisclosure } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { handleImport } from '../../../../backend';
import { MyIcon } from '../../../../component/MyIcon';
import { MyModal } from '../../../../component/modal/MyModal';

export function ImportAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File>();
  const cancelRef = useRef<any>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    handleImport({ file })
      .then((data) => {
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
        cancelRef={cancelRef}
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
