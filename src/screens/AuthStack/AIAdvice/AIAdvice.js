import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { getExpensesFromFirestore } from '../../../hooks/ExpenseFunction';
import { Theme } from '../../../libs';
import styles from './style';
import { SERVER_URL } from '../../../libs/constants';

const formatExpenseDate = date => {
  if (!date) return '';
  const d = date.toDate ? date.toDate() : new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TypingBubble = () => {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animate = dot =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      );

    const a1 = animate(dot1);
    const a2 = animate(dot2);
    const a3 = animate(dot3);

    a1.start();
    const t2 = setTimeout(() => a2.start(), 133);
    const t3 = setTimeout(() => a3.start(), 266);

    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <View style={[styles.bubble, styles.aiBubble, styles.typingBubble]}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
    </View>
  );
};

const AIAdvice = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! What would you like help with?', sender: 'ai' },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingExpenses, setFetchingExpenses] = useState(true);
  const flatListRef = useRef();
  const chatHistoryRef = useRef([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const expenses = await getExpensesFromFirestore();
        const expenseLines = expenses
          .map(
            e =>
              `- ${e.title} (${e.category}): ${e.amount} on ${formatExpenseDate(
                e.date,
              )}${e.note ? ` — ${e.note}` : ''}`,
          )
          .join('\n');
        chatHistoryRef.current = [
          {
            role: 'user',
            content: `Here are my recent expenses for context:\n${expenseLines}`,
          },
          { role: 'assistant', content: 'Got it, I have your expense data.' },
        ];
      } catch (error) {
        console.error('Error retrieving expenses:', error);
      } finally {
        setFetchingExpenses(false);
      }
    };
    fetchExpenses();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    const userMsg = {
      id: Date.now().toString(),
      text: userText,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMsg]);

    chatHistoryRef.current = [
      ...chatHistoryRef.current,
      { role: 'user', content: userText },
    ];

    setLoading(true);
    try {
      const res = await fetch(`${SERVER_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: chatHistoryRef.current }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't get a response.";

      chatHistoryRef.current = [
        ...chatHistoryRef.current,
        { role: 'assistant', content: reply },
      ];

      setMessages(prev => [
        ...prev,
        { id: Date.now().toString(), text: reply, sender: 'ai' },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          text: 'Failed to connect to the AI server. Please try again.',
          sender: 'ai',
        },
      ]);
    } finally {
      setLoading(false);
      flatListRef.current?.scrollToEnd({ animated: true });
    }
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
      {fetchingExpenses ? (
        <View style={styles.expensesLoader}>
          <ActivityIndicator size="large" color={Theme.colors.secondary} />
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.chatArea, { paddingBottom: 80 }]}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          ListFooterComponent={loading ? <TypingBubble /> : null}
        />
      )}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor={Theme.colors.lighttextcolor}
          editable={!loading && !fetchingExpenses}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}
          disabled={loading || fetchingExpenses}
        >
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AIAdvice;
