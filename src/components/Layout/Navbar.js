import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const GradientAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #89CFF0 30%, #B6E0FF 90%)',
  boxShadow: '0 3px 5px 2px rgba(137, 207, 240, .3)',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  transition: 'transform 0.3s ease',
}));

const Navbar = () => {
  return (
    <GradientAppBar position="static">
      <Toolbar>
        <StyledTitle 
          variant="h6" 
          component={Link} 
          to="/"
        >
          Homepage
        </StyledTitle>
      </Toolbar>
    </GradientAppBar>
  );
};

export default Navbar;