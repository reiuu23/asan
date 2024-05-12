import { StreamChat } from 'stream-chat';
import { STREAM_PB } from '../../env';

export const initializeChatClient = () => {
  const chatClient = StreamChat.getInstance(STREAM_PB);
  return chatClient;
};
