import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './style';
import { Theme } from '../../../libs';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';

const AIAdvice = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! How can I help you today?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef();

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    // Simulate AI reply (replace with real AI logic)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "I'm an AI, how can I assist?",
          sender: 'ai',
        },
      ]);
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 800);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.sender === 'user' ? styles.userBubble : styles.aiBubble,
      ]}
    >
      <Text style={styles.bubbleText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 20}
    >
      <SimpleHeader
        title="AI Advice"
        onBackPress={() =>
          navigation && navigation.goBack && navigation.goBack()
        }
      />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.chatArea,
          { paddingBottom: 80 }, // 👈 important
        ]}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor={Theme.colors.lighttextcolor}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AIAdvice;
