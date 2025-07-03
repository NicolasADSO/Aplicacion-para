import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ChatScreen({ navigation }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ia', text: 'Hola 👋 Soy tu asistente. ¿Cómo te sientes hoy?' },
  ]);

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      navigation.replace('MainTabs'); // ✅ redirige al Tab que contiene HomeScreen
    }, 1000);
  };

  return (
    <LinearGradient colors={['#0f2027', '#203a43', '#2c5364']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            {/* Header */}
            <View style={styles.header}>
              <MaterialIcons name="chat" size={24} color="#fff" />
              <Text style={styles.headerTitle}>Tu espacio seguro 🧘‍♂️</Text>
            </View>

            {/* Chat */}
            <ScrollView
              contentContainerStyle={styles.chatContainer}
              keyboardShouldPersistTaps="handled"
            >
              {messages.map((msg, index) => (
                <Animatable.View
                  key={index}
                  animation="fadeInUp"
                  delay={index * 150}
                  style={[
                    styles.bubble,
                    msg.from === 'user' ? styles.userBubble : styles.iaBubble,
                  ]}
                >
                  <Text style={styles.bubbleText}>{msg.text}</Text>
                </Animatable.View>
              ))}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputWrapper}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Escribe tu mensaje..."
                  placeholderTextColor="#ccc"
                  value={input}
                  onChangeText={setInput}
                  multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                  <MaterialIcons name="send" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 20,
    backgroundColor: '#203a43cc',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  chatContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },
  iaBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff22',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#56CCF2',
  },
  bubbleText: {
    fontSize: 15,
    color: '#fff',
  },
  inputWrapper: {
    padding: 10,
    backgroundColor: '#ffffff11',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    maxHeight: 120,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#203a43',
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
});
