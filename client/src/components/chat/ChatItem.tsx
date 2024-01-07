import { Avatar, Box, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const extractCodeFromString = (message: string) => {
  //in current AI response every code block starts and end with ```
  if (message.includes('```')) {
    const blocks = message.split('```');
    return blocks;
  }
};

const isCodeBlock = (str: string) => {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('/')
  ) {
    return true;
  }
  return false;
};

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();
  return role === 'assistant' ? (
    <>
      <Box sx={{ display: 'flex', p: 2, bgcolor: '#808080', my: 2, gap: 2 }}>
        <Avatar sx={{ ml: '0' }}>
          <img src="openai.png" alt="openai" width={'30px'}></img>
        </Avatar>
        <Box>
          {!messageBlocks && (
            <Typography sx={{ fontSize: '20px' }}>{content}</Typography>
          )}
          {messageBlocks &&
            messageBlocks.length &&
            messageBlocks.map((block) =>
              isCodeBlock(block) ? (
                <SyntaxHighlighter style={coldarkDark} language="javascript">
                  {block}
                </SyntaxHighlighter>
              ) : (
                <Typography sx={{ fontSize: '20px' }}>{block}</Typography>
              )
            )}
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
