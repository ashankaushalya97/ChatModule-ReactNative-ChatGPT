import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  LogBox,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import GiftedChaatComp from './components/giftedChat';
import CustomChat from './components/customChat';

const App: React.FC = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']);
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <GiftedChaatComp/> */}
      <CustomChat />
    </SafeAreaView>
  );
};

export default App;
