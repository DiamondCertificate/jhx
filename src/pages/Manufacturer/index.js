import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import ManufacturerDashboard from './components/ManufacturerDashboard';
import Create from './components/Create';
import Transfer from './components/Transfer';
import Track from './components/Track';

const Manufacturer = () => {
  return (
    <Box>
      <Routes>
        <Route index element={<ManufacturerDashboard />} />
        <Route path="create" element={<Create />} />
        <Route path="transfer" element={<Transfer />} />
        <Route path="track" element={<Track />} />
      </Routes>
    </Box>
  );
};

export default Manufacturer;