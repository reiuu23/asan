// ChatClient.js

import { StreamChat } from 'stream-chat';

export const initializeChatClient = () => {
  const chatClient = StreamChat.getInstance(`${process.env.STREAM_PB}`);
  return chatClient;
};
