import { useState } from 'react';
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

  // 模拟商品数据
  const products = [
    {
      id: '1',
      name: '璀璨之心钻石项链',
      description: '1克拉 D色 VVS1净度 完美切工',
      price: 99999,
      imageUrl: 'https://example.com/image1.jpg',
      certificateId: 'GIA2196152152',
      contractAddress: '0x123...abc'
    },
    // 添加更多商品...
  ];

  const handleProductClick = (productId) => {
    navigate(`/consumer/products/${productId}`);
  };

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
        精选珠宝
      </Typography>

      <Stack spacing={4}>
        {/* 搜索和排序区域 */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={2}
          sx={{ mb: 4 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="搜索珠宝..."
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
            <InputLabel>排序方式</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="排序方式"
              sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 2,
              }}
            >
              <MenuItem value="recommended">推荐</MenuItem>
              <MenuItem value="price_asc">价格从低到高</MenuItem>
              <MenuItem value="price_desc">价格从高到低</MenuItem>
              <MenuItem value="newest">最新上架</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* 商品列表区域 */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4,
          justifyContent: 'center'
        }}>
          {products.map((product) => (
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