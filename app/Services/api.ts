import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 10000,
});

export const fetchAllProducts = async ({
  queryKey,
  pageParam = 0,
}: QueryFunctionContext<Array<any>, number>) => {
  const [, { searchKey }] = queryKey;
  const limit = 10;
  const url = searchKey
    ? `products/search?q=${searchKey}&limit=${limit}&skip=${pageParam}`
    : `products?limit=${limit}&skip=${pageParam}`;

  const result = await api.get(url);

  return {
    products: result.data,
    total: result.data.total,
    nextSkip: pageParam + limit,
    hasMore: pageParam + limit < result.data.total,
  };
};
