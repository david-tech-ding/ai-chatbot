import { Box, useTheme, useMediaQuery } from '@mui/material';
import TypingAnimation from '../components/typer/TypingAnimation';
import Footer from '../components/footer/Footer';

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box width={'100%'} height={'100%'}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          mx: 'auto',
          mt: 3,
        }}
      >
        <Box>
          <TypingAnimation />
        </Box>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            mx: 'auto',
          }}
        >
          <img
            src="chat.png"
            alt="chatexample"
            style={{
              display: 'flex',
              margin: 'auto',
              width: isBelowMd ? '80%' : '60%',
              marginTop: 80,
            }}
          ></img>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
