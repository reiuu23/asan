import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext';

const BuyerHome = () => {
  const {session} = useContext(AuthContext);
  return (
    <View>
      <Text>BuyerHome</Text>
      <Text>Session Token: {JSON.stringify(session)}</Text>
    </View>
  );
};

export default BuyerHome;
