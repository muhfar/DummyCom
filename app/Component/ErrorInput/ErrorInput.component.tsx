import { ReactElement } from 'react';
import { Text } from 'react-native-paper';
import type { Props } from './ErrorInput.types';
import styles from './ErrorInput.styles';

const ErrorInput = (props: Props): ReactElement => (
  <Text variant="labelMedium" style={styles.errorText}>
    {props.message}
  </Text>
);

export default ErrorInput;
