import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          页面未找到
        </Typography>
        <Button component={Link} to="/" variant="contained" sx={{ mt: 3 }}>
          返回首页
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;