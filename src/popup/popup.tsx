import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import './popup.css';

function mergeArraysToMap(
  keys: string[],
  values: string[]
): { [key: string]: string } {
  if (keys.length !== values.length) {
    throw new Error('The number of keys and values must be the same.');
  }

  // Use reduce to create the key/value map
  const mergedMap: { [key: string]: string } = keys.reduce(
    (map, key, index) => {
      map[key] = values[index];
      return map;
    },
    {}
  );

  return mergedMap;
}

interface IURL {
  url: string;
  text: string[];
}
const Popup = () => {
  const [recordedTexts, setRecordedTexts] = useState<string[]>([]);
  const [recordedURLs, setRecordedURLs] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [data, setData] = useState<IURL[]>([]);

  chrome.runtime.sendMessage({ action: 'AUTH_CHECK' }, session => {
    console.log(session, 'sesssion');
    if (session) {
      setIsLoggedIn(true);
      //user is logged in
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
    updateUI();
  }, []);

  useEffect(() => {
    // Listen for messages from background script
    chrome.runtime.onMessage.addListener(message => {
      if (message.action === 'updateUI') {
        updateUI();
      }
    });

    // Update UI with recorded texts
    updateUI();
  }, []);

  const updateUI = () => {
    chrome.storage.local.get(
      { recordedTexts: [], recordedURLs: [] },
      result => {
        const texts = result.recordedTexts;
        const URLs = result.recordedURLs;
        setRecordedTexts(texts);
        setRecordedURLs(URLs);
        console.log(texts);
        console.log(URLs);
      }
    );
  };

  const clearUI = () => {
    chrome.storage.local
      .set({ recordedTexts: [], recordedURLs: [] })
      .then(() => {});
    updateUI();
  };
  const logResults = () => {
    console.log(recordedTexts);
    console.log(recordedURLs);
  };

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
      <Home />
    </Grid>
  );
};

export default Popup;
