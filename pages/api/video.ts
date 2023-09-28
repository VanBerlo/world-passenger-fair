
export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  const hostIp = '10.0.0.11'; // Replace with your server IP address
  const port = 8083;

  const clientSocket = require('net').Socket();
  clientSocket.connect(port, hostIp, () => {
    console.log('Connected to server');

    clientSocket.on('data', (packet) => {
      res.write(packet); // Send raw binary data as response
    });

    req.on('close', () => {
      clientSocket.destroy();
      res.end();
    });
  });
};