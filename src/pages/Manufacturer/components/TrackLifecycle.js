import { useState, useEffect } from 'react';
import { Container, Paper, Typography, Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, Card, CardContent, Box } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import FactoryIcon from '@mui/icons-material/Factory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { connectBlockchain, getContracts } from './utils/contract'; // 引入合约功能

const TimelineEvent = ({ icon, title, date, description }) => (
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot color="primary">{icon}</TimelineDot>
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography color="textSecondary">{date}</Typography>
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </TimelineContent>
  </TimelineItem>
);

const LifecycleTrack = () => {
  const [searchId, setSearchId] = useState('');
  const [lifecycleRecords, setLifecycleRecords] = useState([]);

  // 获取生命周期记录
  const handleVerify = async () => {
    if (searchId) {
      try {
        const diamondContract = await connectBlockchain();
        const lifecycle = await diamondContract.getDiamondLifecycle(searchId); // 获取钻石生命周期记录

        const formattedRecords = lifecycle.map((item) => ({
          icon: getStatusIcon(item.status),
          title: item.event,
          date: item.date,
          description: item.notes || 'No additional notes',
        }));

        setLifecycleRecords(formattedRecords);
      } catch (error) {
        console.error("Error fetching lifecycle:", error);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'mining':
        return <DiamondIcon />;
      case 'cutting':
        return <FactoryIcon />;
      case 'quality_control':
        return <VerifiedUserIcon />;
      case 'received_by_maker':
      case 'sold':
        return <LocalShippingIcon />;
      default:
        return <DiamondIcon />;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Diamond Lifecycle Tracking
        </Typography>

        <Box sx={{ mb: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Typography variant="body1">Enter Diamond ID:</Typography>
          <input 
            type="text" 
            value={searchId} 
            onChange={(e) => setSearchId(e.target.value)} 
            style={{ padding: '5px', borderRadius: '5px' }} 
          />
          <button onClick={handleVerify} style={{ padding: '5px', background: '#1976d2', color: 'white', borderRadius: '5px' }}>
            Verify
          </button>
        </Box>

        <Timeline position="alternate">
          {lifecycleRecords.length > 0 ? (
            lifecycleRecords.map((record, index) => (
              <TimelineEvent
                key={index}
                icon={record.icon}
                title={record.title}
                date={record.date}
                description={record.description}
              />
            ))
          ) : (
            <Typography variant="h6" align="center" sx={{ color: '#666', mt: 4 }}>
              No lifecycle records found for the provided Diamond ID.
            </Typography>
          )}
        </Timeline>
      </Paper>
    </Container>
  );
};

export default LifecycleTrack;
