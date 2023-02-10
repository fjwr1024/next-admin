import { Typography } from '@mui/material'
import Toolbar from '@mui/material/Toolbar'

interface EnhancedTableToolbarProps {
  tableName: string
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { tableName } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div'>
        {tableName}
      </Typography>
    </Toolbar>
  )
}
