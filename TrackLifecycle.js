// A prettier version of the lifecycle tracking page
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
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom 
                  sx={{ color: '#1976d2', fontWeight: 'bold' }}>
          Diamond Lifecycle Tracking
        </Typography>

        <Timeline position="alternate">
          <TimelineEvent
            icon={<DiamondIcon />}
            title="Rough Diamond Mining"
            date="2024-01-01"
            description="Kimberley Mining in South Africa"
          />
          <TimelineEvent
            icon={<FactoryIcon />}
            title="Cutting and Polishing"
            date="2024-01-15"
            description="Complete processing at the Antwerp cutting center"
          />
          <TimelineEvent
            icon={<VerifiedUserIcon />}
            title="Quality Certification"
            date="2024-02-01"
            description="GIA certification completed"
          />
          <TimelineEvent
            icon={<LocalShippingIcon />}
            title="Delivery to retailers"
            date="2024-02-15"
            description="Arrive at the designated retail store"
          />
        </Timeline>
      </Paper>
    </Container>
  );
};

export default LifecycleTrack;