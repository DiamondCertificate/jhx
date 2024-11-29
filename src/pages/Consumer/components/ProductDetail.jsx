import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDiamondPrice, purchaseDiamond } from './utils/contract';  // 导入 contract.js 中的方法
import Web3 from 'web3';
import {
  Container,
  Typography,
  Box,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  border: 0,
  borderRadius: 12,
  boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
  color: 'white',
  padding: '12px 30px',
  '&:hover': {
    background: 'linear-gradient(45deg, #B6E0FF 30%, #89CFF0 90%)',
    transform: 'scale(1.02)',
  },
  transition: 'all 0.3s ease',
}));

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 假设在组件加载时获取钻石信息
    const fetchProductDetails = async () => {
      // 这里需要调用合约的方法获取产品的价格等信息
      try {
        const price = await getDiamondPrice(id);  // 获取钻石价格
        const simulatedProduct = {
          id,
          name: 'Brilliant Heart Diamond necklace',
          price: price,  // 从合约中获取的价格
          description: 'A meticulously crafted heart-shaped diamond necklace, dazzling and radiant',
        };
        setProduct(simulatedProduct);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details.');
      }
    };

    fetchProductDetails();
  }, [id]);

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      setError('');

      if (!product) {
        throw new Error('Product details are not loaded');
      }

      const txHash = await purchaseDiamond(product.id, product.price);
      console.log('Transaction Hash:', txHash);
      setPurchaseSuccess(true);
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Purchase error:', err);
      setError('Purchase failure: ' + (err.message || 'unknown error'));
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <StyledContainer maxWidth="lg">
      <Stack spacing={4}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {product?.name}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ¥ {product?.price}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {product?.description}
          </Typography>

          {/* Purchase Button */}
          <GradientButton
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => setIsDialogOpen(true)}
            size="large"
          >
            Buy Now
          </GradientButton>
        </Box>
      </Stack>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={isDialogOpen} onClose={() => !isPurchasing && setIsDialogOpen(false)}>
        <DialogTitle>Confirm purchase</DialogTitle>
        <DialogContent>
          <Typography>
            Product: {product?.name}
          </Typography>
          <Typography>
            Price: ¥ {product?.price}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} disabled={isPurchasing}>
            Cancel
          </Button>
          <GradientButton
            onClick={handlePurchase}
            disabled={isPurchasing}
            startIcon={isPurchasing ? <CircularProgress size={20} /> : <AccountBalanceWalletIcon />}
          >
            {isPurchasing ? 'Processing...' : 'Confirm Purchase'}
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar open={purchaseSuccess} autoHideDuration={6000} onClose={() => setPurchaseSuccess(false)}>
        <Alert severity="success" onClose={() => setPurchaseSuccess(false)}>
          Purchase successful! You now own the diamond certificate.
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default ProductDetail;
