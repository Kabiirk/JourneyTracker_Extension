import { Grid } from '@mui/material';
import React from 'react';
import HomeHeader from '../components/HomeHeader';
import JourneyList from '../components/JourneyList';
import ClipboardTable from '../components/ClipboardTable';
import ActionButtons from '../components/ActionButtons';

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HomeHeader />
      </Grid>
      <Grid item xs={12}>
        <JourneyList />
      </Grid>
      <Grid item xs={12}>
        <ClipboardTable />
      </Grid>
      <Grid item xs={12}>
        <ActionButtons />
      </Grid>
    </Grid>
  );
};

export default Home;
