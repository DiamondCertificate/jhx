import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Container,
  Paper,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';

// 自定义样式组件
const GlassContainer = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const DiamondCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  border: 0,
  borderRadius: 12,
  boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
  color: 'white',
  padding: '10px 30px',
  '&:hover': {
    background: 'linear-gradient(45deg, #B6E0FF 30%, #89CFF0 90%)',
    transform: 'scale(1.02)',
  },
  transition: 'all 0.3s ease',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(137, 207, 240, 0.1)',
  '&:hover': {
    background: 'rgba(137, 207, 240, 0.2)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
}));

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const [myDiamonds] = useState([
    {
      id: 'DIA001',
      purchaseDate: '2024-01-15',
      details: {
        weight: '1.5',
        color: 'D',
        clarity: 'VVS1',
        cut: 'Excellent'
      },
      certificateNo: 'GIA2196152152',
      status: 'active'
    },
    {
      id: 'DIA002',
      purchaseDate: '2024-02-01',
      details: {
        weight: '2.0',
        color: 'E',
        clarity: 'VS1',
        cut: 'Very Good'
      },
      certificateNo: 'GIA2196152153',
      status: 'pending'
    }
  ]);

  const handleDownloadCertificate = (diamondId) => {
    console.log('Downloading certificate for:', diamondId);
  };

  const handleShare = (diamondId) => {
    console.log('Sharing certificate for:', diamondId);
  };

  return (
    <Container maxWidth="md">
      <Fade in timeout={1000}>
        <GlassContainer elevation={3} sx={{ mt: 4 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 2,
              background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            我的钻石证书
          </Typography>
          <Typography 
            align="center" 
            sx={{ 
              mb: 4,
              color: '#666',
              fontSize: '1.1rem'
            }}
          >
            管理和查看您的钻石证书
          </Typography>

          <Stack spacing={3}>
            {myDiamonds.map((diamond, index) => (
              <Zoom in timeout={500 + index * 200} key={diamond.id}>
                <DiamondCard>
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar 
                            sx={{ 
                              bgcolor: 'transparent',
                              background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
                              width: 56,
                              height: 56
                            }}
                          >
                            <DiamondIcon sx={{ fontSize: 30, color: 'white' }} />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                              {diamond.id}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              购买日期: {diamond.purchaseDate}
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip 
                          label={diamond.status === 'active' ? '已激活' : '待处理'}
                          sx={{ 
                            background: diamond.status === 'active' ? 
                              'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)' : 
                              'linear-gradient(45deg, #FFB347 30%, #FFE0B2 90%)',
                            color: 'white',
                            fontWeight: 'bold',
                            px: 2
                          }}
                        />
                      </Box>

                      <Box sx={{ 
                        bgcolor: 'rgba(137, 207, 240, 0.1)', 
                        p: 3, 
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(137, 207, 240, 0.15)',
                        },
                        transition: 'background-color 0.3s ease'
                      }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                          钻石详情
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} 
                               spacing={3} 
                               justifyContent="space-between">
                          <Box>
                            <Typography color="text.secondary">重量</Typography>
                            <Typography fontWeight="bold">{diamond.details.weight}克拉</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">颜色</Typography>
                            <Typography fontWeight="bold">{diamond.details.color}</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">净度</Typography>
                            <Typography fontWeight="bold">{diamond.details.clarity}</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">切工</Typography>
                            <Typography fontWeight="bold">{diamond.details.cut}</Typography>
                          </Box>
                        </Stack>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          证书编号: {diamond.certificateNo}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="下载证书">
                            <StyledIconButton onClick={() => handleDownloadCertificate(diamond.id)}>
                              <DownloadIcon sx={{ color: '#89CFF0' }} />
                            </StyledIconButton>
                          </Tooltip>
                          <Tooltip title="分享">
                            <StyledIconButton onClick={() => handleShare(diamond.id)}>
                              <ShareIcon sx={{ color: '#89CFF0' }} />
                            </StyledIconButton>
                          </Tooltip>
                          <Tooltip title="查看二维码">
                            <StyledIconButton>
                              <QrCodeIcon sx={{ color: '#89CFF0' }} />
                            </StyledIconButton>
                          </Tooltip>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </DiamondCard>
              </Zoom>
            ))}
          </Stack>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <GradientButton
              startIcon={<QrCodeIcon />}
              size="large"
              onClick={() => navigate('/consumer/verify')}
            >
              验证新钻石
            </GradientButton>
          </Box>
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default ConsumerDashboard;