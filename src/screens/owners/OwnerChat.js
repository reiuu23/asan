import { StyleSheet, Text, View } from 'react-native'
import { useChat, disconnectUserChat } from '../../services/streamChatClient'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

// Create & Connect User


export default function OwnerChat() {

  const {session} = useContext(AuthContext);

  // const chatClient = useChat(session);

  useEffect(() => {
    useChat(session);
  }, [session]);

  return (
    <View>
      <Text>OwnerChat</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
