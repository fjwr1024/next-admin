import { Order } from '@/types/table'
import { Users } from '@/types/user'
import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Users) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
  checked: boolean
  indeterminate: boolean
}

interface HeadCell {
  disablePadding: boolean
  id: keyof Users
  label: string
  numeric: boolean
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'walletAddress',
    numeric: true,
    disablePadding: false,
    label: 'Wallet Address',
  },
  {
    id: 'tickets',
    numeric: true,
    disablePadding: false,
    label: 'Tickets',
  },
  {
    id: 'role',
    numeric: true,
    disablePadding: false,
    label: 'Role',
  },
]

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, indeterminate, onRequestSort, checked } = props
  const createSortHandler = (property: keyof Users) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            checked={checked}
            indeterminate={indeterminate}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
