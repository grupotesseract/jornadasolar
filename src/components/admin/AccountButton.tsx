import React, { FC, useState } from 'react'
import Link from 'next/link'
import { IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import SignOutUser from 'src/services/user/SignOutUser'
import { useRouter } from 'next/router'

const AccountButton: FC = () => {
  const [
    menuAnchorElement,
    setMenuAnchorElement
  ] = useState<null | HTMLElement>(null)
  const router = useRouter()

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget)
  }

  const handleOnClose = () => setMenuAnchorElement(null)

  const handleSignOutUser = async () => {
    await new SignOutUser().call()
    router.push('/')
  }

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleOnClick}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>

      <Menu
        anchorEl={menuAnchorElement}
        open={Boolean(menuAnchorElement)}
        getContentAnchorEl={null}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        onClose={handleOnClose}
      >
        <MenuItem>
          <Link href="/app/diario" passHref>
            <Typography variant="inherit">Meu Diário</Typography>
          </Link>
        </MenuItem>

        <MenuItem onClick={handleSignOutUser}>Sair</MenuItem>
      </Menu>
    </>
  )
}

export default AccountButton
