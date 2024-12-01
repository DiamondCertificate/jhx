import { useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Card,
  CardContent,
  Box
} from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import FactoryIcon from '@mui/icons-material/Factory';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Web3 from 'web3';
import deployedAddresses from '../../config/deployedAddresses.json';
import DiamondTraceabilityNFT from '../../config/DiamondTraceabilityNFT.json';

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
  const [lifecycleEvents, setLifecycleEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLifecycleEvents = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(
            DiamondTraceabilityNFT.abi,
            deployedAddresses.DiamondTraceabilityNFT
          );

          // Replace 'someDiamondId' with the actual diamond ID
          const diamondId = 'someDiamondId';
          const events = await contract.methods.getDiamondRecord(diamondId).call();

          // Transform fetched events to match the TimelineEvent structure
          const transformedEvents = events.map((event) => {
            let icon;
            switch (event.status) {
              case 'mining':
                icon = <DiamondIcon />;
                break;
              case 'cutting':
                icon = <FactoryIcon />;
                break;
              case 'quality_control':
                icon = <VerifiedUserIcon />;
                break;
              case 'shipping':
                icon = <LocalShippingIcon />;
                break;
              default:
                icon = <DiamondIcon />;
            }
            return {
              icon,
              title: event.event,
              date: event.date,
              description: event.notes
            };
          });

          setLifecycleEvents(transformedEvents);
        } else {
          console.error('Please install MetaMask to use this feature.');
        }
      } catch (error) {
        console.error('Error fetching lifecycle events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLifecycleEvents();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ color: '#1976d2', fontWeight: 'bold' }}
        >
          Diamond Lifecycle Tracking
        </Typography>

        {loading ? (
          <Typography align="center" sx={{ mt: 4 }}>
            Loading lifecycle events...
          </Typography>
        ) : (
          <Timeline position="alternate">
            {lifecycleEvents.map((event, index) => (
              <TimelineEvent
                key={index}
                icon={event.icon}
                title={event.title}
                date={event.date}
                description={event.description}
              />
            ))}
          </Timeline>
        )}
      </Paper>
    </Container>
  );
};

export default LifecycleTrack;
