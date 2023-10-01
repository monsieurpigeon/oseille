import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './component/layout/MainLayout';
import { About } from './page/about/About';
import { BackOffice } from './page/back-office/BackOffice';
import { Customers } from './page/customer/Customers';
import { Dashboard } from './page/dashboard/Dashboard';
import { Deliveries } from './page/delivery/Deliveries';
import { Invoices } from './page/invoice/Invoices';
import { Prices } from './page/prices/Prices';
import { ProductAll } from './page/product/ProductAll';
import { ProductDetail } from './page/product/ProductDetail';
import { Products } from './page/product/Products';
import { CreateProductModal } from './page/product/modal/ProductCreateModal';
import { EditProductModal } from './page/product/modal/ProductEditModal';
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
        >
          <Route
            index
            element={<ProductAll />}
          />
          <Route
            path="create"
            element={<CreateProductModal />}
          />
          <Route
            path=":id"
            element={<ProductDetail />}
          >
            <Route
              path="edit"
              element={<EditProductModal />}
            />
          </Route>
        </Route>

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
