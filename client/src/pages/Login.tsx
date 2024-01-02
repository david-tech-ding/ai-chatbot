import { Box, Typography, Button } from '@mui/material';
import { LuLogIn } from 'react-icons/lu';
import CustomisedInput from '../components/shared/CustomisedInput';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Login = () => {
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    console.log(email, password);
    try {
      toast.loading('Signing In...', { id: 'login' });
      await auth?.login(email, password);
      toast.loading('Signed In!', { id: 'login' });
    } catch (error) {
      console.log(error);
      toast.error('Could not sign in', { id: 'login' });
    }
  };

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
        onSubmit={handleSubmit}
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
              color: 'white',
              ':hover': {
                bgcolor: 'white',
                color: 'black',
              },
            }}
            endIcon={<LuLogIn />}
          >
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
