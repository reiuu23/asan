import React, { useContext } from 'react';
import { Chat, Channel, ChannelList, MessageList, MessageInput, OverlayProvider } from 'stream-chat-react-native';
import { useChat } from '../../services/streamChatClient';
import { AuthContext } from '../../context/AuthContext';

const OwnerChat = () => {

  const { session } = useContext(AuthContext);

  const chatClient = useChat(session);

  if (!chatClient) {
    return null;
  }

  return (
    <OverlayProvider>
      <Chat client={chatClient}>
        <ChannelList filters={{ type: 'messaging', members: { $in: ['buyer'] } }} />
        <Channel>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </OverlayProvider>
  );
};

export default OwnerChat;
