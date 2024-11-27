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
  { value: 'mining', label: '开采完成', icon: <DiamondIcon /> },
  { value: 'cutting', label: '切割打磨完成', icon: <FactoryIcon /> },
  { value: 'quality_control', label: '激光雕刻完成', icon: <VerifiedUserIcon /> },
  { value: 'received_by_maker', label: '珠宝商收货', icon: <LocalShippingIcon /> },
  { value: 'design_complete', label: '设计完成', icon: <EditIcon /> },
  { value: 'inlaying_complete', label: '镶嵌完成', icon: <DiamondIcon /> },
  { value: 'sold', label: '售出', icon: <LocalShippingIcon /> }
];

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

const StatusUpdateDialog = ({ open, onClose, onSubmit, currentStatus }) => {
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>更新钻石状态</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <FormControl fullWidth>
            <InputLabel>选择新状态</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="选择新状态"
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
            label="备注信息"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>取消</Button>
        <GradientButton 
          onClick={() => onSubmit(status, notes)}
          disabled={!status}
        >
          提交更新
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
          { date: "2024-01-01", event: "开采完成", status: 'mining', notes: "南非金伯利矿区" },
          { date: "2024-01-10", event: "切割打磨完成", status: 'cutting', notes: "安特卫普切割中心完成加工" },
          { date: "2024-01-15", event: "激光雕刻完成", status: 'quality_control', notes: "GIA认证完成" }
        ]
      
      });
    }
  };

  const handleStatusUpdate = async (newStatus, notes) => {
    // 这里将来会调用智能合约更新状态
    console.log('Updating status:', { diamondId: searchId, newStatus, notes });
    
    // 模拟更新
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
              {/* 左侧标题部分 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <VerifiedIcon sx={{ color: '#89CFF0', fontSize: 30 }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                Life Cycle Record
                </Typography>
              </Box>
              
              {/* 右侧按钮部分 */}
              <GradientButton
                startIcon={<AddIcon />}
                onClick={() => setOpenUpdateDialog(true)}
              >
                Update Status
              </GradientButton>
            </Box>

            {/* 时间线 */}
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