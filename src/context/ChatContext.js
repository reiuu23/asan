import React, { useState } from 'react';

export const ChatContext = React.createContext({
  channel: null,
  setChannel: channel => {},
  thread: null,
  setThread: thread => {}
});

export const CustomChatProvider = ({ children }) => {
  const [channel, setChannel] = useState();
  const [thread, setThread] = useState();

  return (
    <ChatContext.Provider value={{ channel, setChannel, thread, setThread }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => React.useContext(ChatContext);
