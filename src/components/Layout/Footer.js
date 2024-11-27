import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: 'primary.main', color: 'white' }}>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
        Diamond Authentication System © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;