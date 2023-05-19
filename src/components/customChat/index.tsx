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
import ChatModule from './chatModule';

const CustomChat: React.FC = () => {
  const [selectedText, setSelectedText] = useState();
  const [data, setData] = useState([]);

  const API_KEY = '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';
  const CHAT_URL = 'https://api.openai.com/v1/chat/completions';

  useEffect(() => {
    selectedText && handleSend()
  },[selectedText])

  const handleSend = async () => {
    const response = await axios.post(
      CHAT_URL,
      {
        model: 'gpt-3.5-turbo',
        // prompt: text,
        messages: [{role: 'user', content: selectedText}],
        max_tokens: 1024,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    if (response?.data?.choices?.length) {
      setData([
        ...data,
        // {role: 'user', content: text},
        response?.data?.choices[0]?.message,
      ]);
      // setText('');
    }
  };

  // const renderItem = ({item}) => (
  //   <View
  //     style={[
  //       {
  //         padding: 5,
  //         flexDirection: 'row',
  //         alignItems: 'center',
  //         // borderWidth:1,
  //         alignSelf: item?.role == 'user' ? 'flex-start' : 'flex-end',
  //         backgroundColor: item?.role == 'user' ? '#D5F5E3' : '#D6EAF8',
  //         borderRadius: 10,
  //         margin: 10,
  //       },
  //       item?.role == 'user'
  //         ? {borderBottomLeftRadius: 0}
  //         : {borderBottomRightRadius: 0},
  //     ]}>
  //     <Text style={{marginLeft: 5}}>{item.content}</Text>
  //   </View>
  // );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChatModule data={data} setData={setData} handleSend={(text) => {
        setSelectedText(text);
        // setData([
        //   ...data,
        //   {role: 'user', content: text}
        // ]);
      }} />
    </SafeAreaView>
  );
};

export default CustomChat;
