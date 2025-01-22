"use client";
import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import { IconShoppingCart, IconMenu } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface ItemType {
  toggleMobileSidebar:  (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({toggleMobileSidebar}: ItemType) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    if (cookies) {
      setToken(cookies.split('=')[1]);
    }
  }, []);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        


        
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {token === null || token === "" ? (
          <Button variant="contained" component={Link} href="/authentication/login"   disableElevation color="primary" >
            Login
          </Button>
          ) : ""}
          <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconShoppingCart size="21" stroke="1.5" onClick={() => router.push('/products/cartttt')} />
          </Badge>

        </IconButton>
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
