import { AppBar } from '@mui/material';
import { Toolbar } from '@mui/material';
import Logo from './shared/Logo';
import { useAuth } from '../context/AuthContext';
import NavigationLink from './shared/NavigationLink';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar
      sx={{ bgcolor: 'transparent', position: 'static', boxShadow: 'none' }}
    >
      <Toolbar sx={{ display: 'flex' }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="black"
                to="/chat"
                text="Go To Chat"
                textColor="white"
              />
              <NavigationLink
                bg="black"
                to="/"
                textColor="white"
                text="Logout"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="black"
                to="/login"
                text="Login"
                textColor="white"
              />
              <NavigationLink
                bg="black"
                to="/signup"
                textColor="white"
                text="Signup"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
