import { Avatar, Box, Button, IconButton, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { blue } from '@mui/material/colors';
import { VscSend } from 'react-icons/vsc';
import ChatItem from '../components/chat/ChatItem';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async () => {
    console.log(inputRef.current?.value);
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: Message = { role: 'user', content };
    setChatMessages((prev) => [...prev, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting chats', { id: 'deletechats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Deleted chats successfully!', { id: 'deletechats' });
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete chats', { id: 'deletechats' });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Retrieving chats...', { id: 'retrievechats' });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success('Successfully retrieved chats!', {
            id: 'retrievechats',
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Failed to retrieve chats', { id: 'retrievechats' });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate('/login');
    }
  }, [auth]);

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
            onClick={handleDeleteChats}
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
            height: '60vh',
            width: '100%',
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              role={chatMessage.role}
              key={index}
            />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: 8,
            backgroundColor: 'rgb(40, 50, 70)',
            display: 'flex',
            marginRight: 'auto',
            margin: 'auto',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Message AI ChatBot..."
            style={{
              width: '100%',
              height: '10px',
              backgroundColor: 'transparent',
              padding: '10px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: 'auto', color: 'white' }}
          >
            <VscSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
