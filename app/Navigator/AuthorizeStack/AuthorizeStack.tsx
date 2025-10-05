import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAMES } from '../../Constants';
import Home from '../../Screens/Home';
import { RootParamList } from '../RootNavigator/RootNavigator.types';

const AuthorizeStack = () => {
  const Stack = createNativeStackNavigator<RootParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.Authorize.Home}
        component={Home}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name={SCREEN_NAMES.Authorize.Detail} component={Details} /> */}
    </Stack.Navigator>
  );
};
export default AuthorizeStack;
