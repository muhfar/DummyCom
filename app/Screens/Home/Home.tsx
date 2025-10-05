import { ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { SCREEN_NAMES } from '../../Constants';
import styles from './Home.styles';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '../../Services/api';
import ShimmeringCard from './ShimmeringCard';
import ReloadScreen from '../../Component/ReloadScreen';
import UserAccount from '../../Component/UserAccount';
import {
  ActivityIndicator,
  Badge,
  Card,
  FAB,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import debounce from 'lodash/debounce';
import Rating from '../../Component/Rating';
import Price from '../../Component/Price/Price.component';
import type {
  Product,
  StringFunction,
  UseTheme,
} from '../../Types/index.types';
import type { NavigationProps } from './Home.types';

const _renderCardItem = (
  index: number,
  navigation: NavigationProps,
  item: Product,
  colors: UseTheme['colors'],
): ReactElement => {
  return (
    <Card
      style={styles.cardItemContainer}
      key={index}
      onPress={() =>
        navigation.navigate(SCREEN_NAMES.Authorize.Detail, {
          id: item.id,
          title: item.title,
        })
      }
    >
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Title
        title={item.title}
        titleNumberOfLines={3}
        titleVariant="titleSmall"
        titleStyle={{ color: colors.primary }}
        subtitle={item.brand}
        subtitleStyle={{ color: colors.tertiary }}
      />
      <Card.Content>
        <View style={styles.ratingContainer}>
          <Rating rating={item.rating} />
          <Price
            price={item.price}
            discountPercentage={item.discountPercentage}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const _renderItem =
  (
    navigation: NavigationProps,
    isLoading: boolean,
    colors: UseTheme['colors'],
  ) =>
  ({ item, index }: ListRenderItemInfo<Product>): ReactElement =>
    isLoading ? (
      <ShimmeringCard />
    ) : (
      _renderCardItem(index, navigation, item, colors)
    );

const renderLoadMoreIndicator = (isFetchingNextPage: boolean): ReactElement => (
  <ActivityIndicator animating={isFetchingNextPage} />
);

const renderSearchInput = (
  colors: UseTheme['colors'],
  searchKey: string,
  setSearchKey: StringFunction,
): ReactElement => (
  <TextInput
    mode="outlined"
    theme={{ colors }}
    left={<TextInput.Icon icon="shopping-search" />}
    placeholder="Find everything you need!"
    value={searchKey}
    onChangeText={value => setSearchKey(value)}
    style={styles.textInput}
    outlineStyle={styles.textInputOutline}
  />
);

const renderEmptyList = (isShimmering: boolean): ReactElement | null =>
  !isShimmering ? (
    <Text>Oops, our product is currently empty. Please try again later.</Text>
  ) : null;

const useDebounceSearch = (
  searchKey: string,
  setDebouncedSearchKey: StringFunction,
): void => {
  const debouncedSetSearch = useMemo(
    () =>
      debounce(value => {
        setDebouncedSearchKey(value);
      }, 500),
    [],
  );

  useEffect(() => {
    debouncedSetSearch(searchKey);
  }, [searchKey, debouncedSetSearch]);

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);
};

const Home = (): ReactElement => {
  const navigation = useNavigation<NavigationProps>();
  const { colors } = useTheme();
  const [searchKey, setSearchKey] = useState('');
  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchKey);
  const {
    data,
    isLoading,
    isError,
    isRefetching,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', { searchKey: debouncedSearchKey }],
    queryFn: fetchAllProducts,
    initialPageParam: 0,
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.nextSkip : undefined,
  });
  const products = data?.pages.flatMap(page => page.products.products) ?? [];
  const isShimmering = isLoading || isRefetching;

  useDebounceSearch(searchKey, setDebouncedSearchKey);

  if (isError) return <ReloadScreen onReload={refetch} />;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surfaceVariant }]}
    >
      <View style={styles.headerContainer}>
        <UserAccount />
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={_renderItem(navigation, isShimmering, colors)}
        ListHeaderComponent={renderSearchInput(colors, searchKey, setSearchKey)}
        ListEmptyComponent={renderEmptyList(isShimmering)}
        style={[styles.listContainer, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.contentListContainer}
        refreshing={!products && isRefetching}
        onRefresh={refetch}
        numColumns={2}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        ListFooterComponent={renderLoadMoreIndicator(isFetchingNextPage)}
        showsVerticalScrollIndicator={false}
      />
      <FAB
        icon="cart"
        style={styles.cartFab}
        onPress={() => console.log('Go to cart')}
      />
    </View>
  );
};

export default Home;
