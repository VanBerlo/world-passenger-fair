import React, { useEffect, useRef } from 'react';

export default function VideoStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoUrl = '/api/video'; // URL to your Next.js API endpoint

    const startStreaming = async () => {
      const mediaSource = new MediaSource();
      videoRef.current.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener('sourceopen', async () => {
        const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');

        const response = await fetch(videoUrl);
        const reader = response.body.getReader();

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          sourceBuffer.appendBuffer(value);
        }
      });
    };

    startStreaming();
  }, []);

  return (
    <div>
      <h1>Video Stream</h1>
      <video ref={videoRef} autoPlay controls width="640" height="480"></video>
    </div>
  );
}




