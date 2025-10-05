import { ReactElement } from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from './Price.styles';

interface Props {
  price: number;
  discountPercentage: number;
}

const Price = (props: Props): ReactElement => {
  const { price, discountPercentage } = props;
  const { colors } = useTheme();
  const hasDiscount = discountPercentage && discountPercentage > 0;
  const discountedPrice = hasDiscount
    ? (price * (1 - discountPercentage / 100)).toFixed(2)
    : price;

  return (
    <View style={styles.container}>
      {hasDiscount && (
        <Text
          variant="bodySmall"
          style={[styles.disabledPrice, { color: colors.onSurfaceDisabled }]}
        >
          {props.price}
        </Text>
      )}
      <Text
        variant="bodyLarge"
        style={[styles.discountPercentage, { color: colors.primary }]}
      >
        $ {discountedPrice}
      </Text>
    </View>
  );
};

export default Price;
