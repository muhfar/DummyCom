import { ImageBackground, View } from 'react-native';
import schema from './Login.validation';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../../Component/TextInput';
import { saveToken } from '../../Redux/Reducers/User/user.reducer';
import { useDispatch } from 'react-redux';
import type {
  FormValues,
  LoginFormMethods,
  NavigationProps,
} from './Login.types';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch } from '../../Redux/Store/store';
import { nanoid } from '@reduxjs/toolkit';
import { Button, MD3Theme, Text, useTheme } from 'react-native-paper';
import styles from './Login.styles';
import type { VoidFunction } from '../../Types/index.types';
import { login } from '../../Assets';

interface SaveTokenPayload {
  loginOptions: string;
  token: string;
  timestamp: string;
  email: string;
}

const onValidLogin =
  (dispatch: AppDispatch, navigation: NavigationProps) =>
  (data: FormValues) => {
    const generatedToken: string = nanoid();

    const payload: SaveTokenPayload = {
      token: generatedToken,
      email: data.email,
      loginOptions: 'MANUAL',
      timestamp: new Date().toISOString(),
    };
    console.log('payload', payload);
    dispatch(saveToken(payload));
  };

const onLogin = (
  { handleSubmit }: LoginFormMethods,
  dispatch: AppDispatch,
  navigation: NavigationProps,
): VoidFunction => handleSubmit(onValidLogin(dispatch, navigation));

const renderLoginForm = (
  formMethods: LoginFormMethods,
  dispatch: AppDispatch,
  navigation: NavigationProps,
  colors: MD3Theme['colors'],
) => (
  <View style={styles.formContainer}>
    <TextInput
      label="Email"
      placeholder="Enter your Email"
      {...formMethods.register('email')}
    />
    <TextInput
      label="Password"
      placeholder="Enter your password"
      secureTextEntry
      {...formMethods.register('password')}
    />
    <Button
      mode="contained"
      onPress={onLogin(formMethods, dispatch, navigation)}
      style={styles.loginButton}
      buttonColor={colors.primary}
      textColor={colors.onPrimary}
      accessibilityLabel="login-button"
    >
      Login
    </Button>
  </View>
);

const Login = () => {
  const formMethods: LoginFormMethods = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProps>();
  const { colors } = useTheme();

  return (
    <FormProvider {...formMethods}>
      <View
        style={[styles.container, { backgroundColor: colors.surfaceVariant }]}
      >
        <View style={[styles.loginBox, { backgroundColor: colors.background }]}>
          <Text
            style={[styles.loginTitle, { color: colors.primary }]}
            variant="headlineLarge"
          >
            Login
          </Text>
          {renderLoginForm(formMethods, dispatch, navigation, colors)}
        </View>
      </View>
    </FormProvider>
  );
};

export default Login;
