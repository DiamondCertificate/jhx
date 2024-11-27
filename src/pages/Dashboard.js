import { Container, Card, CardContent, Typography, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import FactoryIcon from '@mui/icons-material/Factory';

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
  width: 120,
  height: 120,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
}));

const Dashboard = () => {
  const navigate = useNavigate();

  const roles = [
    {
      icon: <PersonIcon sx={{ fontSize: 60, color: 'white' }} />,
      title: "Consumer",
      description: "Choosing Your Own Diamond",
      path: "/consumer",
      gradient: "linear-gradient(135deg, #89CFF0 0%, #B6E0FF 100%)"
    },
    {
      icon: <FactoryIcon sx={{ fontSize: 60, color: 'white' }} />,
      title: "Manufacturer",
      description: "Create New Jewelry Profile",
      path: "/manufacturer",
      gradient: "linear-gradient(135deg, #B6E0FF 0%, #89CFF0 100%)"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ 
      mt: 8, 
      mb: 4,
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Typography 
        variant="h2" 
        align="center" 
        sx={{ 
          mb: 8,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Jewelry Trading System
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 6,
        maxWidth: '1000px',
        mx: 'auto'
      }}>
        {roles.map((role, index) => (
          <GlassCard 
            key={index} 
            onClick={() => navigate(role.path)}
            sx={{ flex: 1 }}
          >
            <CardContent sx={{ 
              flexGrow: 1, 
              textAlign: 'center',
              p: 6,
            }}>
              <IconWrapper>
                {role.icon}
              </IconWrapper>
              <Typography 
                gutterBottom 
                variant="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  color: '#1a237e',
                  mb: 3
                }}
              >
                {role.title}
              </Typography>
              <Typography 
                variant="h6"
                sx={{
                  color: '#666',
                  lineHeight: 1.6
                }}
              >
                {role.description}
              </Typography>
            </CardContent>
          </GlassCard>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;