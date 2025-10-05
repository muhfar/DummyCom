import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormMethods } from '../../Types/index.types';
import { RootParamList } from '../../Navigator/RootNavigator/RootNavigator.types';

export interface FormValues {
  email: string;
  password: string;
}

export type LoginFormMethods = FormMethods<FormValues>;

export type NavigationProps = NativeStackNavigationProp<RootParamList, 'Login'>;
