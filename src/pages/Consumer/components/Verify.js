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
import SearchIcon from '@mui/icons-material/Search';

import { getDiamondDetails, verifyDiamond } from './utils/contract';  // 引入合约方法

// Custom Style Component
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

  // 处理验证按钮点击
  const handleVerify = async () => {
    if (searchId) {
      try {
        // 从合约获取钻石详情
        const diamondDetails = await getDiamondDetails(searchId);
        
        // 验证钻石的真实性
        const isAuthentic = await verifyDiamond(searchId);

        setVerificationResult({
          id: searchId,
          isAuthentic: isAuthentic,
          details: diamondDetails,
          history: diamondDetails.operations || []  // 从合约返回的历史记录
        });
      } catch (error) {
        console.error("Error verifying diamond:", error);
        setVerificationResult(null);
      }
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
            Diamond Authenticity Verification
          </Typography>

          <Box sx={{ my: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <StyledTextField
                fullWidth
                label="Enter diamond ID or certificate number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                variant="outlined"
              />
              <GradientButton
                startIcon={<QrCodeScannerIcon />}
                onClick={() => setShowScanner(!showScanner)}
              >
                Scan QR code
              </GradientButton>
            </Stack>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <GradientButton
                onClick={handleVerify}
                disabled={!searchId}
                startIcon={<SearchIcon />}
              >
                Verify Authenticity
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
                          Verify result
                        </Typography>
                      </Box>
                      <Divider sx={{ borderColor: 'rgba(137, 207, 240, 0.2)' }} />
                      <Box>
                        <Chip 
                          label={verificationResult.isAuthentic ? "Certification Passed" : "Certification Failed"}
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
                                {key === 'manufacturer' ? 'Manufacturer' :
                                 key === 'manufactureDate' ? 'Manufacture Date' :
                                 key === 'weight' ? 'Weight' :
                                 key === 'color' ? 'Color' :
                                 key === 'clarity' ? 'Clarity' :
                                 key === 'cut' ? 'Cut' :
                                 key === 'certificateNo' ? 'Certificate No' : key}
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
            </Stack>
          )}
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default Verify;
