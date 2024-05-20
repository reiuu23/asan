import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators
} from '@react-navigation/stack';
import {
  ChannelList,
  Channel,
  MessageList,
  MessageInput,
  Thread,
  ChannelAvatar,
  OverlayProvider,
  Chat
} from 'stream-chat-react-native';
import { StreamChat } from 'stream-chat';
import { AuthContext } from '../../context/AuthContext';
import { CustomChatProvider, useChatContext } from '../../context/ChatContext';
import { useNavigation } from '@react-navigation/native';
import { STREAM_PB } from '../../../env';
import { useChatClient } from '../../services/streamChatClient';

const Stack = createStackNavigator();

const chatClient = StreamChat.getInstance(STREAM_PB);

if (chatClient) {
  chatClient.disconnectUser();
}

const ChannelListScreen = props => {
  const { session } = useContext(AuthContext);
  const { setChannel } = useChatContext();
  const navigation = useNavigation();

  const filters = {
    members: {
      $in: [session.userId]
    }
  };

  const sort = {
    last_message_at: -1
  };

  const startDirectMessage = async targetUserId => {
    try {
      const channel = chatClient.channel('messaging', {
        members: [session.userId, targetUserId]
      });

      await channel.watch();

      setChannel(channel);
      navigation.navigate('ChannelScreen');
    } catch (error) {
      console.error('Error starting direct message:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1.5,
          padding: 15,
          backgroundColor: '#3E5A47',
          justifyContent: 'center'
        }}>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            fontSize: 16,
            color: '#FFFFFF'
          }}>
          Note: You'll only be able to interact with the direct owner of the scrapyard warehouse you selected!
        </Text>
      </View>
      <View style={{ flex: 8 }}>
        <ChannelList
          filters={filters}
          sort={sort}
          onSelect={channel => {
            const { navigation } = props;
            setChannel(channel);
            navigation.navigate('ChannelScreen');
          }}
          PreviewAvatar={({ channel }) => (
            <TouchableOpacity
              disallowInterruption={true}
              onPress={() => {
                // console.log('hello');
                // console.log('test: ', channel);
              }}>
              <ChannelAvatar channel={channel} />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Button to initiate direct message */}
      <TouchableOpacity style={{backgroundColor: '#3E5A47', padding: 20}}
        onPress={() => startDirectMessage(session.warehouseOwner)}>
        <Text style={{fontFamily: 'Inter-Medium', color: '#FFFFFF', textAlign: 'center'}}>Tap here to start messaging the Owner</Text>
      </TouchableOpacity>
    </View>
  );
};

const ChannelScreen = props => {
  const { navigation } = props;
  const { channel, setThread } = useChatContext();
  const { session } = useContext(AuthContext); // Assuming session.userId is available

  const [currentPeer, setCurrentPeer] = useState('');

  const fetchPeerDisplay = async () => {
    try {
      const response = await channel.queryMembers({});
      const members = response.members;

      const otherMember = members.find(
        member => member.user_id !== session.userId
      );
      const otherMemberName = otherMember
        ? otherMember.user.name
        : 'Unknown User';

      setCurrentPeer(otherMemberName);
    } catch (error) {
      console.error('Error fetching channel members:', error);
    }
  };

  useEffect(() => {
    fetchPeerDisplay();
  }, [channel]);

  return (
    <View>
      <Channel channel={channel}>
        <View
          style={{
            backgroundColor: '#3E5A47',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 20
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 16,
                fontFamily: 'Inter-Medium',
                padding: 20,
                alignItems: 'center'
              }}>
               Back
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontFamily: 'Inter-Medium',
              padding: 20
            }}>
            {currentPeer}
          </Text>
        </View>
        <MessageList
          onThreadSelect={message => {
            if (channel?.id) {
              setThread(message);
              navigation.navigate('ThreadScreen');
            }
          }}
        />
        <MessageInput />
      </Channel>
    </View>
  );
};

const ThreadScreen = props => {
  const { channel, thread } = useChatContext();

  return (
    <Channel channel={channel} thread={thread} threadList>
      <Thread />
    </Channel>
  );
};

export default BuyerChat = () => {
  const { session } = useContext(AuthContext);
  const { clientIsReady } = useChatClient(session);
  const navigation = useNavigation();

  if (!clientIsReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 20
        }}>
        <Text
          style={{
            fontFamily: 'Inter-Medium',
            color: '#3E5A47',
            fontSize: 16
          }}>
          Loading Chat
        </Text>
        <ActivityIndicator size={'small'} color={'#3E5A47'} />
      </View>
    );
  }

  return (
    <CustomChatProvider>
      <OverlayProvider>
        <Chat client={chatClient}>
          <Stack.Navigator
            screenOptions={{
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}>
            <Stack.Screen options={{ headerLeft: () => null }} name="Messages" component={ChannelListScreen} />
            <Stack.Screen
              name="ChannelScreen"
              component={ChannelScreen}
              options={{
                headerTitle: 'Inbox',
                headerShown: false,
                headerBackAllowFontScaling: false
              }}
            />
            <Stack.Screen
              name="ThreadScreen"
              component={ThreadScreen}
              options={{
                headerTitle: 'Thread',
                headerBackAllowFontScaling: false
              }}
            />
          </Stack.Navigator>
        </Chat>
      </OverlayProvider>
    </CustomChatProvider>
  );
};
