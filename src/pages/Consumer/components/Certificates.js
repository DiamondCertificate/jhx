import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Import ethers.js for interacting with the blockchain
import { styled } from '@mui/material/styles';
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
  Tooltip,
  Fade,
  Zoom
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';

// Import the ABI and the deployed addresses for the smart contracts
import deployedAddresses from '../../config/deployedAddresses.json';
import DiamondTraceabilityNFT from '../../config/DiamondTraceabilityNFT.json';

const DiamondTraceabilityNFTABI = DiamondTraceabilityNFT.abi; // Ensure the path is correct for the ABI file

// Initialize Ethereum provider and contract instance
let provider, signer, diamondContract;

if (typeof window.ethereum !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  diamondContract = new ethers.Contract(deployedAddresses.DiamondTraceabilityNFT, DiamondTraceabilityNFTABI, signer);
}

// Custom style components
const GlassContainer = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const DiamondCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  border: 0,
  borderRadius: 12,
  boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
  color: 'white',
  padding: '10px 30px',
  '&:hover': {
    background: 'linear-gradient(45deg, #B6E0FF 30%, #89CFF0 90%)',
    transform: 'scale(1.02)',
  },
  transition: 'all 0.3s ease',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(137, 207, 240, 0.1)',
  '&:hover': {
    background: 'rgba(137, 207, 240, 0.2)',
    transform: 'scale(1.1)',
  },
  transition: 'all 0.3s ease',
}));

const Certificates = () => {
  const navigate = useNavigate();
  const [myDiamonds, setMyDiamonds] = useState([
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

  useEffect(() => {
    async function fetchDiamonds() {
      if (diamondContract) {
        try {
          const address = await signer.getAddress();
          const diamondIds = await diamondContract.getDiamondsOwnedBy(address);
          const diamondDetails = await Promise.all(
            diamondIds.map(async (id) => {
              const details = await diamondContract.getDiamondDetails(id);
              return {
                id,
                purchaseDate: details.purchaseDate,
                details: {
                  weight: details.weight,
                  color: details.color,
                  clarity: details.clarity,
                  cut: details.cut,
                },
                certificateNo: details.certificateNo,
                status: details.status,
              };
            })
          );
          setMyDiamonds(diamondDetails);
        } catch (error) {
          console.error('Error fetching diamond details:', error);
        }
      }
    }

    fetchDiamonds();
  }, []);

  const handleDownloadCertificate = (diamondId) => {
    console.log('Downloading certificate for:', diamondId);
  };

  const handleShare = (diamondId) => {
    console.log('Sharing certificate for:', diamondId);
  };

  return (
    <Container maxWidth="md">
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
            My Diamond Certificates
          </Typography>
          <Typography 
            align="center" 
            sx={{ 
              mb: 4,
              color: '#666',
              fontSize: '1.1rem'
            }}
          >
            Manage and view your diamond certificates
          </Typography>

          <Stack spacing={3}>
            {myDiamonds.map((diamond, index) => (
              <Zoom in timeout={500 + index * 200} key={diamond.id}>
                <DiamondCard>
                  <CardContent sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar 
                            sx={{ 
                              bgcolor: 'transparent',
                              background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
                              width: 56,
                              height: 56
                            }}
                          >
                            <DiamondIcon sx={{ fontSize: 30, color: 'white' }} />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                              {diamond.id}
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              purchaseDate: {diamond.purchaseDate}
                            </Typography>
                          </Box>
                        </Stack>
                        <Chip 
                          label={diamond.status === 'active' ? 'Already activated' : 'Pending'}
                          sx={{ 
                            background: diamond.status === 'active' ? 
                              'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)' : 
                              'linear-gradient(45deg, #FFB347 30%, #FFE0B2 90%)',
                            color: 'white',
                            fontWeight: 'bold',
                            px: 2
                          }}
                        />
                      </Box>

                      <Box sx={{ 
                        bgcolor: 'rgba(137, 207, 240, 0.1)', 
                        p: 3, 
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(137, 207, 240, 0.15)',
                        },
                        transition: 'background-color 0.3s ease'
                      }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                          Diamond Details
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} 
                               spacing={3} 
                               justifyContent="space-between">
                          <Box>
                            <Typography color="text.secondary">Weight</Typography>
                            <Typography fontWeight="bold">{diamond.details.weight}carats</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">Color</Typography>
                            <Typography fontWeight="bold">{diamond.details.color}</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">Clarity</Typography>
                            <Typography fontWeight="bold">{diamond.details.clarity}</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">Cut</Typography>
                            <Typography fontWeight="bold">{diamond.details.cut}</Typography>
                          </Box>
                        </Stack>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          CertificateNumbers: {diamond.certificateNo}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Tooltip title="Download Certificate">
                            <StyledIconButton onClick={() => handleDownloadCertificate(diamond.id)}>
                              <DownloadIcon sx={{ color: '#89CFF0' }} />
                            </StyledIconButton>
                          </Tooltip>
                          <Tooltip title="Share">
                            <StyledIconButton onClick={() => handleShare(diamond.id)}>
                              <ShareIcon sx={{ color: '#89CFF0' }} />
                            </StyledIconButton>
                          </Tooltip>
                          <Tooltip title="View QR Code">
                            <StyledIconButton>
                              <QrCodeIcon sx={{ color: '#89CFF0' }} />
                            </StyledIconButton>
                          </Tooltip>
                        </Stack>
                      </Box>
                    </Stack>
                  </CardContent>
                </DiamondCard>
              </Zoom>
            ))}
          </Stack>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <GradientButton
              startIcon={<QrCodeIcon />}
              size="large"
              onClick={() => navigate('/consumer/verify')}
            >
              Authenticate New Diamonds
            </GradientButton>
          </Box>
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default Certificates;
