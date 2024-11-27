import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { styled } from '@mui/material/styles';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  LinearProgress,
  Fade,
  Zoom
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// 自定义样式组件
const GlassContainer = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  border: '1px solid rgba(255, 255, 255, 0.18)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 25,
  padding: '10px 30px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontSize: '1rem',
}));

const GradientButton = styled(StyledButton)(({ theme }) => ({
  background: /*'linear-gradient(45deg, #FF6B6B 30%, #FFE66D 90%)'*/'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  border: 0,
  color: 'white',
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  '&:hover': {
    background: /*'linear-gradient(45deg, #FFE66D 30%, #FF6B6B 90%)'*/'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
    transform: 'scale(1.02)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.1)',
    '&:hover fieldset': {
      borderColor: '#FFE66D',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF6B6B',
    },
  },
}));

const AnimatedCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(10px)',
  borderRadius: 15,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ManufacturerCreate = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [diamondData, setDiamondData] = useState({
    id: '',
    weight: '',
    color: '',
    clarity: '',
    cut: '',
    origin: '',
    manufacturer: '',
    certificateNo: ''
  });
  const [certificateCreated, setCertificateCreated] = useState(false);

  const steps = ['Basic Information', 'Identification Details', 'Manufacturing Information', ' Confirm Creation', 'Keep Adding'];

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleCreateCertificate();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setDiamondData({
      ...diamondData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateCertificate = () => {
    // 这里将来会调用智能合约
    console.log('Creating certificate:', diamondData);
    setCertificateCreated(true);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <StyledTextField
              fullWidth
              name="id"
              label="Diamond ID"
              value={diamondData.id}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              name="weight"
              label="Weight (carats)"
              type="number"
              value={diamondData.weight}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              name="origin"
              label="Origin"
              value={diamondData.origin}
              onChange={handleChange}
              variant="outlined"
            />
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={3}>
            <StyledTextField
              fullWidth
              name="color"
              label="Color Grade"
              value={diamondData.color}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              name="clarity"
              label="Clarity Grade"
              value={diamondData.clarity}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              name="cut"
              label="Cut Grade"
              value={diamondData.cut}
              onChange={handleChange}
              variant="outlined"
            />
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={3}>
            <StyledTextField
              fullWidth
              name="manufacturer"
              label="Manufacturer"
              value={diamondData.manufacturer}
              onChange={handleChange}
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              name="certificateNo"
              label="CertificateNo"
              value={diamondData.certificateNo}
              onChange={handleChange}
              variant="outlined"
            />
          </Stack>
        );
      case 3:
        return (
          <AnimatedCard>
            <CardContent>
              <Typography variant="h6" gutterBottom 
                        sx={{ color: '#FF6B6B', fontWeight: 'bold' }}>
                Confirmation Information
              </Typography>
              <Stack spacing={2}>
                {Object.entries(diamondData).map(([key, value]) => (
                  <Box key={key} sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}>
                    <Typography sx={{ color: '#666' }}>
                      {key === 'id' ? 'Diamond ID' :
                       key === 'weight' ? 'Weight (carats)' :
                       key === 'color' ? 'Color Grade' :
                       key === 'clarity' ? 'Clarity Grade' :
                       key === 'cut' ? 'Cut Grade' :
                       key === 'origin' ? 'Origin' :
                       key === 'manufacturer' ? 'Manufacturer' :
                       key === 'certificateNo' ? 'CertificateNo' : key}                
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>{value}</Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </AnimatedCard>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Fade in timeout={1000}>
        <GlassContainer elevation={3} sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <DiamondIcon sx={{ fontSize: 40, color: '#FF6B6B', mr: 2 }} />
            <Typography variant="h3" 
                      sx={{ 
                        background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold'
                      }}>
              Creating a Diamond Certificate
            </Typography>
          </Box>

          <Box sx={{ width: '100%', mb: 4 }}>
            <LinearProgress 
              variant="determinate" 
              value={(activeStep / (steps.length - 1)) * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
                  borderRadius: 5,
                }
              }}
            />
          </Box>
          
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Zoom in timeout={500}>
            <Box sx={{ mt: 4, mb: 4 }}>
              {renderStepContent(activeStep)}
            </Box>
          </Zoom>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <StyledButton
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ 
                borderColor: '#FF6B6B',
                color: '#FF6B6B',
                '&:hover': {
                  borderColor: '#FFE66D',
                  backgroundColor: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
                }
              }}
            >
              Back
            </StyledButton>
            <GradientButton
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? 'Create a certificate' : 'Next'}
            </GradientButton>
          </Box>

          {certificateCreated && (
            <Fade in timeout={1000}>
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <CheckCircleIcon sx={{ fontSize: 60, color: '#4CAF50', mb: 2 }} />
                <Typography variant="h6" gutterBottom sx={{ color: '#4CAF50' }}>
                  The certificate has been created successfully!
                </Typography>
                <Box sx={{ 
                  mt: 2, 
                  p: 3, 
                  border: '2px dashed #4CAF50',
                  borderRadius: 2,
                  display: 'inline-block'
                }}>
                  <QRCodeCanvas 
                    value={`https://your-domain.com/verify/${diamondData.id}`}
                    size={256}
                    level={"H"}
                    includeMargin={true}
                  />
                </Box>
              </Box>
            </Fade>
          )}
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default ManufacturerCreate;