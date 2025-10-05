import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  greetings: {
    maxWidth: '60%',
  },
});
