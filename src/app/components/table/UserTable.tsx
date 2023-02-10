import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Users } from '@/types/user'
import { EnhancedTableToolbar } from './EnhancedTableToolbar'
import { EnhancedTableHead } from './EnhancedTableHead'
import { getComparator, stableSort } from '@/utils/tableFunc'
import { Order } from '@/types/table'
import { useChangeTablePage, useRowSelect, useTableRequestSort } from '@/hooks/useTableFunc'
import { useQueryUsers } from '@/hooks/useQueryUsers'

// TODO: search 機能追加 https://qiita.com/oiz-y/items/f828d37855e87ccbc49b

export default function EnhancedTable() {
  const [order, setOrder] = useState<Order>('asc')
  const [orderBy, setOrderBy] = useState<keyof Users>('email')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState<Users[]>([])

  const { isSelected, isSelectedAll, isIndeterminate, toggleSelected, toggleSelectedAll } =
    useRowSelect(rows.map((row) => row.id))

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((response) => {
        setRows(response.data[0])
        console.log('response', response.data[0])
      })
      .catch((error) => console.log(error))
  }, [])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar tableName='Customers' />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={toggleSelectedAll}
              onRequestSort={useTableRequestSort}
              checked={isSelectedAll}
              indeterminate={isIndeterminate}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(String(row.id))
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={() => toggleSelected(String(row.id))}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component='th' id={labelId} scope='row' padding='none'>
                        {row.id}
                      </TableCell>
                      <TableCell align='right'>{row.email}</TableCell>
                      <TableCell align='right'>{row.walletAddress}</TableCell>
                      <TableCell align='right'>{row.tickets}</TableCell>
                      <TableCell align='right'>{row.role}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}
