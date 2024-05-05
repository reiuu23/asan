import React, {useState, useEffect} from 'react';
import {ScrollView, Text, View, TextInput, Button} from 'react-native';
import io from 'socket.io-client';

const BuyerChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io('http://192.168.100.5:3000');

  useEffect(() => {
    socket.emit('user type', 'buyer', 1); // Assuming '1' as buyer's user ID

    socket.on('chat message', msg => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', {
      recipient: 'scrapyard owner',
      message: inputMessage,
    }); // Assuming 'scrapyard owner' as recipient type
    setMessages(prevMessages => [...prevMessages, inputMessage]); // Display the sent message immediately
    setInputMessage('');
  };

  return (
    <View>
      <ScrollView>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
      </ScrollView>
      <View>
        <TextInput
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default BuyerChat;
