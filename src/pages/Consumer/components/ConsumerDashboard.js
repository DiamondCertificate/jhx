import React, { useState, useEffect } from "react";
import { connectBlockchain, getAllDiamonds, updateDiamondStatus } from "../utils/contract"; // 导入合约交互方法
import { Container, Typography, Box, Fade, Card, CardContent, Button, Chip } from '@mui/material'; 
import { styled } from '@mui/material/styles';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import { useNavigate } from 'react-router-dom';

// Custom styled components
const GlassContainer = styled(Card)(({ theme }) => ({
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

const ConsumerDashboard = () => {
  const navigate = useNavigate();
  const [diamonds, setDiamonds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Features for navigation (these are unchanged)
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

  // Fetching diamond data from smart contract
  useEffect(() => {
    async function fetchDiamonds() {
      const contracts = await connectBlockchain(); // 连接合约
      if (contracts) {
        const diamondsData = await getAllDiamonds(); // 获取所有钻石数据
        setDiamonds(diamondsData);
        setLoading(false);
      }
    }

    fetchDiamonds();
  }, []);

  // Download certificate functionality
  const handleDownloadCertificate = (diamondId) => {
    console.log('Downloading certificate for:', diamondId);
  };

  // Share certificate functionality
  const handleShare = (diamondId) => {
    console.log('Sharing certificate for:', diamondId);
  };

  // Update diamond status functionality
  const handleUpdateStatus = async (diamondId, newStatus) => {
    await updateDiamondStatus(diamondId, newStatus); // 更新钻石状态
    console.log(`Diamond ${diamondId} status updated to: ${newStatus}`);
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
            Consumer Dashboard
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
          
          {/* Features Section (unchanged) */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: 4
          }}>
            {features.map((feature, index) => (
              <Card onClick={() => navigate(feature.path)} sx={{ flex: 1 }} key={index}>
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box sx={{
                    width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', marginBottom: 3,
                    background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
                    boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e', mb: 2 }}>{feature.title}</Typography>
                  <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.6 }}>{feature.description}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Diamonds Section (added functionality) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {loading ? (
              <Typography variant="h5" align="center">Loading your diamonds...</Typography>
            ) : (
              diamonds.map((diamond, index) => (
                <DiamondCard key={index} sx={{ mb: 3 }}>
                  <CardContent>
                    <Typography variant="h5">{`Diamond ${diamond.id}`}</Typography>
                    <Typography variant="body1">Purchase Date: {diamond.purchaseDate}</Typography>
                    <Typography variant="body1">Weight: {diamond.details.weight} ct</Typography>
                    <Typography variant="body1">Color: {diamond.details.color}</Typography>
                    <Typography variant="body1">Clarity: {diamond.details.clarity}</Typography>
                    <Typography variant="body1">Cut: {diamond.details.cut}</Typography>

                    <Box sx={{ mt: 2 }}>
                      <Chip label={`Status: ${diamond.status}`} color={diamond.status === 'active' ? 'success' : 'warning'} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={() => handleDownloadCertificate(diamond.id)}
                      >
                        Download Certificate
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<ShareIcon />}
                        onClick={() => handleShare(diamond.id)}
                      >
                        Share Certificate
                      </Button>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleUpdateStatus(diamond.id, 'inactive')}
                      >
                        Mark as Inactive
                      </Button>
                    </Box>
                  </CardContent>
                </DiamondCard>
              ))
            )}
          </Box>
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default ConsumerDashboard;
