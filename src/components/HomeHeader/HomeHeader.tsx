import { Avatar, Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

const HomeHeader = () => {
  return (
    <Stack
      spacing={2}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      padding={2}
      style={{
        backgroundColor: '#f5f5f5'
      }}
    >
      <Stack spacing={1} direction='row' alignItems='center'>
        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        <Typography variant='h6'>Hi Talal</Typography>
      </Stack>

      <Button variant='contained' color='primary'>
        Logout
      </Button>
    </Stack>
  );
};

export default HomeHeader;