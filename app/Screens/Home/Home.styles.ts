import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  greetings: {
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    height: '100%',
    marginTop: 30,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    gap: 15,
  },
  contentListContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  cardItemContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: { marginBottom: 15 },
  textInputOutline: { borderRadius: 25 },
  cartFab: {
    position: 'absolute',
    margin: 0,
    right: 20,
    bottom: 20,
  },
});
