import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  chatContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 30,
    backgroundColor: colors.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: colors.accent,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  iaBubble: {
    backgroundColor: colors.surface,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  bubbleText: {
    color: colors.text,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#1f344c',
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a2d44',
    color: colors.text,
    paddingHorizontal: 15,
    borderRadius: 10,
    height: 45,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.accent,
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
