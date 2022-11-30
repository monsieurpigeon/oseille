import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { loadCustomers, loadProducts } from './backend';
import { MainLayout } from './component/layout/MainLayout';
import { Contact } from './page/contact/Contact';
import { Customers } from './page/customer/Customers';
import { CustomerDetail } from './page/customer/detail/CustomerDetail';
import { CreateDocument } from './page/document/CreateDocument';
import { Documents } from './page/document/Documents';
import { Home } from './page/home/Home';
import { Products } from './page/product/Products';
import { Profile } from './page/profile/Profile';

function App() {
  loadCustomers();
  loadProducts();
  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="products"
          element={<Products />}
        />
        <Route
          path="customers"
          element={<Customers />}
        >
          <Route
            path=":id"
            element={<CustomerDetail />}
          />
        </Route>
        <Route
          path="contracts"
          element={<Documents />}
        />
        <Route
          path="contracts/create"
          element={<CreateDocument />}
        >
          <Route
            path=":customerId"
            element={<CreateDocument />}
          />
        </Route>
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
