import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { STREAM_PB } from '../../env';

const chatClient = StreamChat.getInstance(STREAM_PB);

export const useChatClient = (session) => {
  const [clientIsReady, setClientIsReady] = useState(false);

  const user = {
    id: session.userId,
    name: session.fullName,
    image: session?.userImage,
    usertype: session.userType,
  };

  useEffect(() => {
    const setupClient = async () => {
      try {
        chatClient.connectUser(user, session.chatToken);
        setClientIsReady(true);

      } catch (error) {
        if (error instanceof Error) {
          console.error(
            `An error occurred while connecting the user: ${error.message}`
          );
        }
      }
    };

    if (!chatClient.userId) {
      setupClient();
    }
  }, [session]);

  return {
    clientIsReady
  };
};

export const logOutClient = async () => {
    try {
        const response = await chatClient.disconnectUser();

        return response;
    } catch (error) {
        console.log("Encountered an error in logging out the client --stream");
    }
}

