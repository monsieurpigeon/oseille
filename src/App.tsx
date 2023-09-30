import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './component/layout/MainLayout';
import { About } from './page/about/About';
import { BackOffice } from './page/back-office/BackOffice';
import { Customers } from './page/customer/Customers';
import { Dashboard } from './page/dashboard/Dashboard';
import { Deliveries } from './page/delivery/Deliveries';
import { Invoices } from './page/invoice/Invoices';
import { Prices } from './page/prices/Prices';
import { Products } from './page/product/Products';
import { Settings } from './page/settings/Settings';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="product"
          element={<Products />}
        />
        <Route
          path="customer"
          element={<Customers />}
        />
        <Route
          path="prices"
          element={<Prices />}
        />
        <Route
          path="delivery"
          element={<Deliveries />}
        />
        <Route
          path="invoice"
          element={<Invoices />}
        />
        <Route
          path="settings/*"
          element={<Settings />}
        />
        <Route
          path="about/*"
          element={<About />}
        />
        <Route
          path="admin"
          element={<BackOffice />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
