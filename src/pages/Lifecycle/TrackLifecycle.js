// 美化版的生命周期追踪页面
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
          钻石生命周期追踪
        </Typography>

        <Timeline position="alternate">
          <TimelineEvent
            icon={<DiamondIcon />}
            title="原石开采"
            date="2024-01-01"
            description="南非金伯利矿区开采"
          />
          <TimelineEvent
            icon={<FactoryIcon />}
            title="切割打磨"
            date="2024-01-15"
            description="安特卫普切割中心完成加工"
          />
          <TimelineEvent
            icon={<VerifiedUserIcon />}
            title="品质认证"
            date="2024-02-01"
            description="GIA认证完成"
          />
          <TimelineEvent
            icon={<LocalShippingIcon />}
            title="运送至零售商"
            date="2024-02-15"
            description="到达指定零售店"
          />
        </Timeline>
      </Paper>
    </Container>
  );
};

export default LifecycleTrack;