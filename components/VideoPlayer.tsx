import { Box, Card, Paper } from '@mui/material';
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ url }: { url: string }) => {
  if (typeof window == 'undefined') return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio (height = width * 9/16)
        borderRadius: 1,
        overflow: 'hidden',
      }}
      component={Paper}
      variant='outlined'
    >
      <ReactPlayer url={url} playing controls height="100%" width={'100%'} style={{ position: 'absolute', top: 0, left: 0 }} loop />
    </Box>
  );
};

export default VideoPlayer;
