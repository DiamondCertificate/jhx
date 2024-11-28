import { useState } from 'react';
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

  // Connect MetaMask
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install the MetaMask wallet first');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length > 0) {
        setWalletConnected(true);
        handlePurchase();
      }
    } catch (err) {
      setError('Wallet connection failure：' + err.message);
    }
  };


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

  // Processing purchases
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
  
      // Create a contract instance
    const contract = new web3.eth.Contract(CONTRACT_ABI, product.contractAddress);
    
    // Coded contract call
    const data = contract.methods.purchaseJewelry(product.id).encodeABI();

    // Construct trading parameters
    const transactionParameters = {
      to: product.contractAddress,
      from: account,
      value: web3.utils.toHex(web3.utils.toWei(product.price.toString(), 'ether')),
      data: data
    };

    // Send transaction
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
  
  // Simulated commodity data
  const product = {
    id,
    name: 'Brilliant Heart Diamond necklace',
    description: 'A meticulously crafted heart-shaped diamond necklace, dazzling and radiant',
    price: 99999,
    images: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
      'https://example.com/image3.jpg',
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
      { label: 'color', value: 'D' },
      { label: 'Clarity', value: 'VVS1' },
      { label: 'Cut', value: 'Excellent' },
      { label: 'Texture', value: '18Kplatinum' },
      { label: 'chain length', value: '45cm' }
    ]
  };

  return (
    <StyledContainer maxWidth="lg">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
         {/* Left picture display */}
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
                      height: '200px'
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

         {/* Right information display*/}
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

               {/* Add purchase button. */}
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
                           key === 'issueDate' ? 'IssueDate' : key}
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
                   specification of goods
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

       {/* Purchase Confirmation Dialog Box */}
      <Dialog open={isDialogOpen} onClose={() => !isPurchasing && setIsDialogOpen(false)}>
        <DialogTitle>
         Confirm purchase
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Typography>
             commodity：{product.name}
            </Typography>
            <Typography>
             price：¥ {product.price.toLocaleString()}
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
            cancel
          </Button>
          <GradientButton
            onClick={connectWallet}
            disabled={isPurchasing}
            startIcon={isPurchasing ? <CircularProgress size={20} /> : <AccountBalanceWalletIcon />}
          >
            {isPurchasing ? 'Transaction processing...' : 'Confirm purchase'}
          </GradientButton>
        </DialogActions>
      </Dialog>

       {/* ERROR WRITING INITBPS */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

       {/* Successful Purchase Notification*/}
      <Snackbar 
        open={purchaseSuccess} 
        autoHideDuration={6000} 
        onClose={() => setPurchaseSuccess(false)}
      >
        <Alert severity="success" onClose={() => setPurchaseSuccess(false)}>
         Successful purchase! You already have the diamond certificate
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};
export default ProductDetail;