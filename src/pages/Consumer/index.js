import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Verify from './components/Verify';
import ConsumerDashboard from './components/ConsumerDashboard';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';


const Consumer = () => {
  return (
    <Box>
      <Routes>
        <Route index element={<ConsumerDashboard />} />
        <Route path="verify" element={<Verify />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Routes>
    </Box>
  );
};

export default Consumer;
              
