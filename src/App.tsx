import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './component/layout/MainLayout';
import { BackOffice } from './page/back-office/BackOffice';
import { Contact } from './page/contact/Contact';
import { Customers } from './page/customer/Customers';
import { Deliveries } from './page/delivery/Deliveries';
import { Home } from './page/home/Home';
import { Invoices } from './page/invoice/Invoices';
import { Settings } from './page/settings/Settings';
import { Products } from './page/product/Products';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
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
          path="delivery"
          element={<Deliveries />}
        />
        <Route
          path="invoice"
          element={<Invoices />}
        />
        <Route
          path="contact"
          element={<Contact />}
        />
        <Route
          path="settings"
          element={<Settings />}
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
