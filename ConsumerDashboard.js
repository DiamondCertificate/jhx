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
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';

// Custom style components
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
  const features = [
    {
      icon: <ShoppingBagIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Purchase Jewelry",
      description: "Browse and purchase certified jewelry",
      path: "/consumer/products"
    },
    {
      icon: <SearchIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Verify authenticity",
      description: "Verify the authenticity of the diamond certificate",
      path: "/consumer/verify"
    },
    {
      icon: <DiamondIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "My Certificates",
      description: "Check my diamond certificate",
      path: "/consumer/certificates"
    }
  ];
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
            Consumer Center
          </Typography>
          <Typography 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#666',
              fontSize: '1.1rem'
            }}
          >
            Pick or View your Jewelry
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

export default ConsumerDashboard;