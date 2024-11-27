import { Container, Card, CardContent, Typography, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimelineIcon from '@mui/icons-material/Timeline';

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    background: 'rgba(255, 255, 255, 0.35)',
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

const Dashboard = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <DiamondIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Certificate Creation",
      description: "Create a unique digital certificate for your diamond",
      path: "/manufacturer/create",
      gradient: "linear-gradient(135deg, #89CFF0 0%, #B6E0FF 100%)"
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Authenticity Verification",
      description: "Verify the authenticity of your diamond certificate",
      path: "/consumer/verify",
      gradient: "linear-gradient(135deg, #B6E0FF 0%, #89CFF0 100%)"
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Lifecycle Tracking",
      description: "Track the entire life cycle of your diamond",
      path: "/lifecycle/track",
      gradient: "linear-gradient(135deg, #89CFF0 0%, #B6E0FF 100%)"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
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
        Welcome to the Diamond Certification System
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4
      }}>
        {features.map((feature, index) => (
          <GlassCard 
            key={index} 
            onClick={() => navigate(feature.path)}
            sx={{ flex: 1 }}
          >
            <CardContent sx={{ 
              flexGrow: 1, 
              textAlign: 'center',
              p: 4,
            }}>
              <IconWrapper>
                {feature.icon}
              </IconWrapper>
              <Typography 
                gutterBottom 
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
          </GlassCard>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;