import { Box, Typography, Button } from '@mui/material';
import CustomisedInput from '../components/shared/CustomisedInput';

const Login = () => {
  return (
    <Box
      display={'flex'}
      flex={{ xs: 1, md: 0.5 }}
      justifyContent={'center'}
      alignItems={'center'}
      padding={2}
      ml={'auto'}
      mt={16}
    >
      <form
        style={{
          margin: 'auto',
          padding: '30px',
          boxShadow: '10px 10px 20px #000',
          borderRadius: '10px',
          border: 'none',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h4"
            color="black"
            textAlign="center"
            padding={2}
            fontWeight={600}
          >
            Login
          </Typography>
          <CustomisedInput type="email" name="email" label="e-mail" />
          <CustomisedInput type="password" name="password" label="password" />
          <Button
            type="submit"
            sx={{
              px: 2,
              py: 1,
              mt: 2,
              width: '400px',
              borderRadius: 2,
              bgcolor: 'black',
              ':hover': {
                bgcolor: 'white',
                color: 'black',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
