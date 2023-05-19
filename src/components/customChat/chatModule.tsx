import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ChatModule: React.FC = ({handleSend, setData, data}) => {
  const [text, setText] = useState();

  const renderItem = ({item}) => (
    item?.role != 'system' &&
    <View
      style={[
        {
          padding: 5,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: item?.role == 'user' ? 'flex-start' : 'flex-end',
          backgroundColor: item?.role == 'user' ? '#D5F5E3' : '#D6EAF8',
          borderRadius: 10,
          margin: 10,
        },
        item?.role == 'user'
          ? {borderBottomLeftRadius: 0}
          : {borderBottomRightRadius: 0},
      ]}>
      <Text style={{marginLeft: 5}}>{item.content}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          style={{padding: 20}}
          renderItem={renderItem}
        />
      </View>
      <View
        style={{
          height: 70,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 20,
          backgroundColor: '#F2F4F4',
        }}>
        <TextInput
          placeholder="Ask me anything ..."
          onChangeText={setText}
          value={text}
        />
        <TouchableOpacity
          onPress={() => {
            setData([...data, {role: 'user', content: text}]);
            handleSend(text);
            setText('');
          }}
          style={{
            backgroundColor: '#D6DBDF',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
          }}>
          <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatModule;
