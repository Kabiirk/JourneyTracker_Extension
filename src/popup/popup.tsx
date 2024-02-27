import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import { useJourney } from '../hooks/useJourney';
import './popup.css';


const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {journeys, addNewJourney, updateSelectedJourney, selectedJourney} = useJourney();
  const [user, setuser] = useState<string>("")

  console.log(journeys, 'journeys');
  chrome.runtime.sendMessage({ action: 'AUTH_CHECK' }, session => {
    console.log(session, 'sesssion');
    if (session) {
      setIsLoggedIn(true);
      //user is logged in
      setuser(session.user.email);
    } else {
      setIsLoggedIn(false);

      //no session means user not logged in
      // chrome.tabs.create({
      //   url: '<link to your login page>'
      // });
    }
  });

  useEffect(() => {
    // Check if the user is already logged in
    chrome.storage.local.get('session', ({ session }) => {
      if (session) {
        setIsLoggedIn(true);
      }
    });

    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(message => {
      if (message.action === 'AUTH_CHECK') {
        setIsLoggedIn(message.session ? true : false);
        if (message.session) {
          chrome.storage.local.set({ session: message.session });
        } else {
          chrome.storage.local.remove('session');
        }
      }
    });

    // Update UI with recorded texts
    // updateUI();
  }, []);




  if (!isLoggedIn) {
    return (
      <Grid
        style={{
          height: 'auto',
          minHeight: 200,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          background: '#f5f5f5'
        }}
        container
      >
        <Login />
      </Grid>
    );
  }

  return (
    <Grid style={{ height: 'auto', width: 'auto' }} container>
      <Home
        addNewJourney={addNewJourney}
        journeys={journeys}
        updateSelectedJourney={updateSelectedJourney}
        selectedJourney={selectedJourney}
        user={user}
      />
    </Grid>
  );
};

export default Popup;
