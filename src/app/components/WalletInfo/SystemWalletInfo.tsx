import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import WalletIcon from '@mui/icons-material/Wallet'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CardWithIcon from './CardWithIcon'

const SystemWalletInfo = () => {
  return (
    <CardWithIcon icon={WalletIcon} title='System Wallet Info'>
      <CardContent>
        <CardHeader avatar={<WalletIcon />} title='wallet address' subheader='Wallet Address' />
        <List>
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary='10SOL' secondary='SOLANA' />
          </ListItem>
          <Divider variant='inset' component='li' />
          <ListItem>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary='100000' secondary='SPL-TOKEN' />
          </ListItem>
          <Divider variant='inset' component='li' />
        </List>
      </CardContent>
      <Box flexGrow={1}>&nbsp;</Box>
    </CardWithIcon>
  )
}

export default SystemWalletInfo
