import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';

export default function ChatHeader({ user }) {
  return (
    <View style={styles.container}>
      <Avatar rounded source={{ uri: user.image }} size="medium" />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={user.online ? styles.onlineText : styles.offlineText}>
          {user.online ? 'Online' : 'Offline'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'lightblue'
  },
  userInfo: {
    marginLeft: 12
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  onlineText: {
    color: 'green'
  },
  offlineText: {
    color: 'gray'
  }
});

// export default ChatHeader;
