import { useState } from 'react';
import { styled } from '@mui/material/styles';
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
  Fade,
  Zoom
} from '@mui/material';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimelineIcon from '@mui/icons-material/Timeline';
import SearchIcon from '@mui/icons-material/Search';

// 自定义样式组件
const GlassContainer = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.1)',
    '&:hover fieldset': {
      borderColor: '#89CFF0',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#89CFF0',
    },
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  border: 0,
  borderRadius: 12,
  boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
  color: 'white',
  height: 56,
  padding: '0 30px',
  '&:hover': {
    background: 'linear-gradient(45deg, #B6E0FF 30%, #89CFF0 90%)',
    transform: 'scale(1.02)',
  },
  transition: 'all 0.3s ease',
}));

const ResultCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Verify = () => {
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);

  const handleVerify = () => {
    if (searchId) {
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
    }
  };

  return (
    <Container maxWidth="md">
      <Fade in timeout={1000}>
        <GlassContainer elevation={3} sx={{ mt: 4 }}>
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              mb: 4,
              background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            钻石真实性验证
          </Typography>

          <Box sx={{ my: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <StyledTextField
                fullWidth
                label="输入钻石ID或证书编号"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                variant="outlined"
              />
              <GradientButton
                startIcon={<QrCodeScannerIcon />}
                onClick={() => setShowScanner(!showScanner)}
              >
                扫描二维码
              </GradientButton>
            </Stack>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <GradientButton
                onClick={handleVerify}
                disabled={!searchId}
                startIcon={<SearchIcon />}
              >
                验证真实性
              </GradientButton>
            </Box>
          </Box>

          {verificationResult && (
            <Stack spacing={3}>
              <Zoom in timeout={500}>
                <ResultCard>
                  <CardContent>
                    <Stack spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <VerifiedIcon sx={{ color: '#89CFF0', fontSize: 30 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                          验证结果
                        </Typography>
                      </Box>
                      <Divider sx={{ borderColor: 'rgba(137, 207, 240, 0.2)' }} />
                      <Box>
                        <Chip 
                          label={verificationResult.isAuthentic ? "认证通过" : "验证失败"}
                          sx={{ 
                            mb: 3,
                            p: 2,
                            fontWeight: 'bold',
                            background: verificationResult.isAuthentic ? 
                              'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)' : 
                              'linear-gradient(45deg, #ff9999 30%, #ff6666 90%)',
                            color: 'white'
                          }}
                        />
                        <Stack spacing={2}>
                          {Object.entries(verificationResult.details).map(([key, value]) => (
                            <Box key={key} sx={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              p: 1,
                              borderRadius: 1,
                              '&:hover': { bgcolor: 'rgba(137, 207, 240, 0.1)' }
                            }}>
                              <Typography color="text.secondary">
                                {key === 'manufacturer' ? '制造商' :
                                 key === 'manufactureDate' ? '制造日期' :
                                 key === 'weight' ? '重量' :
                                 key === 'color' ? '颜色' :
                                 key === 'clarity' ? '净度' :
                                 key === 'cut' ? '切工' :
                                 key === 'certificateNo' ? '证书编号' : key}
                              </Typography>
                              <Typography sx={{ fontWeight: 'bold' }}>{value}</Typography>
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </ResultCard>
              </Zoom>

              <Zoom in timeout={700}>
                <ResultCard>
                  <CardContent>
                    <Stack spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <TimelineIcon sx={{ color: '#89CFF0', fontSize: 30 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                          生命周期记录
                        </Typography>
                      </Box>
                      <Divider sx={{ borderColor: 'rgba(137, 207, 240, 0.2)' }} />
                      <Stack spacing={2}>
                        {verificationResult.history.map((item, index) => (
                          <Box key={index} sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            p: 2,
                            borderRadius: 2,
                            '&:hover': { 
                              bgcolor: 'rgba(137, 207, 240, 0.1)',
                              transform: 'translateX(10px)',
                            },
                            transition: 'all 0.3s ease'
                          }}>
                            <Typography sx={{ fontWeight: 'bold' }}>{item.event}</Typography>
                            <Typography sx={{ color: '#666' }}>{item.date}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Stack>
                  </CardContent>
                </ResultCard>
              </Zoom>
            </Stack>
          )}
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default Verify;