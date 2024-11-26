import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ManufacturerCreate from './pages/Manufacturer/Create';
import ManufacturerTransfer from './pages/Manufacturer/Transfer';
import ConsumerVerify from './pages/Consumer/Verify';
import LifecycleTrack from './pages/Lifecycle/Track';
import NotFound from './pages/NotFound';
import ConsumerDashboard from './pages/Consumer/ConsumerDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
      <Route path="/manufacturer/create" element={<ManufacturerCreate />} />
      <Route path="/manufacturer/transfer" element={<ManufacturerTransfer />} />
      <Route path="/consumer/verify" element={<ConsumerVerify />} />
      <Route path="/lifecycle/track" element={<LifecycleTrack />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;