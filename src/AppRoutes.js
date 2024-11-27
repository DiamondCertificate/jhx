import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManufacturerCreate from './pages/Manufacturer/components/Create';
import ManufacturerTransfer from './pages/Manufacturer/components/Transfer';
import NotFound from './pages/NotFound';
import Consumer from './pages/Consumer';
import Manufacturer from './pages/Manufacturer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/consumer/*" element={<Consumer />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/manufacturer/*" element={<Manufacturer />} />
      <Route path="/manufacturer/create" element={<ManufacturerCreate />} />
      <Route path="/manufacturer/transfer" element={<ManufacturerTransfer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;