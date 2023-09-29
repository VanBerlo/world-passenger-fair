import fs from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { nextTick } from 'process';
import { NextApiRequest, NextApiResponse } from 'next';

const pipelineAsync = promisify(pipeline);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const imageData: Buffer[] = [];

  req.on('data', (chunk) => {
    imageData.push(chunk);
  });

  req.on('end', async () => {
    const decodedData = Buffer.concat(imageData);
    const fileName = 'test.jpg';

    try {
      await pipelineAsync(
        // Create a readable stream from the decoded data
        readableFromBuffer(decodedData),
        // Create a writable stream to save the image to a file
        fs.createWriteStream(fileName)
      );

      console.log('Saved!');
      res.status(200).end('Image saved successfully');
    } catch (error) {
      console.error('Error saving image:', error);
      res.status(500).end('Internal Server Error');
    }
  });

  req.on('error', (error) => {
    console.error('Request error:', error);
    res.status(500).end('Internal Server Error');
  });
};

function readableFromBuffer(buffer: Buffer) {
  const { Readable } = require('stream');
  const readable = new Readable();
  readable.push(buffer);
  readable.push(null);
  return readable;
}
