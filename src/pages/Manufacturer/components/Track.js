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
} from '@mui/lab';

import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import VerifiedIcon from '@mui/icons-material/Verified';
import SearchIcon from '@mui/icons-material/Search';
import DiamondIcon from '@mui/icons-material/Diamond';
import FactoryIcon from '@mui/icons-material/Factory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { connectBlockchain, getContracts } from './utils/contract'; // 引入合约功能

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 连接区块链和智能合约
  const handleConnectBlockchain = async () => {
    try {
      setLoading(true);
      const contracts = await connectBlockchain(); // 连接到区块链
      const { diamondContract } = getContracts();

      console.log("Connected to contracts:", contracts);
      return diamondContract; // 返回钻石合约实例
    } catch (error) {
      setError('Failed to connect to blockchain. Please try again.');
      console.error("Blockchain connection error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 验证钻石的生命周期
  const handleVerify = async () => {
    if (searchId) {
      try {
        setLoading(true);
        const diamondContract = await handleConnectBlockchain();
        const lifecycle = await diamondContract.getDiamondLifecycle(searchId); // 获取钻石生命周期

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
          history: lifecycle
        });
      } catch (error) {
        setError('Failed to fetch lifecycle. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  // 更新钻石状态
  const handleStatusUpdate = async (newStatus, notes) => {
    try {
      setLoading(true);
      const diamondContract = await handleConnectBlockchain();
      const tx = await diamondContract.updateDiamondStatus(searchId, newStatus, notes);
      await tx.wait(); // 等待交易完成

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
    } catch (error) {
      setError('Failed to update status. Please try again.');
      console.error("Status update error:", error);
    } finally {
      setLoading(false);
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
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <VerifiedIcon sx={{ color: '#89CFF0', fontSize: 30 }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                          Life Cycle Record
                        </Typography>
                      </Box>
                      <Divider sx={{ borderColor: 'rgba(137, 207, 240, 0.2)' }} />

                      {/* Timeline */}
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
