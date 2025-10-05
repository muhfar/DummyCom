import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAMES } from '../../Constants';
import { RootParamList } from '../RootNavigator/RootNavigator.types';
import Login from '../../Screens/Login';

const UnauthorizeStack = () => {
  const Stack = createNativeStackNavigator<RootParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.Unauthorize.Login}
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default UnauthorizeStack;
