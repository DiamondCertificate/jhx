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
  Fade,
  Zoom,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

import { connectBlockchain, getContracts } from './utils/contract'; // 引入合约相关的功能

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

const ManufacturerDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const features = [
    {
      icon: <DiamondIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Creating a certificate",
      description: "Create digital certificates for new jewelry",
      path: "/manufacturer/create",
      onClick: async () => await handleCreateCertificate(),
    },
    {
      icon: <SwapHorizIcon sx={{ fontSize: 40, color: 'white' }} />,
      title: "Life cycle tracking",
      description: "Check and update the status of the jewelry",
      path: "/manufacturer/track",
      onClick: async () => await handleTrackLifeCycle(),
    }
  ];

  // 连接到智能合约并初始化
  const handleConnectBlockchain = async () => {
    try {
      setLoading(true);
      const contracts = await connectBlockchain();  // 连接到区块链
      const { diamondContract, accessControlContract } = getContracts();

      console.log("Connected to contracts:", contracts);
      return contracts; // 返回合约实例
    } catch (error) {
      console.error("Blockchain connection error:", error);
      setError('Failed to connect to blockchain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 创建证书的功能（连接到智能合约）
  const handleCreateCertificate = async () => {
    try {
      setLoading(true);
      await handleConnectBlockchain();  // 确保区块链连接

      // 调用合约方法来创建证书
      const { diamondContract } = getContracts();
      // 假设合约需要传递钻石的详细信息来生成证书
      const certificate = await diamondContract.issueCertificate("1", "Manufacturer A"); // 示例
      console.log("Certificate Created:", certificate);
      // 如果证书创建成功，跳转到某个页面或者显示消息
      navigate('/manufacturer/success');
    } catch (error) {
      setError('Failed to create certificate. Please try again.');
      console.error("Create certificate error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 钻石生命周期跟踪的功能
  const handleTrackLifeCycle = async () => {
    try {
      setLoading(true);
      await handleConnectBlockchain();

      const { diamondContract } = getContracts();
      // 假设需要查询某个钻石的生命周期
      const diamondLifecycle = await diamondContract.getDiamondLifecycle(1);  // 示例：查询 ID 为 1 的钻石生命周期
      console.log("Diamond Lifecycle:", diamondLifecycle);
      // 显示生命周期信息，或者跳转到相关页面
    } catch (error) {
      setError('Failed to track diamond life cycle. Please try again.');
      console.error("Track life cycle error:", error);
    } finally {
      setLoading(false);
    }
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
            Manufacturer's Center
          </Typography>
          <Typography 
            align="center" 
            sx={{ 
              mb: 6,
              color: '#666',
              fontSize: '1.1rem'
            }}
          >
            Choose the services you need.
          </Typography>

          {/* Loading state */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error message */}
          {error && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <Typography sx={{ color: 'red' }}>{error}</Typography>
            </Box>
          )}

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mb: 4
          }}>
            {features.map((feature, index) => (
              <Zoom in timeout={500 + index * 200} key={index}>
                <FeatureCard onClick={feature.onClick} sx={{ flex: 1 }}>
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
