import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManufacturerCreate from './pages/Manufacturer/Create';
import ManufacturerTransfer from './pages/Manufacturer/Transfer';
import LifecycleTrack from './pages/Lifecycle/Track';
import NotFound from './pages/NotFound';
import Consumer from './pages/Consumer';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/consumer/*" element={<Consumer />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/manufacturer/create" element={<ManufacturerCreate />} />
      <Route path="/manufacturer/transfer" element={<ManufacturerTransfer />} />
      <Route path="/lifecycle/track" element={<LifecycleTrack />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;