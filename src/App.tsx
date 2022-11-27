import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './components/layouts/MainLayout';
import { navItems } from './components/navigation/Navigation';

function App() {
  return (
    <MainLayout>
      <Routes>
        {navItems.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<item.component />}
          />
        ))}
      </Routes>
    </MainLayout>
  );
}

export default App;
