import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';

const CountdownTimer = ({ initialTime, onComplete }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1000);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining, onComplete]);

  useEffect(() => {
    if (timeRemaining < 0) {
      onComplete();
      setTimeRemaining(initialTime);
    }
  }, [initialTime, timeRemaining]);

  const formatTime = (ms) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 3600) % 24);

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Typography
      variant="h1"
      color="primary"
      fontWeight={'bold'}
      sx={{
        background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {formatTime(timeRemaining)}
    </Typography>
  );
};

export default CountdownTimer;
