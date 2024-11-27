import { Card, CardContent, Typography, Box } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

const DiamondCard = ({ diamond }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <DiamondIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Diamond Information</Typography>
        </Box>
        <Typography>Certificateid: {diamond.id}</Typography>
        <Typography>Weight: {diamond.weight} carats</Typography>
        <Typography>Color: {diamond.color}</Typography>
        <Typography>Clarity: {diamond.clarity}</Typography>
      </CardContent>
    </Card>
  );
};

export default DiamondCard;