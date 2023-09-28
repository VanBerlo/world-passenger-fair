// Import necessary libraries and components
import React, { useRef } from 'react';
import { SampleType } from '../models/Sample';
import { IResponse } from '../interfaces/response.interface';
import { useEffect, useState } from 'react';
import BusyBarChart from './BusyBarChart';
import { Box, Fab, Grid, Paper } from '@mui/material';
import Header from './Header';
import dynamic from 'next/dynamic';
import Train from './Train';
import { NUMBER_OF_SEATS } from '../lib/consts';
import Waittime from './Waittime';
import SeatsAvailable from './SeatsAvailable';
import CustomCardHeader from './CustomCardHeader';
import { DeleteForever } from '@mui/icons-material';

// Define a function to add a newline character to data
const cmd = (data) => `${data}\n`;

// Dynamically import the VideoPlayer component with client-side rendering
const VideoPlayer = dynamic(() => import('./VideoPlayer').then((mod) => mod), { ssr: false });

// Initialize a timeout variable for data fetching
let dataFetchTimeout: number | NodeJS.Timeout | undefined;
const ADD_DATA_INTERVAL = 5000;
const READ_DATA_INTERVAL = 1000;
const BLOCK_DATA_UPDATES = false;

// Define the main functional component
function IndexPage() {
  // Define state variables using the useState hook
  const [sampleData, setSampleData] = useState<SampleType[] | null>(null);
  const [activeCarriage, setActiveCarriage] = useState<number | null>(1);
  const [port, setPort] = useState(null);

  // Function to send data to a display
  async function sendDataToDisplay(data) {
    if (!port) return null;
    const writer = port.writable.getWriter();
    const encoder = new TextEncoder();
    try {
      const encodedData = encoder.encode(cmd(data));
      console.log(`Sending data: ${data}`);
      await writer.write(encodedData);
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      writer.releaseLock();
    }
  }

  // Function to connect to serial ports
  const connectToPorts = async () => {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
      setPort(port);
    } catch (e) {
      console.log('Error connection to port: \n', e);
    }
  };

  // Function to update sample data from the server
  const updateSampleData = async (refreshRate: number = 5000) => {
    const res = await fetch(`${process.env.API_BASEURL}/get-samples`);
    const data: IResponse = await res.json();
    const newData = [...(sampleData ? sampleData : []), ...data.data];
    setSampleData(newData);
    dataFetchTimeout = window.setTimeout(updateSampleData, refreshRate);

    // Send data to the LED matrix
    if (port && newData) {
      const latestValue = newData[newData.length - 1];
      const { passengers } = latestValue.carriages[activeCarriage];
      sendDataToDisplay(8 - passengers);
    }
  };

  // Function to generate a random date within the last day
  const getRandomDateWithinDay = (): Date => {
    const now = new Date().getTime();
    const sevenDaysAgo = now - 24 * 60 * 60 * 1000; // 7 days in milliseconds

    const randomTime = Math.random() * (now - sevenDaysAgo) + sevenDaysAgo;
    return new Date(randomTime);
  };

  // Function to add a sample
  const addSample = async () => {
    const CARRIAGE_COUNT = 4;
    const CARRIAGE_CAPACITY = 8;
    try {
      // Generate random data for carriages and passengers
      const binaryRandom = () => (Math.random() > 0.5😌 ? 'Occupied' : 'Free');
      const date = getRandomDateWithinDay();
      const carriages = [];

      for (let i = 0; i < CARRIAGE_COUNT; i++) {
        const capacity = CARRIAGE_CAPACITY;

        const seatingArray = [
          [binaryRandom(), null, binaryRandom(), binaryRandom()],
          [binaryRandom(), null, binaryRandom(), binaryRandom()],
          [binaryRandom(), null, null, binaryRandom()],
        ];

        const passengers = seatingArray.reduce((acc, row) => {
          return (
            acc +
            row.reduce((a, seat) => {
              let val = 0;
              if (seat === 'Occupied') {
                val = 1;
              }

              return (a += val);
            }, 0)
          );
        }, 0);

        const occupancy = passengers / capacity;
        const entry = { passengers, capacity, occupancy, seatingArray };
        carriages.push(entry);
      }

      const passengers = carriages.reduce((acc, item) => (acc += item.passengers), 0);

      // Send the generated sample data to the server
      const response = await fetch('/api/add-sample', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carriages, date, passengers }),
      });

      if (!response.ok) {
        throw new Error('Failed to add the document');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('There was a problem adding the Sample.');
      console.log(error);
    }
  };

  // Function to delete all samples
  const deleteSamples = async () => {
    try {
      const response = await fetch('/api/delete-samples', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the samples!');
      }

      const data = await response.json();
      setSampleData(null);
      return data;
    } catch (error) {
      console.log('There was a problem deleting the Samples.');
      console.log(error);
    }
  };

  // Use the useEffect hook to start fetching data and simulate sample adding
  useEffect(() => {
    updateSampleData(READ_DATA_INTERVAL);
    return () => {
      clearTimeout(dataFetchTimeout);
    };
  }, [port]);

  useEffect(() => {
    let timeoutRef: number | NodeJS.Timeout | undefined;
    function simulateSampleAdding() {
      addSample(Math.random() * NUMBER_OF_SEATS);
      timeoutRef = setTimeout(() => simulateSampleAdding(), ADD_DATA_INTERVAL);
    }
    !BLOCK_DATA_UPDATES && simulateSampleAdding();
    return () => {
      clearTimeout(timeoutRef);
    };
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      {/* <Fab sx={{ position: 'absolute', bottom: 40, right: 40 }} onClick={() => addSample()}>
        <Add />
      </Fab>
      
      
      {/* CONTENT */}

      <Fab sx={{ position: 'absolute', bottom: 40, left: 40 }} onClick={() => deleteSamples()}>
        <DeleteForever />
      </Fab>

      <Header activeCarriage={activeCarriage + 1} setActiveCarriage={setActiveCarriage} handlePortConnection={connectToPorts} port={port} />
      <Grid container sx={{}}>
        {/* COLUMN 1 */}
        <Grid container item xs={4} direction={'column'} justifyContent={'space-between'}>
          {/*TIMER */}
          <Grid item component={Paper} variant="outlined" sx={{ p: 2 }}>
            <Waittime />
          </Grid>

          {/* CHART */}
          <Grid item component={Paper} variant="outlined" sx={{ p: 2, mt: 2 }}>
            <BusyBarChart data={sampleData} />
          </Grid>
        </Grid>

        {/* COLUMN 2 */}
        <Grid container item xs={5} direction={'column'} sx={{ px: 2 }}>
          {/* VIDEO */}
          <VideoPlayer url="https://youtu.be/K7ZWgnrmbow" />
        </Grid>

        {/* COLUMN 3 */}
        <Grid container item xs={3} direction={'column'} component={Paper} variant="outlined" sx={{ p: 2 }}>
          <SeatsAvailable data={sampleData} active={activeCarriage} />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Box height={300} width={'100%'} sx={{ mt: 2, px: 4, py: 2 }} component={Paper} variant="outlined">
          <Train data={sampleData} active={activeCarriage} inactive={[0, 2, 3]} />
        </Box>
      </Grid>
    </Box>
  );
}

export default IndexPage;
