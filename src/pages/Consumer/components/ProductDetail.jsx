import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
  Zoom
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import VerifiedIcon from '@mui/icons-material/Verified';
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

const ProductDetail = () => {
  const { id } = useParams();
  
  // 模拟商品数据
  const product = {
    id,
    name: '璀璨之心钻石项链',
    description: '精心打造的心形钻石项链，璀璨夺目',
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
      { label: '钻石重量', value: '1.00克拉' },
      { label: '颜色', value: 'D色' },
      { label: '净度', value: 'VVS1' },
      { label: '切工', value: 'Excellent' },
      { label: '材质', value: '18K白金' },
      { label: '链长', value: '45cm' }
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

              <GlassCard>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VerifiedIcon sx={{ color: '#89CFF0' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        证书信息
                      </Typography>
                    </Box>
                    <Divider />
                    {Object.entries(product.certificate).map(([key, value]) => (
                      <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">
                          {key === 'id' ? '证书编号' :
                           key === 'weight' ? '重量' :
                           key === 'color' ? '颜色' :
                           key === 'clarity' ? '净度' :
                           key === 'cut' ? '切工' :
                           key === 'issueDate' ? '发证日期' : key}
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
                      查看链上信息
                    </Link>
                  </Stack>
                </CardContent>
              </GlassCard>

              <GlassCard>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    商品规格
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
    </StyledContainer>
  );
};

export default ProductDetail;