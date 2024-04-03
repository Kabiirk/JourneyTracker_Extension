import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import { IJourney } from '../../hooks/useJourney';
interface JourneyListProps {
  addNewJourney: (title: string) => void;
  journeys: IJourney[];
  updateSelectedJourney: (journeyId: string) => void;
  selectedJourney: IJourney;
}

export default function JourneyList({
  addNewJourney,
  journeys,
  updateSelectedJourney,
  selectedJourney
}: JourneyListProps) {
  const [isAdd, setIsAdd] = useState(false);
  const [title, setTitle] = useState('');


  useEffect(() => {
    if(!journeys  || journeys.length === 0) {
      setIsAdd(true)
    }

  }
  , [journeys]);
  
  return (
    <Stack
      spacing={2}
      direction='row'
      alignItems='center'
      justifyContent='center'
      padding={2}
      marginTop={2}
    >
      {isAdd || !journeys || (journeys.length === 0) || !selectedJourney ? (
        <TextField
          id='standard-basic'
          label='Create new journey'
          variant='standard'
          sx={{ width: 300 }}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      ) : (
        <Autocomplete
          disablePortal
          id='combo-box-demo'
          options={journeys}
          sx={{ width: 300 }}
          getOptionLabel={option => option && option.label}
          // defaultValue={selectedJourney.label}
          value={selectedJourney}
          onChange={(e, value) => {
            if (value) {
              updateSelectedJourney(value.id);
            }
          }}
          renderInput={params => (
            <TextField
              {...params}
              label='Journeys'
              variant='standard'
              placeholder='Select Journey'
              
            />
          )}
        />
      )}
      {
        // cancel button if isAdd is true
        isAdd && journeys && journeys.length > 0 &&  (
          <Button
            variant='contained'
            color='error'
            onClick={() => setIsAdd(!isAdd)}
          >
            <CancelIcon />
          </Button>
        )
      }

      <Button
        variant='contained'
        color='primary'
        onClick={() => {
          setIsAdd(!isAdd);
          if (isAdd && title.length > 0) {
            addNewJourney(title);
            setTitle('');
          }
        }}
      >
        {isAdd ? <SaveAltIcon /> : <AddIcon />}
      </Button>
    </Stack>
  );
}
