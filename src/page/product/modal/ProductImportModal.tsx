import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import { Product } from '../../../backend';
import { MyModal } from '../../../component/modal/MyModal';
import { exportCSV } from '../../../utils/export';

export function ProductImportModal() {
  const products = useRouteLoaderData('products') as Product[];
  const cancelRef = useRef<any>();
  const navigate = useNavigate();
  const handleClose = (value?: { id: string }) => {
    if (value?.id) {
      navigate(`../${value?.id}`);
    } else {
      navigate(-1);
    }
  };

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const handleImport = () => {};
  const handleExport = () => {
    const headers = { name: 'Nom', tva: 'TVA', unit: 'Unité' };
    exportCSV(products, headers, 'exportProduit.csv');
  };

  return (
    <MyModal
      isOpen={true}
      cancelRef={cancelRef}
      onClose={handleClose}
      confirmLabel={tabIndex === 0 ? 'Importer' : 'Exporter'}
      cancelLabel="Fermer"
      onSubmit={tabIndex === 0 ? handleImport : handleExport}
    >
      <Tabs
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Import</Tab>
          <Tab>Export</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>IMPORT</TabPanel>
          <TabPanel>
            {products.length} produit{products.length > 1 ? 's' : ''} à exporter
          </TabPanel>
        </TabPanels>
      </Tabs>
    </MyModal>
  );
}
