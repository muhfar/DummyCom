import { ReactElement } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Redux/Store/store';
import { Button, Text, useTheme } from 'react-native-paper';
import { logoutUser } from '../../Redux/Reducers/User/user.reducer';
import styles from './UserAccount.styles';

const UserAccount = (): ReactElement => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text lineBreakMode="tail" style={styles.greetings} numberOfLines={2}>
        Welcome, {user.email || 'Guest'}!
      </Text>
      <Button
        mode="contained"
        buttonColor={colors.secondary}
        onPress={() => dispatch(logoutUser())}
      >
        Logout
      </Button>
    </View>
  );
};

export default UserAccount;
