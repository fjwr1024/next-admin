import { Order } from '@/types/order'
import { Users } from '@/types/user'
import { useState } from 'react'

export const useTableRequestSort = (property: keyof Users) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Users>('email')
  const isAsc = orderBy === property && order === 'asc'
  setOrder(isAsc ? 'desc' : 'asc')
  setOrderBy(property)
}
