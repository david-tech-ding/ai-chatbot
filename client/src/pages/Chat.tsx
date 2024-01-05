import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { blue, red } from '@mui/material/colors';

const Chat = () => {
  const auth = useAuth();
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      <Box sx={{ display: { md: 'flex', xs: 'none', sm: 'none' } }}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17, 29, 39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
              display: 'flex',
            }}
          >
            {auth?.user?.name[0]}
            <Box sx={{ ml: 0 }}>{auth?.user?.name.split(' ')[1][0]}</Box>
          </Avatar>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to a ChatBot
          </Typography>
          <Typography sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}>
            Ask me any questions related to technology, finance, education, etc.
            But please do not share your personal information with me!
          </Typography>
          <Button
            sx={{
              width: '200px',
              my: 'auto',
              color: 'white',
              fontWeight: '700',
              borderRadius: 3,
              mx: 'auto',
              bgcolor: blue.A100,
              ':hover': {
                bgcolor: blue.A400,
              },
            }}
          >
            CLEAR CONVERSATION
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
