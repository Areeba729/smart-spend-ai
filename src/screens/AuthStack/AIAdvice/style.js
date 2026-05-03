import { StyleSheet } from 'react-native';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.primary,
    flex: 1,
    padding: 0,
  },
  chatArea: {
    padding: 16,
    paddingBottom: 80,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: Theme.colors.secondary,
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: Theme.colors.grey,
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  bubbleText: {
    color: Theme.colors.black,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderColor: Theme.colors.border,
    backgroundColor: Theme.colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: Theme.colors.background,
    color: Theme.colors.black,
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  sendBtnText: {
    color: Theme.colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  expensesLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.black,
    marginHorizontal: 3,
  },
});

export default styles;
