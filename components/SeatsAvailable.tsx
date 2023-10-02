import { Box, Chip, Grid, Grow, Stack } from '@mui/material';

import Image from 'next/image';

import React from 'react';

import CustomCardHeader from './CustomCardHeader';

function SeatsAvailable(props) {
  const { data = [], active = 0 } = props;

  if (!data || data.length < 0) return null;
  
  const lastestDatapoint = data[data?.length - 1];
  
  if (!lastestDatapoint || lastestDatapoint.carriages[active]) return null;


  const rows = lastestDatapoint.carriages[active].seating_array;

  const { passengers, capacity } = lastestDatapoint.carriages[active];

  // const occupancy = passengers / capacity;

  const renderSeat = (val: string | null) => {
    let img = null;

    const width = 85;

    const height = 80;

    if (val === 'Occupied') img = <Image alt="" src={'/assets/svgs/seat_empty_grey.svg'} width={width} height={height} style={{ opacity: 0.2 }} />;

    if (val === 'Free') img = <Image alt="" src={'/assets/svgs/seat_empty_grey.svg'} width={width} height={height} />;

    return (
      <Box width={'100%'} height={'100%'} position={'relative'} p={1}>
        {img}
      </Box>
    );
  };

  const renderRow = (rowArr: any) => {
    return (
      <Grid container item height={'fit-content'}>
        <Grid item xs={3} height={'fit-content'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderSeat(rowArr[0])}
        </Grid>

        <Grid item xs={3} height={'fit-content'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderSeat(rowArr[1])}
        </Grid>

        <Grid item xs={3} height={'fit-content'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderSeat(rowArr[2])}
        </Grid>

        <Grid item xs={3} height={'fit-content'} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {renderSeat(rowArr[3])}
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ width: '100%', height: 'fit', maxHeight: '100%' }}>
      <CustomCardHeader
        header={'Available Seats'}
        subheader={`${passengers} / ${capacity} Seats full in Carriage ${active + 1}`}
        sx={{ px: 2, mb: 3 }}
      />

      <Grid container sx={{ height: '100%', maxHeight: '100%' }}>
        {renderRow(rows[0])}
        {renderRow(rows[1])}
        {renderRow(rows[2])}
      </Grid>
    </Box>
  );
}

export default SeatsAvailable;
