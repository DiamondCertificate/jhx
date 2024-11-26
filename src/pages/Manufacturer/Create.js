import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
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
  CardContent
} from '@mui/material';


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

  const steps = ['基本信息', '鉴定细节', '制造信息', '确认创建'];

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
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="id"
              label="钻石ID"
              value={diamondData.id}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="weight"
              label="重量(克拉)"
              type="number"
              value={diamondData.weight}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="origin"
              label="原产地"
              value={diamondData.origin}
              onChange={handleChange}
            />
          </Stack>
        );
      case 1:
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="color"
              label="颜色等级"
              value={diamondData.color}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="clarity"
              label="净度等级"
              value={diamondData.clarity}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="cut"
              label="切工等级"
              value={diamondData.cut}
              onChange={handleChange}
            />
          </Stack>
        );
      case 2:
        return (
          <Stack spacing={2}>
            <TextField
              fullWidth
              name="manufacturer"
              label="制造商"
              value={diamondData.manufacturer}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              name="certificateNo"
              label="证书编号"
              value={diamondData.certificateNo}
              onChange={handleChange}
            />
          </Stack>
        );
      case 3:
        return (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>确认信息</Typography>
              {Object.entries(diamondData).map(([key, value]) => (
                <Typography key={key}>
                  {key}: {value}
                </Typography>
              ))}
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center" 
                  sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          创建钻石证书
        </Typography>
        
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            上一步
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? '创建证书' : '下一步'}
          </Button>
        </Box>

        {certificateCreated && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>证书已创建成功！</Typography>
            <QRCodeCanvas 
              value={`https://your-domain.com/verify/${diamondData.id}`}
              size={256}
              level={"H"}
              includeMargin={true}
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default ManufacturerCreate;