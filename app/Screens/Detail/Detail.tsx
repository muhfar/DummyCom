import { RouteProp, useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper';
import { fetchProductById } from '../../Services/api';
import ReloadScreen from '../../Component/ReloadScreen';
import { ScrollView, View } from 'react-native';
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import CategoryPill from '../../Component/Category/Category.component';
import Rating from '../../Component/Rating';
import styles from './Detail.styles';
import { useDispatch } from 'react-redux';
import Price from '../../Component/Price/Price.component';
import debounce from 'lodash/debounce';
import type {
  NumberFunction,
  Product,
  Review,
  UseTheme,
} from '../../Types/index.types';
import { RootParamList } from '../../Navigator/RootNavigator/RootNavigator.types';
import { AppDispatch } from '../../Redux/Store/store';
import { updateCart } from '../../Redux/Reducers/Cart/cart.reducer';

const renderFooter = (
  data: Product,
  quantity: number,
  setQuantity: Dispatch<SetStateAction<number>>,
): ReactElement => (
  <Card style={styles.footerContainer}>
    <Card.Content style={styles.footerContent}>
      <Price
        price={data?.price}
        discountPercentage={data?.discountPercentage}
      />
      <View style={styles.counterContainer}>
        <IconButton
          mode="contained"
          onPress={() => setQuantity(q => Math.max(0, q - 1))}
          icon="minus"
        />
        <Text variant="bodyLarge" style={{ width: 20, textAlign: 'center' }}>
          {quantity}
        </Text>
        <IconButton
          mode="contained"
          onPress={() => setQuantity(q => Math.min(data?.stock, q + 1))}
          icon="plus"
        />
      </View>
    </Card.Content>
  </Card>
);

const renderReviews = (
  reviews: Array<Review> = [],
  colors: UseTheme['colors'],
): ReactElement => (
  <Card style={{ backgroundColor: colors.background }}>
    <Card.Title title="Reviews" />
    <Card.Content>
      {reviews?.map((review: Review, index: number) => (
        <View style={styles.reviewItem} key={index}>
          <View style={styles.reviewRating}>
            <Text>{new Date(review.date).toLocaleDateString()}</Text>
            <Rating rating={review.rating} />
          </View>
          <Text variant="titleMedium" style={{ color: colors.primary }}>
            {review.reviewerName}
          </Text>
          <Text>{review.comment}</Text>
        </View>
      ))}
    </Card.Content>
  </Card>
);

const renderProductData = (
  data: Product,
  colors: UseTheme['colors'],
  title?: string,
): ReactElement => (
  <Card
    style={[styles.contentContainer, { backgroundColor: colors.background }]}
  >
    <Card.Cover source={{ uri: data?.thumbnail }} />
    <Card.Title
      title={data?.title || title}
      titleNumberOfLines={3}
      titleVariant="titleMedium"
      titleStyle={{ color: colors.primary }}
      subtitle={data?.brand}
      subtitleStyle={{ color: colors.tertiary }}
    />
    <Card.Content>
      <View style={styles.ratingContainer}>
        <View>
          <Text>Overal Rating</Text>
          <Rating rating={data?.rating} />
        </View>
        <CategoryPill category={data?.category} />
      </View>
      <Text>{data?.description}</Text>
    </Card.Content>
  </Card>
);

const useDebounceQuantity = (quantity: number, dispatch: AppDispatch) => {
  const debouncedSetQuantity = useMemo(
    () =>
      debounce(value => {
        dispatch(updateCart(value));
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSetQuantity(quantity);
  }, [quantity, debouncedSetQuantity]);

  useEffect(() => {
    return () => {
      debouncedSetQuantity.cancel();
    };
  }, [debouncedSetQuantity]);
};

const Detail = (): ReactElement => {
  const { colors } = useTheme();
  const route = useRoute<RouteProp<RootParamList, 'Detail'>>();
  const dispatch = useDispatch();
  const { id, title } = route?.params;
  const { data, isError, refetch, error } = useQuery({
    queryKey: ['product-detail', id],
    queryFn: fetchProductById,
  });
  const [quantity, setQuantity] = useState(0);

  useDebounceQuantity(quantity, dispatch);

  if (isError) return <ReloadScreen onReload={refetch} />;

  return (
    <View style={styles.container}>
      <ScrollView
        style={[{ backgroundColor: colors.surfaceVariant }]}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {renderProductData(data, colors, title)}
        {renderReviews(data?.reviews, colors)}
      </ScrollView>
      {renderFooter(data, quantity, setQuantity)}
    </View>
  );
};

export default Detail;
