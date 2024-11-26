import { Container, Card, CardContent, Typography, Box, Stack } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimelineIcon from '@mui/icons-material/Timeline';

const Dashboard = () => {
  const features = [
    {
      icon: <DiamondIcon sx={{ fontSize: 40 }} />,
      title: "证书创建",
      description: "为钻石创建唯一的数字证书"
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 40 }} />,
      title: "真实性验证",
      description: "验证钻石证书的真实性"
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: "生命周期追踪",
      description: "追踪钻石的完整生命周期"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4 }}>
        钻石认证系统
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 3
      }}>
        {features.map((feature, index) => (
          <Box key={index} sx={{ flex: 1 }}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              '&:hover': {
                transform: 'translateY(-5px)',
                transition: 'transform 0.3s'
              }
            }}>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2, color: 'primary.main' }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
      
      {/* 可选：使用 Stack 组件的版本 */}
      {/* <Stack 
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
      >
        {features.map((feature, index) => (
          <Card key={index} sx={{ 
            flex: 1,
            height: '100%', 
            '&:hover': {
              transform: 'translateY(-5px)',
              transition: 'transform 0.3s'
            }
          }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ mb: 2, color: 'primary.main' }}>
                {feature.icon}
              </Box>
              <Typography gutterBottom variant="h5" component="h2">
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack> */}
    </Container>
  );
};

export default Dashboard;