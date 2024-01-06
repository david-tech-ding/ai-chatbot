import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from '../../context/AuthContext';

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) => {
  const auth = useAuth();
  return role === 'assistant' ? (
    <>
      <Box sx={{ display: 'flex', p: 2, bgcolor: '#808080', my: 2, gap: 2 }}>
        <Avatar sx={{ ml: '0' }}>
          <img src="openai.png" alt="openai" width={'30px'}></img>
        </Avatar>
        <Box>
          <Typography fontSize={'20px'}>{content}</Typography>
        </Box>
      </Box>
    </>
  ) : (
    <>
      <Box sx={{ display: 'flex', p: 2, bgcolor: '#808080', gap: 2 }}>
        <Avatar sx={{ ml: '0', bgcolor: 'black', color: 'white' }}>
          {auth?.user?.name[0]}
          <Box sx={{ ml: 0 }}>{auth?.user?.name.split(' ')[1][0]}</Box>
        </Avatar>
        <Box>
          <Typography fontSize={'20px'}>{content}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default ChatItem;
