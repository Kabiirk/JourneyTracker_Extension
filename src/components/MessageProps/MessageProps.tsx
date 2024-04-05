import React from 'react';
import { Typography } from '@mui/material';

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  return <Typography variant="body1">{text}</Typography>;
};

export default Message;
