import { Order } from '@/types/order'
import { Users } from '@/types/user'
import { useState } from 'react'

export const useRowSelect = (
  rowIds: string[],
  initialSelectedRowIds: string[] = []
): {
  selectedRowIds: string[]
  isSelected: (rowId: string) => boolean
  isSelectedAll: boolean
  isIndeterminate: boolean
  toggleSelected: (id: string) => void
  toggleSelectedAll: () => void
} => {
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>(initialSelectedRowIds)

  const isSelected = (rowId: string) => selectedRowIds.includes(rowId)
  const isSelectedAll = rowIds.length > 0 && selectedRowIds.length === rowIds.length
  const isIndeterminate = selectedRowIds.length > 0 && selectedRowIds.length < rowIds.length

  const toggleSelected = (rowId: string) => {
    isSelected(rowId)
      ? setSelectedRowIds(selectedRowIds.filter((selectedId) => selectedId !== rowId))
      : setSelectedRowIds([...selectedRowIds, rowId])
  }
  const toggleSelectedAll = () => {
    isSelectedAll ? setSelectedRowIds([]) : setSelectedRowIds(rowIds)
  }

  return {
    selectedRowIds,
    isSelected,
    isSelectedAll,
    isIndeterminate,
    toggleSelected,
    toggleSelectedAll,
  }
}

export const useChangeTablePage = (event: React.ChangeEvent<HTMLInputElement>, newPage: number) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const changeTablePage = (event, newPage: number) => setPage(newPage)

  const useChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowsPerPage: number
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return { changeTablePage, useChangeRowsPerPage }
}

export const useTableRequestSort = (event: React.MouseEvent<unknown>, property: keyof Users) => {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Users>('id')
  const isAsc = orderBy === property && order === 'asc'
  setOrder(isAsc ? 'desc' : 'asc')
  setOrderBy(property)

  return { order, orderBy }
}
