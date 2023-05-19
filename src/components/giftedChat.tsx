import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

const GiftedChaatComp: React.FC = () => {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);

  const API_KEY = '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';
  const CHAT_URL = 'https://api.openai.com/v1/chat/completions';

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Ask anthing...',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'assistant',
          avatar:
            'https://banner2.cleanpng.com/20190224/qal/kisspng-chatbot-clip-art-computer-icons-internet-bot-openc-clipart-bot-5c72479d22fb55.3012787315509933091433.jpg',
        },
      },
    ]);
  }, []);

  useEffect(() => {
    text && handleSend(text);
  }, [text]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const handleSend = async (userText: string) => {
    const response = await axios.post(
      CHAT_URL,
      {
        model: 'gpt-3.5-turbo',
        // prompt: text,
        messages: [{role: 'user', content: userText}],
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
      console.log(
        'response ------------- ',
        response?.data?.choices[0]?.message,
      );
      setMessages([
        {
          _id: 1,
          text: response?.data?.choices[0]?.message?.content,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'assistant',
            avatar:
              'https://banner2.cleanpng.com/20190224/qal/kisspng-chatbot-clip-art-computer-icons-internet-bot-openc-clipart-bot-5c72479d22fb55.3012787315509933091433.jpg',
          },
        },
        ...messages,
      ]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={message => {
          setMessages([
            {
              _id: 1,
              text: message[0]?.text,
              createdAt: new Date(),
              user: {
                _id: 1,
              },
            },
            ...messages,
          ]);
          setText(message[0]?.text);
        }}
        user={{
          _id: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default GiftedChaatComp;
