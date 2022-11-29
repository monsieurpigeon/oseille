import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { initDatabase, loadCustomers, loadProducts } from './backend';
import { MainLayout } from './components/layouts/MainLayout';
import { Contact } from './pages/contact/Contact';
import { Contracts } from './pages/contracts/Contracts';
import { CreateContract } from './pages/contracts/CreateContract';
import { Customers } from './pages/customers/Customers';
import { CustomerDetail } from './pages/customers/detail/CustomerDetail';
import { Home } from './pages/home/Home';
import { Products } from './pages/products/Products';
import { Profile } from './pages/profile/Profile';

function App() {
  initDatabase();
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
          element={<Contracts />}
        />
        <Route
          path="contracts/create"
          element={<CreateContract />}
        >
          <Route
            path=":customerId"
            element={<CreateContract />}
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
