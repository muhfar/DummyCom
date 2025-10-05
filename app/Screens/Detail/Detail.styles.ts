import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 10,
    marginVertical: 10,
  },
  contentContainer: {
    padding: 0,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  reviewItem: {
    marginBottom: 20,
    gap: 5,
  },
  reviewRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
