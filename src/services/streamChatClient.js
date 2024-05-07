// useChat.js

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';

const userId = "6d990f37-b5b8-416c-aa9f-2a6d7ded89cb";
const full_name = "Aladiah Fulminar";
const image = "https://i.imgur.com/nla7ZRm.jpeg"

const initializeChatClient = () => {
    console.log(`${process.env.STREAM_PB}`);
    return StreamChat.getInstance(process.env.STREAM_PB);
};

export const useChat = (session) => {

    console.log("session:", session);

    const initializeChat = async () => {
        try {

            const chatClient = initializeChatClient();

            console.log("sessions:", session);

            await chatClient.connectUser(
                {
                    id: session.userId,
                    name: session.fullName,
                    image: image, 
                },
                session.chatToken
            );

            console.log('User connected to Stream Chat');
        } catch (error) {
            console.error('Failed to initialize Stream Chat:', error);
        }
    };

    initializeChat();

};

export const disconnectUserChat = async () => {

    const chatClient = initializeChatClient();

    if (chatClient._user) {
        try {
            await chatClient.disconnectUser();

            console.log('User disconnected from Stream Chat');
        } catch (error) {
            console.error('Failed to disconnect user from Stream Chat:', error);
        }
    }

    console.log('No detected users active on stream');
};


