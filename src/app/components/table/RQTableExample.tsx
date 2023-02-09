import React, { useMemo, useState } from 'react'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import { IconButton, Tooltip } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import type { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { Users } from '@/types/user'

type UserApiResponse = {
  data: Array<Users>
  meta: {
    totalRowCount: number
  }
}

const Example = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isError, isFetching, isLoading, refetch } = useQuery<UserApiResponse>({
    queryKey: [
      'table-data',
      columnFilters, //refetch when columnFilters changes
      globalFilter, //refetch when globalFilter changes
      pagination.pageIndex, //refetch when pagination.pageIndex changes
      pagination.pageSize, //refetch when pagination.pageSize changes
      sorting, //refetch when sorting changes
    ],
    queryFn: async () => {
      // const fetchURL = new URL(
      // '/api/data',
      //   process.env.NODE_ENV === 'production'
      //     ? 'https://www.material-react-table.com'
      //     : 'https://jsonplaceholder.typicode.com/users'
      // )
      const fetchURL = new URL('https://jsonplaceholder.typicode.com/users')
      fetchURL.searchParams.set('start', `${pagination.pageIndex * pagination.pageSize}`)
      fetchURL.searchParams.set('size', `${pagination.pageSize}`)
      fetchURL.searchParams.set('filters', JSON.stringify(columnFilters ?? []))
      fetchURL.searchParams.set('globalFilter', globalFilter ?? '')
      fetchURL.searchParams.set('sorting', JSON.stringify(sorting ?? []))

      const response = await fetch(fetchURL.href)
      const json = (await response.json()) as UserApiResponse
      return json
    },
    keepPreviousData: true,
  })

  const columns = useMemo<MRT_ColumnDef<Users>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'walletAddress',
        header: 'walletAddress',
      },
      {
        accessorKey: 'tickets',
        header: 'tickets',
      },
      {
        accessorKey: 'role',
        header: 'role',
      },
      {
        accessorKey: 'createdAt',
        header: 'createdAt',
      },
    ],
    []
  )

  return (
    <MaterialReactTable
      columns={columns}
      data={data?.data ?? []} //data is undefined on first render
      initialState={{ showColumnFilters: true }}
      manualFiltering
      manualPagination
      manualSorting
      muiToolbarAlertBannerProps={
        isError
          ? {
              color: 'error',
              children: 'Error loading data',
            }
          : undefined
      }
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onPaginationChange={setPagination}
      onSortingChange={setSorting}
      renderTopToolbarCustomActions={() => (
        <Tooltip arrow title='Refresh Data'>
          <IconButton onClick={() => refetch()}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      )}
      rowCount={data?.meta?.totalRowCount ?? 0}
      state={{
        columnFilters,
        globalFilter,
        isLoading,
        pagination,
        showAlertBanner: isError,
        showProgressBars: isFetching,
        sorting,
      }}
    />
  )
}

const queryClient = new QueryClient()

const ExampleWithReactQueryProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
)

export default ExampleWithReactQueryProvider
