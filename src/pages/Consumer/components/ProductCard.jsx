import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, styled, Chip, Button } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { getContracts } from '../utils/contract';  // 引入合约交互方法

// Custom styled components
const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  cursor: 'pointer',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const CertifiedBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  color: 'white',
  fontWeight: 'bold',
}));

const ProductCard = ({ product, onClick }) => {
  const [diamondData, setDiamondData] = useState(null);
  const [diamondPrice, setDiamondPrice] = useState(0);
  const [isCertified, setIsCertified] = useState(false);

  // 获取钻石信息
  useEffect(() => {
    async function fetchDiamondData() {
      const contracts = await getContracts(); // 获取合约实例
      if (contracts && product.id) {
        const { diamondContract } = contracts;
        
        try {
          // 获取钻石的详细信息
          const diamondDetails = await diamondContract.getDiamondDetails(product.id); // 获取钻石详细信息
          const price = await diamondContract.getDiamondPrice(product.id); // 获取钻石价格
          const certified = await diamondContract.verifyOwnership(product.id); // 验证钻石认证

          setDiamondData(diamondDetails);
          setDiamondPrice(price);
          setIsCertified(certified);
        } catch (error) {
          console.error('Error fetching diamond data:', error);
        }
      }
    }
    
    fetchDiamondData();
  }, [product.id]);

  const handleCardClick = async () => {
    // 触发合约方法，例如验证钻石的真实性
    console.log(`Clicked on diamond ${product.id}`);
    if (onClick) {
      onClick(product.id);
    }
  };

  const handleBuyDiamond = async () => {
    // 调用购买钻石合约方法
    if (diamondPrice > 0) {
      console.log(`Buying diamond ${product.id} for ${diamondPrice}`);
      const contracts = await getContracts();
      const { diamondContract } = contracts;
      await diamondContract.buyDiamond(product.id, { value: diamondPrice }); // 执行购买操作
    }
  };

  return (
    <StyledCard onClick={handleCardClick}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={diamondData ? diamondData.imageUrl : product.imageUrl}  // 动态加载合约数据中的图像
          alt={product.name}
        />
        <CertifiedBadge
          icon={<VerifiedIcon />}
          label={isCertified ? "Certified" : "Unverified"}
        />
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {diamondData ? diamondData.description : product.description}
        </Typography>
        <Typography variant="h5" sx={{ 
          color: '#1a237e',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ¥ {diamondPrice ? diamondPrice.toLocaleString() : product.price.toLocaleString()}
        </Typography>

        {/* 买钻石按钮 */}
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={handleBuyDiamond}
        >
          Buy Diamond
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
