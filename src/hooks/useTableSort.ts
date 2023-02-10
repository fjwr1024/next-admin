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

export const useSelectAllCheck = (rows, event: React.ChangeEvent<HTMLInputElement>) => {
  const [selected, setSelected] = useState<readonly string[]>([])
  if (event.target.checked) {
    const newSelected = rows.map((n) => n.email)
    setSelected(newSelected)
    return
  }
  setSelected([])
}

export const useClickRowCheck = (event: React.MouseEvent<unknown>, name: string) => {
  const [selected, setSelected] = useState<readonly string[]>([])

  const selectedIndex = selected.indexOf(name)
  let newSelected: readonly string[] = []

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name)
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1))
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1))
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    )
  }

  setSelected(newSelected)
}

export const useChangePage = (event: unknown, newPage: number) => {
  const [page, setPage] = useState(0)
  setPage(newPage)
}

export const useChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  setRowsPerPage(parseInt(event.target.value, 10))
  setPage(0)
}
