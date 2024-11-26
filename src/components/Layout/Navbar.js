import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: 'white' 
          }}
        >
          钻石认证系统
        </Typography>
        <Box>
          <Button 
            color="inherit" 
            component={Link} 
            to="/manufacturer/create"
          >
            创建证书
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/consumer/verify"
          >
            验证真实性
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/lifecycle/track"
          >
            生命周期
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;