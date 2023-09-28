import cv from 'opencv4nodejs';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const hostIp = '10.0.0.11'; // Replace with your server IP address
  const port = 8083;

  const clientSocket = require('net').Socket();
  clientSocket.connect(port, hostIp, () => {
    console.log('Connected to server');

    let data = Buffer.from('');
    const payloadSize = 8; // Size of a 'Q' (unsigned long long) in bytes

    clientSocket.on('data', (packet) => {
      data = Buffer.concat([data, packet]);

      while (data.length >= payloadSize) {
        const packedMsgSize = data.slice(0, payloadSize);
        data = data.slice(payloadSize);
        const msgSize = packedMsgSize.readBigUInt64LE();

        if (data.length >= msgSize) {
          const frameData = data.slice(0, msgSize);
          data = data.slice(msgSize);
          const frame = cv.imdecode(frameData);
          cv.imencodeAsync('.jpg', frame).then((encodedFrame) => {
            res.write(encodedFrame);
          });
        }
      }
    });

    req.on('close', () => {
      clientSocket.destroy();
      res.end();
    });
  });
};
