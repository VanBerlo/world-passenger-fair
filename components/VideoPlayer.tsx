import { Box, Paper } from '@mui/material';
import React, { useEffect, useRef } from 'react';

// const host = '127.0.0.1';
// const port = 9997;

const host = '10.0.0.11';
const port = 8083;

function VideoPlayer() {
  const canvasRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    
    
    const fetchData = () => {
      // Create a WebSocket connection when the component mounts
      socketRef.current = new WebSocket(`ws://${host}:${port}`);

      socketRef.current.addEventListener('open', (e) => {
        console.log('Connected!');
      });

      socketRef.current.addEventListener('message', (e) => {
        if (canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          const image = new Image();
          image.src = URL.createObjectURL(new Blob([e.data])); // Create a blob from the received data
          image.onload = () => {
            ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
          };
        }
      });


      // Cleanup the WebSocket when the component unmounts
      return () => {
        if (socketRef.current) {
          // socketRef.current.close();
        }
      };
    };

    fetchData();

  }, []);

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
      variant="outlined"
    >
      <Box component={'canvas'} ref={canvasRef} alt="hello" height="100%" width={'100%'} style={{ position: 'absolute', top: 0, left: 0 }} />
    </Box>
  );
}

export default VideoPlayer;
