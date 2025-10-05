import { ReactElement } from 'react';
import { View } from 'react-native';
import { Shimmer, ShimmerProvider } from 'react-native-fast-shimmer';
import styles from './ShimmeringCard.styles';

const renderShimmeringItem = () => <Shimmer style={styles.shimmerItem} />;

const renderShimmeringRow = () => (
  <View style={styles.shimmerRow}>
    {renderShimmeringItem()}
    {renderShimmeringItem()}
  </View>
);

const ShimmeringCard = (): ReactElement => (
  <ShimmerProvider
    duration={1000}
    gradientConfig={{
      colors: ['transparent', '#d6e0f5', 'transparent'],
    }}
  >
    {renderShimmeringRow()}
    {renderShimmeringRow()}
  </ShimmerProvider>
);

export default ShimmeringCard;
