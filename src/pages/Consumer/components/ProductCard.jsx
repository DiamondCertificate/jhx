import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, styled, Chip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { ethers } from 'ethers'; // Import ethers.js for interacting with the blockchain

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

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  cursor: 'pointer',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));

const CertifiedBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  color: 'white',
  fontWeight: 'bold',
}));

const ProductCard = ({ product, onClick }) => {
  const [diamondDetails, setDiamondDetails] = useState(null);

  useEffect(() => {
    async function fetchDiamondDetails() {
      if (diamondContract && product.id) {
        try {
          const details = await diamondContract.getDiamondDetails(product.id);
          setDiamondDetails(details);
        } catch (error) {
          console.error('Error fetching diamond details:', error);
        }
      }
    }

    fetchDiamondDetails();
  }, [product.id]);

  return (
    <StyledCard onClick={onClick}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
        />
        <CertifiedBadge
          icon={<VerifiedIcon />}
          label="certified"
        />
      </Box>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        {diamondDetails && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Weight: {diamondDetails.weight} carats, Color: {diamondDetails.color}, Clarity: {diamondDetails.clarity}, Cut: {diamondDetails.cut}
          </Typography>
        )}
        <Typography variant="h5" sx={{ 
          color: '#1a237e',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          ¥ {product.price.toLocaleString()}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
