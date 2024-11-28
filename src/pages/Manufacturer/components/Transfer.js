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
      
      // Simulating API Call Delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (searchId) {
        // Simulation verification results
        setVerificationResult({
          id: searchId,
          isAuthentic: true,
          details: {
            manufacturer: "XXX Jewelry Company",
            manufactureDate: "2024-01-15",
            weight: "1.5",
            color: "D",
            clarity: "VVS1",
            cut: "Excellent",
            certificateNo: "GIA2196152152"
          },
          history: [
            { date: "2024-01-01", event: "Mine" },
            { date: "2024-01-10", event: "Cut and Polish" },
            { date: "2024-01-15", event: "Authenticate" },
            { date: "2024-01-20", event: "Manufacture" }
          ]
        });
      } else {
        setError('Please enter the diamond ID or certificate number');
      }
    } catch (err) {
      setError('An error occurred during verification, please try again');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom 
                  sx={{ color: '#2E7D32', fontWeight: 'bold' }}
        >
          Diamond Authenticity Verification
        </Typography>

        <Box sx={{ my: 4 }}>
          <Stack spacing={2}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Enter diamond ID or certificate number"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                startIcon={<QrCodeScannerIcon />}
                sx={{ height: 56 }}
              >
                Scan QR code
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
              {loading ? 'Under verification...' : 'Verify Authenticity'}
            </Button>
          </Stack>
        </Box>

        {verificationResult && (
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <VerifiedIcon color="success" />
                  <Typography variant="h6">Verify result</Typography>
                </Stack>
                <Divider />
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={verificationResult.isAuthentic ? "Certification Passed" : "Certification Failed"} 
                    color={verificationResult.isAuthentic ? "success" : "error"}
                    sx={{ mb: 2 }}
                  />
                  <Stack spacing={2}>
                    {Object.entries(verificationResult.details).map(([key, value]) => (
                      <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography color="text.secondary">
                          {key === 'manufacturer' ? 'manufacturer' :
                           key === 'manufactureDate' ? 'manufactureDate' :
                           key === 'weight' ? 'weight' :
                           key === 'color' ? 'color' :
                           key === 'clarity' ? 'clarity' :
                           key === 'cut' ? 'cut' :
                           key === 'certificateNo' ? 'certificateNo' : key}
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
                  <Typography variant="h6">Life Cycle Records</Typography>
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