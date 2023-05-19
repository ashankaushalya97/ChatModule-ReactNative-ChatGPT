import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import ChatModule from './chatModule';
import {isWelcomText} from '../../utils';

const CustomChat: React.FC = () => {
  const [selectedText, setSelectedText] = useState();
  const [data, setData] = useState([
    {
      role: 'system',
      content:
        "You are Dominic Torreto, a large language model for answering japanese car questions. Answer as concisely as possible. Don't repond to anything that not related to cars. Limit your response to 60 words. \nKnowledge cutoff: 2023-05-19\nCurrent date: 2023-05-19",
    },
  ]);

  const API_KEY = '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';
  const CHAT_URL = 'https://api.openai.com/v1/chat/completions';

  useEffect(() => {
    selectedText && handleSend();
  }, [selectedText]);

  const handleSend = useCallback(async () => {
    let parsed = JSON.stringify(data);
    let edited = JSON.parse(parsed);
    if (!isWelcomText(selectedText))
      edited[edited?.length - 1] = {
        role: 'user',
        content:
          edited[edited?.length - 1]?.content +
          ' Don’t give information not mentioned in the CONTEXT INFORMATION. If it is out of the scope, Just say Oh Sorry. That is not my expertised area. Don’t justify your answers.',
      };

    const response = await axios.post(
      CHAT_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: edited,
        max_tokens: 1024,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );

    if (response?.data?.choices?.length) {
      setData([...data, response?.data?.choices[0]?.message]);
    }
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <ChatModule
        data={data}
        setData={setData}
        handleSend={text => {
          setSelectedText(text);
        }}
      />
    </SafeAreaView>
  );
};

export default CustomChat;
