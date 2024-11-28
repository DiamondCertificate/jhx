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
  Zoom,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
}from '@mui/lab';

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VerifiedIcon from '@mui/icons-material/Verified';
//import TimelineIcon from '@mui/icons-material/Timeline';
import SearchIcon from '@mui/icons-material/Search';
import DiamondIcon from '@mui/icons-material/Diamond';
import FactoryIcon from '@mui/icons-material/Factory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


const statusOptions = [
  { value: 'mining', label: 'Mining completion', icon: <DiamondIcon /> },
  { value: 'cutting', label: 'Finished cutting and grinding', icon: <FactoryIcon /> },
  { value: 'quality_control', label: 'Laser engraving completed', icon: <VerifiedUserIcon /> },
  { value: 'received_by_maker', label: 'Jeweler receives goods', icon: <LocalShippingIcon /> },
  { value: 'design_complete', label: 'The design is completed.', icon: <EditIcon /> },
  { value: 'inlaying_complete', label: 'Mosaic completion', icon: <DiamondIcon /> },
  { value: 'sold', label: 'sold', icon: <LocalShippingIcon /> }
];

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

const StatusUpdateDialog = ({ open, onClose, onSubmit, currentStatus }) => {
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update diamond status</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Select new state</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Select new state"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {option.icon}
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Note Information"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>cancel</Button>
        <GradientButton 
          onClick={() => onSubmit(status, notes)}
          disabled={!status}
        >
          Committing updates
        </GradientButton>
      </DialogActions>
    </Dialog>
  );
};


const LifecycleTrack = () => {
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleVerify = () => {
    if (searchId) {
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
          { date: "2024-01-01", event: "Mining completion", status: 'mining', notes: "Kimberley mining area in South Africa" },
          { date: "2024-01-10", event: "Finished cutting and grinding", status: 'cutting', notes: "Antwerp cutting center" },
          { date: "2024-01-15", event: "Laser engraving completed", status: 'quality_control', notes: "GIA certification completed" }
        ]
      
      });
    }
  };

  const handleStatusUpdate = async (newStatus, notes) => {
    // In the future, this will call a smart contract to update the status.
    console.log('Updating status:', { diamondId: searchId, newStatus, notes });
    
    // Simulation update
    const newEvent = {
      date: new Date().toISOString().split('T')[0],
      event: statusOptions.find(opt => opt.value === newStatus)?.label || newStatus,
      status: newStatus,
      notes: notes
    };

    setVerificationResult(prev => ({
      ...prev,
      currentStatus: newStatus,
      history: [...prev.history, newEvent]
    }));

    setOpenUpdateDialog(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'mining': return <DiamondIcon />;
      case 'cutting': return <FactoryIcon />;
      case 'quality_control': return <VerifiedUserIcon />;
      case 'received_by_maker':
      case 'sold': return <LocalShippingIcon />;
      default: return <DiamondIcon />;
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
            Diamond Lifecycle Record
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
                Searching Diamond Lifecycle Record
              </GradientButton>
            </Box>
          </Box>

          {verificationResult && (
            <Stack spacing={3}>
              <Zoom in timeout={500}>
                <ResultCard>
                  <CardContent>
                    <Stack spacing={3}>
                    <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Left heading section */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <VerifiedIcon sx={{ color: '#89CFF0', fontSize: 30 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                Life Cycle Record
                </Typography>
              </Box>
              
              {/* The right button section */}
              <GradientButton
                startIcon={<AddIcon />}
                onClick={() => setOpenUpdateDialog(true)}
              >
                Update Status
              </GradientButton>
            </Box>

            {/* timeline */}
            <Divider sx={{ borderColor: 'rgba(137, 207, 240, 0.2)' }} />

                      
            <Timeline position="alternate">
              {verificationResult.history.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot sx={{ 
                      background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)'
                    }}>
                      {getStatusIcon(item.status)}
                    </TimelineDot>
                    {index < verificationResult.history.length - 1 && <TimelineConnector />}
                   </TimelineSeparator>
                   <TimelineContent>
                      <Card sx={{ 
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                           transform: 'translateY(-5px)',
                        },
                        transition: 'transform 0.3s ease'
                      }}>
                         <CardContent>
                            <Typography variant="h6" sx={{ color: '#1a237e' }}>
                               {item.event}
                            </Typography>
                            <Typography color="textSecondary">
                               {item.date}
                            </Typography>
                            {item.notes && (
                              <Typography sx={{ mt: 1, color: '#666' }}>
                                 {item.notes}
                              </Typography>
                            )}
                          </CardContent>
                        </Card>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </Stack>
            </CardContent>
          </ResultCard>
        </Zoom>
      </Stack>
    )}

          <StatusUpdateDialog
            open={openUpdateDialog}
            onClose={() => setOpenUpdateDialog(false)}
            onSubmit={handleStatusUpdate}
            currentStatus={verificationResult?.currentStatus}
          />
        </GlassContainer>
      </Fade>
    </Container>
  );
};

export default LifecycleTrack;