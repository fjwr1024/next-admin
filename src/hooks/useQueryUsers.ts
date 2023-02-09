import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Users } from './../types/user'

const getUsers = async () => {
  // const { data } = await axios.get<Users[]>('https://jsonplaceholder.typicode.com/posts')
  const { data } = await axios.get<Users[]>('http://localhost:3000/users')
  return data
}

export const useQueryUsers = () =>
  useQuery<Users[], Error>({
    queryKey: ['news'],
    queryFn: getUsers,
    cacheTime: 10000,
    staleTime: 0,
  })
