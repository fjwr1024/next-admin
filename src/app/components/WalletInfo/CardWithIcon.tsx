import { FC, createElement, ReactNode } from 'react'
import { Card, Box, Typography, Divider, Link } from '@mui/material'

interface Props {
  icon: FC<any>
  title?: string
  subtitle?: string | number
  children?: ReactNode
}

const CardWithIcon = (props: Props) => {
  const { icon, title, subtitle, children } = props

  return (
    <Card
      sx={{
        width: 500,
        minHeight: 52,
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        '& a': {
          textDecoration: 'none',
          color: 'inherit',
        },
      }}
    >
      <Link>
        <Box
          sx={{
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            '& .icon': {
              color: (theme) => (theme.palette.mode === 'dark' ? 'inherit' : '#dc2440'),
            },
          }}
        >
          <Box width='3em' className='icon'>
            {createElement(icon, { fontSize: 'large' })}
          </Box>
          <Typography color='textSecondary' mb={1}>
            {title}
          </Typography>
          <Typography variant='h5' component='h2'>
            {subtitle || ' '}
          </Typography>
        </Box>
      </Link>
      {children && <Divider />}
      {children}
    </Card>
  )
}

export default CardWithIcon
