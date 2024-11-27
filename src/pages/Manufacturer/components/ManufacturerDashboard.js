import { styled } from '@mui/material/styles';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Fade,
  Zoom
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const GlassContainer = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
}));

const ManufacturerDashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <DiamondIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "创建证书",
      description: "为新的珠宝创建数字证书",
      path: "/manufacturer/create"
    },
    {
      icon: <SwapHorizIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "生命周期追踪",
      description: "查询并更新珠宝的状态",
      path: "/Lifecycle/track"
    }
  ];

  return (
    <Container maxWidth="lg">
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
            制造商中心
          </Typography>
          <Typography 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#666',
              fontSize: '1.1rem'
            }}
          >
            选择您需要的服务
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: 4
          }}>
            {features.map((feature, index) => (
              <Zoom in timeout={500 + index * 200} key={index}>
                <FeatureCard onClick={() => navigate(feature.path)} sx={{ flex: 1 }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <IconWrapper>
                      {feature.icon}
                    </IconWrapper>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: '#1a237e',
                        mb: 2
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1"
                      sx={{
                        color: '#666',
                        lineHeight: 1.6
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Zoom>
            ))}
          </Box>
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default ManufacturerDashboard;