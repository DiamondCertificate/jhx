import { Container, Typography, Paper } from '@mui/material';

const LifecycleTrack = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center">
          生命周期追踪
        </Typography>
      </Paper>
    </Container>
  );
};

export default LifecycleTrack;