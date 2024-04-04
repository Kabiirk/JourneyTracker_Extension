import { Grid } from '@mui/material';
// import React from 'react';
import HomeHeader from '../components/HomeHeader';
import JourneyList from '../components/JourneyList';
import ClipboardTable from '../components/ClipboardTable';
import ActionButtons from '../components/ActionButtons';
import { IJourney } from '../hooks/useJourney';
interface HomeProps {
  addNewJourney: (title: string) => void;
  journeys: IJourney[];
  updateSelectedJourney: (journeyId: string) => void;
  selectedJourney: IJourney;
  user: string;
  clearTable: () => void;
}

const Home = ({
  addNewJourney,
  journeys,
  updateSelectedJourney,
  selectedJourney,
  user,
  clearTable
}: HomeProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <HomeHeader user={user}/>
      </Grid>
      <Grid item xs={12}>
        <JourneyList
          addNewJourney={addNewJourney}
          journeys={journeys}
          updateSelectedJourney={updateSelectedJourney}
          selectedJourney={selectedJourney}
          
        />
      </Grid>
      <Grid item xs={12}>
        <ClipboardTable selectedJourney={selectedJourney} />
      </Grid>
      <Grid item xs={12}>
        <ActionButtons clearTable={clearTable} />
      </Grid>
    </Grid>
  );
};

export default Home;
