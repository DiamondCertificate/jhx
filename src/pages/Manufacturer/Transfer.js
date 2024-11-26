import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  Divider,
  Chip,
  Alert
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimelineIcon from '@mui/icons-material/Timeline';

const Verify = () => {
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError('');
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (searchId) {
        // 模拟验证结果
        setVerificationResult({
          id: searchId,
          isAuthentic: true,
          details: {
            manufacturer: "XXX珠宝公司",
            manufactureDate: "2024-01-15",
            weight: "1.5",
            color: "D",
            clarity: "VVS1",
            cut: "Excellent",
            certificateNo: "GIA2196152152"
          },
          history: [
            { date: "2024-01-01", event: "开采" },
            { date: "2024-01-10", event: "切割打磨" },
            { date: "2024-01-15", event: "认证" },
            { date: "2024-01-20", event: "制造" }
          ]
        });
      } else {
        setError('请输入钻石ID或证书编号');
      }
    } catch (err) {
      setError('验证过程中出现错误，请重试');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom 
                  sx={{ color: '#2E7D32', fontWeight: 'bold' }}>
          钻石真实性验证
        </Typography>

        <Box sx={{ my: 4 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="输入钻石ID或证书编号"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<QrCodeScannerIcon />}
                sx={{ height: 56 }}
              >
                扫描二维码
              </Button>
            </Stack>

            {error && (
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleVerify}
              disabled={loading || !searchId}
            >
              {loading ? '验证中...' : '验证真实性'}
            </Button>
          </Stack>
        </Box>

        {verificationResult && (
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <VerifiedIcon color="success" />
                  <Typography variant="h6">验证结果</Typography>
                </Stack>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={verificationResult.isAuthentic ? "认证通过" : "验证失败"} 
                    color={verificationResult.isAuthentic ? "success" : "error"}
                    sx={{ mb: 2 }}
                  />
                  <Stack spacing={2}>
                    {Object.entries(verificationResult.details).map(([key, value]) => (
                      <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">
                          {key === 'manufacturer' ? '制造商' :
                           key === 'manufactureDate' ? '制造日期' :
                           key === 'weight' ? '重量' :
                           key === 'color' ? '颜色' :
                           key === 'clarity' ? '净度' :
                           key === 'cut' ? '切工' :
                           key === 'certificateNo' ? '证书编号' : key}:
                        </Typography>
                        <Typography>{value}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <TimelineIcon color="primary" />
                  <Typography variant="h6">生命周期记录</Typography>
                </Stack>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  {verificationResult.history.map((item, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      mb: 1,
                      p: 1,
                      '&:hover': { bgcolor: 'action.hover' }
                    }}>
                      <Typography>{item.event}</Typography>
                      <Typography color="text.secondary">{item.date}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default Verify;