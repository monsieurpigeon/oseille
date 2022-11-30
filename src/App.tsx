import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { loadCustomers, loadDeals, loadProducts } from './backend';
import { MainLayout } from './component/layout/MainLayout';
import { Contact } from './page/contact/Contact';
import { Customers } from './page/customer/Customers';
import { CustomerDetail } from './page/customer/detail/CustomerDetail';
import { CreateDeal } from './page/deal/CreateDeal';
import { Deals } from './page/deal/Deals';
import { Home } from './page/home/Home';
import { Products } from './page/product/Products';
import { Profile } from './page/profile/Profile';

function App() {
  loadCustomers();
  loadProducts();
  loadDeals();
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
          path="deal"
          element={<Deals />}
        />
        <Route
          path="deal/create"
          element={<CreateDeal />}
        >
          <Route
            path=":customerId"
            element={<CreateDeal />}
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
