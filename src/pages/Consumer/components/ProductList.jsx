import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ProductCard from './ProductCard';
import { styled } from '@mui/material/styles';
import { getAllDiamonds, purchaseDiamond } from './utils/contract';  // 引入合约方法

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
  const [products, setProducts] = useState([]);  // 保存从合约获取的商品数据
  const [error, setError] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  // 获取所有钻石信息
  useEffect(() => {
    const fetchDiamonds = async () => {
      try {
        const diamonds = await getAllDiamonds();  // 从合约获取商品数据
        setProducts(diamonds);
      } catch (err) {
        setError('Failed to fetch diamonds');
      }
    };

    fetchDiamonds();
  }, []);

  // 处理商品点击事件
  const handleProductClick = (productId) => {
    navigate(`/consumer/products/${productId}`);
  };

  // 处理购买商品
  const handlePurchase = async (product) => {
    try {
      await purchaseDiamond(product.id, product.price);  // 调用合约进行购买
      setPurchaseSuccess(true);
    } catch (err) {
      setError('Purchase failed');
    }
  };

  // 处理搜索功能
  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 处理排序功能（示例：按价格排序）
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price_asc') {
      return a.price - b.price;
    } else if (sortBy === 'price_desc') {
      return b.price - a.price;
    } else {
      return 0; // 推荐默认排序
    }
  });

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
              <MenuItem value="recommended">Recommend</MenuItem>
              <MenuItem value="price_asc">Prices range from low to high</MenuItem>
              <MenuItem value="price_desc">Prices go from high to low</MenuItem>
              <MenuItem value="newest">New</MenuItem>
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
          {sortedProducts.map((product) => (
            <Fade in timeout={500} key={product.id}>
              <Box sx={{ 
                width: { xs: '100%', sm: 'calc(50% - 32px)', md: 'calc(33.333% - 32px)' },
                minWidth: { xs: '280px', sm: '320px' }
              }}>
                <ProductCard 
                  product={product} 
                  onClick={() => handleProductClick(product.id)}
                />
                <Button 
                  variant="contained"
                  onClick={() => handlePurchase(product)}  // 点击购买按钮
                >
                  Buy Now
                </Button>
              </Box>
            </Fade>
          ))}
        </Box>
      </Stack>

      {/* Error Snackbar */}
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000}>
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>
      )}

      {/* Success Snackbar */}
      {purchaseSuccess && (
        <Snackbar open={purchaseSuccess} autoHideDuration={6000}>
          <Alert severity="success" onClose={() => setPurchaseSuccess(false)}>
            Purchase successful!
          </Alert>
        </Snackbar>
      )}
    </StyledContainer>
  );
};

export default ProductList;
