import React, { useState } from 'react';
import CountdownTimer from './CountdownTimer';
import { Box, Stack } from '@mui/system';
import CustomCardHeader from './CustomCardHeader';

function Waittime() {

  const [trainInStation, setTrainInStation] = useState(false);
  const [header, setHeader] = useState('Train Departs the Station in:');
  const [time, setTime] = useState(10000);

  const handleTimerComplete = () => {
    if (trainInStation) {
      setTrainInStation(false);
      setTime(10000);
      setHeader('Train Departs the Station in:');
    } else {
      setTrainInStation(true);
      setTime(45000);
      setHeader('Train Arriving in:');
    }
  };

  return (
    <Box m={2}>
      <Stack>
        <CustomCardHeader header={header} subheader={''} />
        <CountdownTimer initialTime={time} onComplete={handleTimerComplete} />
      </Stack>
    </Box>
  );
}

export default Waittime;
