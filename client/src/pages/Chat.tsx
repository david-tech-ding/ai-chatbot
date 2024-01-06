import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { blue } from '@mui/material/colors';
import { VscSend } from 'react-icons/vsc';
import ChatItem from '../components/chat/ChatItem';

const chatMessages = [
  { role: 'user', content: 'Hello, how can you help me today?' },
  {
    role: 'assistant',
    content:
      'Hi there! I can assist you with various tasks. What do you need help with?',
  },
  {
    role: 'user',
    content: "I'm looking for information about machine learning.",
  },
  {
    role: 'assistant',
    content:
      'Sure! Machine learning is a field of artificial intelligence that focuses on the development of algorithms and models that allow computers to learn from data.',
  },
  {
    role: 'user',
    content: 'Can you give me an example of a machine learning application?',
  },
  {
    role: 'assistant',
    content:
      'Certainly! One example is image recognition, where a machine learning model can be trained to identify objects or patterns in images.',
  },
];

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
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
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
            Ask me any questions!
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
      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: '600',
          }}
        >
          Model - GPT 3.
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
        >
          {chatMessages.map((chatMessage, index) => (
            <ChatItem
              content={chatMessage.content}
              role={chatMessage.role}
              key={index}
            />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: 8,
            backgroundColor: 'rgb(40, 50, 70)',
            display: 'flex',
            marginRight: 'auto',
            margin: 'auto',
          }}
        >
          <input
            type="text"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              padding: '10px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton sx={{ ml: 'auto', color: 'white' }}>
            <VscSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
