import { Button } from '@chakra-ui/react';
import { db, exportData } from '../../../../backend';
import { useConfirm } from '../../../../component/modal/confirm-modal/ConfirmContext';

export function ExportAction() {
  const { confirm } = useConfirm();

  const exportDb = async () => {
    if (
      await confirm({
        title: 'Tout récupérer',
        message:
          'Vous allez récupérer une copie de toute votre base de donnée dans un fichier, à faire régulièrement et stocker sur un support différent',
      })
    ) {
      db.allDocs({ include_docs: true })
        .then((data) => data.rows.map(({ doc }) => doc))
        .then((data) => exportData(data))
        .catch(console.error);
    }
  };

  return (
    <Button
      colorScheme="twitter"
      onClick={exportDb}
    >
      Export
    </Button>
  );
}
