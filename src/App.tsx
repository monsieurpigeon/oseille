import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { loadCustomers, loadDeliveries, loadFarm, loadInvoices, loadProducts } from './backend';
import { MainLayout } from './component/layout/MainLayout';
import { Contact } from './page/contact/Contact';
import { Customers } from './page/customer/Customers';
import { CustomerDetail } from './page/customer/detail/CustomerDetail';
import { CreateDeliveries } from './page/delivery/CreateDeliveries';
import { Deliveries } from './page/delivery/Deliveries';
import { Home } from './page/home/Home';
import { Products } from './page/product/Products';
import { Settings } from './page/settings/Settings';
import { Invoices } from './page/invoice/Invoices';

function App() {
  loadCustomers();
  loadProducts();
  loadDeliveries();
  loadInvoices();
  loadFarm();
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
        >
          <Route
            path=":id"
            element={<CustomerDetail />}
          />
        </Route>
        <Route
          path="delivery"
          element={<Deliveries />}
        />
        <Route
          path="delivery/create"
          element={<CreateDeliveries />}
        >
          <Route
            path=":customerId"
            element={<CreateDeliveries />}
          />
        </Route>
        <Route
          path="invoice"
          element={<Invoices />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
