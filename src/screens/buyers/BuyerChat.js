// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {
//   AsanIcon,
//   BuyerIcon,
//   EllipseSelect,
//   LitterIcon,
//   OwnerIcon,
// } from '../../components/Icons';

// export default function BuyerChat() {
//   return (
//     <View>
//       <LitterIcon></LitterIcon>
//     </View>
//   );
// }

// const styles = StyleSheet.create({});

import React, {useState, useEffect} from 'react';
import {Text, TextInput, Button, View} from 'react-native';
import io from 'socket.io-client';

const socket = io('https://1h8ya96ms0nc.share.zrok.io');

export default function BuyerChat() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', msg => {
      setReceivedMessages(prevMessages => [...prevMessages, msg]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
    <View>
      {receivedMessages.map((msg, index) => (
        <Text key={index}>{msg}</Text>
      ))}
      <TextInput
        placeholder="Type your message..."
        value={message}
        onChangeText={text => setMessage(text)}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}
