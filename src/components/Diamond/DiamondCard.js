import { Card, CardContent, Typography, Box } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

const DiamondCard = ({ diamond }) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <DiamondIcon sx={{ mr: 1 }} />
          <Typography variant="h6">钻石信息</Typography>
        </Box>
        <Typography>证书编号: {diamond.id}</Typography>
        <Typography>重量: {diamond.weight} 克拉</Typography>
        <Typography>颜色: {diamond.color}</Typography>
        <Typography>净度: {diamond.clarity}</Typography>
      </CardContent>
    </Card>
  );
};

export default DiamondCard;