// components/VideoStream.js

import React, { useEffect, useRef } from 'react';

export default function VideoStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoUrl = '/api/video';

    const startStreaming = async () => {
      const mediaSource = new MediaSource();
      videoRef.current.src = URL.createObjectURL(mediaSource);

      mediaSource.addEventListener('sourceopen', () => {
        const sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');

        fetch(videoUrl)
          .then((response) => {
            console.log(response)
            return response.body.pipeTo(new WritableStream(sourceBuffer));
          })
          .catch((error) => console.error('Error fetching video:', error));
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
