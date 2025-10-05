import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginBox: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 20,
  },
  formContainer: {
    gap: 15,
  },
  loginButton: {
    marginTop: 10,
    fontSize: 20,
  },
});
