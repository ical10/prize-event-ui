import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <MenuIcon />
          </IconButton>
          <Container
            maxWidth={false}
            disableGutters={true}
            sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <ConnectButton />
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
