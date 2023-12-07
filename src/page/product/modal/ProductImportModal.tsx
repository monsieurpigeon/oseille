import { Button, Container, Flex } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyModal } from '../../../component/modal/MyModal';

export function ProductImportModal() {
  const cancelRef = useRef<any>();
  const navigate = useNavigate();
  const handleClose = (value?: { id: string }) => {
    if (value?.id) {
      navigate(`../${value?.id}`);
    } else {
      navigate(-1);
    }
  };

  const [tab, setTab] = useState<'import' | 'export'>('import');

  return (
    <MyModal
      isOpen={true}
      cancelRef={cancelRef}
      title="Import / Export des produits"
      onClose={handleClose}
      onSubmit={() => {}}
    >
      <Flex gap={2}>
        <Button
          colorScheme="twitter"
          variant={tab === 'import' ? 'solid' : 'outline'}
          onClick={() => setTab('import')}
        >
          Import
        </Button>
        <Button
          colorScheme="twitter"
          variant={tab === 'export' ? 'solid' : 'outline'}
          onClick={() => setTab('export')}
        >
          Export
        </Button>
      </Flex>
      {tab === 'import' && <Container>IMPORT</Container>}
      {tab === 'export' && <Container>EXPORT</Container>}
    </MyModal>
  );
}
