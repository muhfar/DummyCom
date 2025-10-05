import { ReactElement } from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'react-native-paper';
import styles from './Rating.styles';

interface Props {
  rating: number;
}

const Rating = (props: Props): ReactElement => (
  <View style={styles.container}>
    <Icon source="star" size={20} color="#FFD700" />
    <Text>{props.rating}</Text>
  </View>
);

export default Rating;
