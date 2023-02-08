import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { News } from '../types/types';

const getNews = async () => {
  const { data } = await axios.get<News[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return data;
};

export const useQueryNews = () =>
  useQuery<News[], Error>({
    queryKey: ['news'],
    queryFn: getNews,
    cacheTime: 10000,
    staleTime: 0,
  });
