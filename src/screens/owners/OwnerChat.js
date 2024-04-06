// import React, { useState, useEffect } from 'react';
// import { ScrollView, Text, View, TextInput, Button } from 'react-native';
// import { StreamChat } from 'stream-chat';

// const client = StreamChat.getInstance('ecnyy5zzzyhe');

// await client.connectUser(
//   {
//     id: 'john',
//     name: 'John Doe',
//     image: 'https://getstream.io/random_svg/?name=John'
//   },
//   client.devToken('john')
// );

// const OwnerChat = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState('');
//   const socket = io('http://192.168.100.5:3000');

//   useEffect(() => {
//     socket.emit('user type', 'scrapyard owner');

//     socket.on('chat message', msg => {
//       setMessages(prevMessages => [...prevMessages, msg]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const sendMessage = () => {
//     socket.emit('chat message', {recipient: 'buyer', message: inputMessage}); // Assuming 'buyer' as recipient type
//     setMessages(prevMessages => [...prevMessages, inputMessage]); // Display the sent message immediately
//     setInputMessage('');
//   };

//   return (
//     <View>
//       <ScrollView>
//         {messages.map((msg, index) => (
//           <Text key={index}>{msg}</Text>
//         ))}
//       </ScrollView>
//       <View>
//         <TextInput
//           value={inputMessage}
//           onChangeText={setInputMessage}
//           placeholder="Type your message..."
//         />
//         <Button title="Send" onPress={sendMessage} />
//       </View>
//     </View>
//   );
// };

// export default OwnerChat;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function OwnerChat() {
  return (
    <View>
      <Text>OwnerChat</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
