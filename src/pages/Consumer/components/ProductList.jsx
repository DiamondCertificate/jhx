import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { 
  Container, 
  Typography, 
  Box,
  Stack, 
  TextField, 
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fade,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';
import { styled } from '@mui/material/styles';
import deployedAddresses from '../../config/deployedAddresses.json';
import DiamondTraceabilityNFT from '../../config/DiamondTraceabilityNFT.json';


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

const ProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      DiamondTraceabilityNFT.abi,
      deployedAddresses.DiamondTraceabilityNFT
    );

    async function fetchProducts() {
      try {
        const productIds = await contract.methods.getAllProductIds().call();
        const productDetails = await Promise.all(
          productIds.map(async (id) => {
            const details = await contract.methods.getDiamondDetails(id).call();
            return {
              id,
              name: details.name || 'Unknown Diamond',
              description: `${details.weight} carat ${details.color} color ${details.clarity} clarity ${details.cut} cut`,
              price: Web3.utils.fromWei(details.price, 'ether'),
              imageUrl: 'https://example.com/image1.jpg', // Placeholder image URL
              certificateId: details.certificateNo,
              contractAddress: deployedAddresses.DiamondTraceabilityNFT,
            };
          })
        );
        setProducts(productDetails);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/consumer/products/${productId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <StyledContainer maxWidth="lg">
      <Typography 
        variant="h3" 
        align="center" 
        sx={{ 
          mb: 6,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Selected jewelry
      </Typography>

      <Stack spacing={4}>
        {/* Search and Sorting Area */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={2}
          sx={{ mb: 4 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Searching for jewelry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: { md: 2 },
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }
            }}
          />
          <FormControl sx={{ flex: { md: 1 } }}>
            <InputLabel>sortord</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="sortord"
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <MenuItem value="recommended">Recommend </MenuItem>
              <MenuItem value="price_asc">Prices range from low to high</MenuItem>
              <MenuItem value="price_desc">Prices go from high to low</MenuItem>
              <MenuItem value="newest">New </MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Product list area */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4,
          justifyContent: 'center'
        }}>
          {products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((product) => (
            <Fade in timeout={500} key={product.id}>
              <Box sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 32px)', md: 'calc(33.333% - 32px)' },
                minWidth: { xs: '280px', sm: '320px' }
              }}>
                <ProductCard 
                  product={product} 
                  onClick={() => handleProductClick(product.id)}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      </Stack>
    </StyledContainer>
  );
};

export default ProductList;
