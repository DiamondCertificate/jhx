import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Verify from './components/Verify';
import ConsumerDashboard from './components/ConsumerDashboard';

const Consumer = () => {
  return (
    <Box>
      <Routes>
        <Route index element={<ConsumerDashboard />} />
        <Route path="verify" element={<Verify />} />
      </Routes>
    </Box>
  );
};

export default Consumer;
              
