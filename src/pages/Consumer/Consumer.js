// 美化版的消费者验证页面
import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Chip
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VerifiedIcon from '@mui/icons-material/Verified';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  }
}));

const VerifyPage = () => {
  const [verificationResult, setVerificationResult] = useState(null);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom 
                  sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
          钻石证书验证
        </Typography>

        <Box sx={{ my: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="输入钻石ID或证书编号"
                variant="outlined"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<QrCodeScannerIcon />}
                sx={{ height: '56px' }}
              >
                扫描二维码
              </Button>
            </Grid>
          </Grid>
        </Box>

        {verificationResult && (
          <StyledCard>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <VerifiedIcon sx={{ color: 'success.main', mr: 1 }} />
                <Typography variant="h6">验证结果</Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">证书编号</Typography>
                  <Typography variant="body1">DC123456789</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">发行日期</Typography>
                  <Typography variant="body1">2024-01-01</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Chip label="已验证" color="success" />
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        )}
      </Paper>
    </Container>
  );
};

export default VerifyPage;