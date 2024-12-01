import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';
import {
  Container,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  Button,
  Chip,
  Link,
  Divider,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { styled } from '@mui/material/styles';
import deployedAddresses from '../../config/deployedAddresses.json';
import DiamondTraceabilityNFT from '../../config/DiamondTraceabilityNFT.json';


// 样式组件定义
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

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.18)',
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  '& img': {
    borderRadius: '16px',
    objectFit: 'cover',
  }
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [error, setError] = useState('');
  const [walletConnected, setWalletConnected] = useState(false);
  const [ProductDetail, setProduct] = useState(null);

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      DiamondTraceabilityNFT.abi,
      deployedAddresses.DiamondTraceabilityNFT
    );
  
    async function fetchProductDetails() {
      try {
        const details = await contract.methods.getDiamondDetails(id).call();
        setProduct({
          id,
          name: 'Brilliant Heart Diamond necklace',
          description: 'A meticulously crafted heart-shaped diamond necklace, dazzling and radiant',
          price: Web3.utils.fromWei(details.price, 'ether'),
          images: ['/public/IMG139.jpg', '/public/IMG139.jpg', '/public/IMG139.jpg'],
          certificate: {
            id: details.certificateNo,
            weight: details.weight,
            color: details.color,
            clarity: details.clarity,
            cut: details.cut,
            issueDate: details.issueDate,
          },
          contractAddress: deployedAddresses.DiamondTraceabilityNFT,
          specifications: [
            { label: 'Weight of diamond', value: `${details.weight} carat` },
            { label: 'Color', value: details.color },
            { label: 'Clarity', value: details.clarity },
            { label: 'Cut', value: details.cut },
            { label: 'Texture', value: '18K platinum' },
            { label: 'Chain length', value: '45cm' },
          ],
        });
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to fetch product details');
      }
    }
  
    fetchProductDetails();
  }, [id]);
  

  // 连接 MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install the MetaMask wallet first');
        return;
      }
  
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      setWalletConnected(true);
      handlePurchase();
    } catch (err) {
      setError('Wallet connection failure：' + err.message);
    }
  };
  

  // 智能合约 ABI
  const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "purchaseJewelry",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  // 处理购买逻辑
  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);
      setError('');
  
      if (!window.ethereum) {
        throw new Error('Please install the MetaMask wallet');
      }
  
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
  
      if (!accounts || accounts.length === 0) {
        throw new Error('Please connect the MetaMask wallet first');
      }
  
      const account = accounts[0];
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(
        DiamondTraceabilityNFT.abi,
        deployedAddresses.DiamondTraceabilityNFT
      );
  
      const data = contract.methods.purchaseJewelry(product.id).encodeABI();
  
      const transactionParameters = {
        to: product.contractAddress,
        from: account,
        value: web3.utils.toHex(web3.utils.toWei(product.price.toString(), 'ether')),
        data: data
      };
  
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  
      console.log('Transaction Hash:', txHash);
      setPurchaseSuccess(true);
      setIsDialogOpen(false);
    } catch (err) {
      console.error('Purchase error:', err);
      setError('Purchase failure：' + (err.message || 'unknown error'));
    } finally {
      setIsPurchasing(false);
    }
  };
  

  // 商品数据模拟
  const product = {
    id,
    name: 'Brilliant Heart Diamond necklace',
    description: 'A meticulously crafted heart-shaped diamond necklace, dazzling and radiant',
    price: 99999,
    images: [
      '/public/IMG139.jpg',
      '/public/IMG139.jpg',
      '/public/IMG139.jpg',
    ],
    certificate: {
      id: 'GIA2196152152',
      weight: '1.00',
      color: 'D',
      clarity: 'VVS1',
      cut: 'Excellent',
      issueDate: '2024-01-15'
    },
    contractAddress: '0x123...abc',
    specifications: [
      { label: 'Weight of diamond', value: '1.00carat' },
      { label: 'Color', value: 'D' },
      { label: 'Clarity', value: 'VVS1' },
      { label: 'Cut', value: 'Excellent' },
      { label: 'Texture', value: '18K platinum' },
      { label: 'Chain length', value: '45cm' }
    ]
  };

  return (
    <StyledContainer maxWidth="lg">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
        {/* 左侧图片展示 */}
        <Box sx={{ flex: { md: 7 } }}>
          <Fade in timeout={500}>
            <ImageContainer>
              <Box sx={{ width: '100%', height: '400px' }}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {product.images.slice(1).map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      flex: 1,
                      height: '200px',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name}-${index + 1}`}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                ))}
              </Box>
            </ImageContainer>
          </Fade>
        </Box>

        {/* 右侧信息展示 */}
        <Box sx={{ flex: { md: 5 } }}>
          <Zoom in timeout={500}>
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                {product.name}
              </Typography>

              <Box>
                <Typography variant="h3" sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  ¥ {product.price.toLocaleString()}
                </Typography>
              </Box>

              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>

              {/* 购买按钮 */}
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <GradientButton
                  startIcon={<AccountBalanceWalletIcon />}
                  onClick={() => setIsDialogOpen(true)}
                  size="large"
                >
                  Buy Now
                </GradientButton>
              </Box>

              <GlassCard>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VerifiedIcon sx={{ color: '#89CFF0' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Certificate Information
                      </Typography>
                    </Box>
                    <Divider />
                    {Object.entries(product.certificate).map(([key, value]) => (
                      <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">
                          {key === 'id' ? 'Certificate ID' :
                           key === 'weight' ? 'Weight' :
                           key === 'color' ? 'Color' :
                           key === 'clarity' ? 'Clarity' :
                           key === 'cut' ? 'Cut' :
                           key === 'issueDate' ? 'Issue Date' : key}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>{value}</Typography>
                      </Box>
                    ))}
                    <Link
                      href={`https://etherscan.io/address/${product.contractAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      <LaunchIcon sx={{ fontSize: 16 }} />
                      View on-chain information
                    </Link>
                  </Stack>
                </CardContent>
              </GlassCard>

              <GlassCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Specifications of Goods
                  </Typography>
                  <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2
                  }}>
                    {product.specifications.map((spec, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 'calc(50% - 8px)',
                          minWidth: '140px'
                        }}
                      >
                        <Typography color="text.secondary" variant="body2">
                          {spec.label}
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {spec.value}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </GlassCard>
            </Stack>
          </Zoom>
        </Box>
      </Stack>

      {/* 购买确认对话框 */}
      <Dialog open={isDialogOpen} onClose={() => !isPurchasing && setIsDialogOpen(false)}>
        <DialogTitle>
          Confirm Purchase
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography>
              Commodity: {product.name}
            </Typography>
            <Typography>
              Price: ¥ {product.price.toLocaleString()}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Payment will be made via MetaMask after clicking on the confirmation
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsDialogOpen(false)}
            disabled={isPurchasing}
          >
            Cancel
          </Button>
          <GradientButton
            onClick={connectWallet}
            disabled={isPurchasing}
            startIcon={isPurchasing ? <CircularProgress size={20} /> : <AccountBalanceWalletIcon />}
          >
            {isPurchasing ? 'Transaction processing...' : 'Confirm Purchase'}
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* 错误提示 */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      {/* 购买成功提示 */}
      <Snackbar
        open={purchaseSuccess}
        autoHideDuration={6000}
        onClose={() => setPurchaseSuccess(false)}
      >
        <Alert severity="success" onClose={() => setPurchaseSuccess(false)}>
          Successful purchase! You already have the diamond certificate.
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default ProductDetail;
