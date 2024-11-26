import { useState } from 'react';
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
  Tooltip
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';

const ConsumerDashboard = () => {
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
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" align="center" gutterBottom 
                    sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            我的钻石证书
          </Typography>
          <Typography align="center" color="text.secondary">
            管理和查看您的钻石证书
          </Typography>
        </Box>

        <Stack spacing={3}>
          {myDiamonds.map((diamond) => (
            <Card key={diamond.id}>
              <CardContent>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <DiamondIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{diamond.id}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          购买日期: {diamond.purchaseDate}
                        </Typography>
                      </Box>
                    </Stack>
                    <Chip 
                      label={diamond.status === 'active' ? '已激活' : '待处理'}
                      color={diamond.status === 'active' ? 'success' : 'warning'}
                    />
                  </Box>

                  <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1 }}>
                    <Typography variant="subtitle2" gutterBottom>钻石详情</Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} 
                           spacing={2} 
                           justifyContent="space-between">
                      <Typography>重量: {diamond.details.weight}克拉</Typography>
                      <Typography>颜色: {diamond.details.color}</Typography>
                      <Typography>净度: {diamond.details.clarity}</Typography>
                      <Typography>切工: {diamond.details.cut}</Typography>
                    </Stack>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">
                      证书编号: {diamond.certificateNo}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="下载证书">
                        <IconButton 
                          onClick={() => handleDownloadCertificate(diamond.id)}
                          color="primary"
                        >
                          <DownloadIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="分享">
                        <IconButton 
                          onClick={() => handleShare(diamond.id)}
                          color="primary"
                        >
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="查看二维码">
                        <IconButton color="primary">
                          <QrCodeIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<QrCodeIcon />}
            size="large"
            onClick={() => console.log('Navigate to verify page')}
          >
            验证新钻石
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ConsumerDashboard;