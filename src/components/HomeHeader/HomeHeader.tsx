// @ts-ignore
const DASHBOARD_BASE_URL = process.env.DASHBOARD_BASE_URL || 'http://localhost:3000';

import { Avatar, Button, Stack, Typography } from '@mui/material';

interface HomeHeaderProps {
  user: string;
}

const HomeHeader = ({ user }: HomeHeaderProps) => {
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
        <Typography variant='h6'>Hi {user}</Typography>
      </Stack>

      {/* <Button variant='contained' color='primary'>
        Logout
      </Button> */}
      {/* visit site */}
      <Button
        variant='contained'
        color='primary'
        onClick={() => chrome.tabs.create({ url: DASHBOARD_BASE_URL })}
      >
        Dashboard
      </Button>
    </Stack>
  );
};

export default HomeHeader;
