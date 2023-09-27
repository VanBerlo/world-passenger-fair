import { Clear, ClearAll, ClearAllOutlined, ClearOutlined, ClearRounded, CropSquareSharp, Group, Groups, Person } from '@mui/icons-material';
import { Avatar, Box, Card, Chip, Grid, Grow, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

function Cart({ i = 0, active = false, capacity = 8, passengers = 4, locomotive = false, reverse = false }) {
  const occupancy = passengers / capacity;

  const occ = () => {
    if (!active) return 'closed';
    if (occupancy < 0.33) return 'available';
    if (occupancy < 0.9) return 'half';
    else return 'full';
  };

  const type = () => {
    return locomotive ? 'train' : 'cart';
  };

  const src = `/assets/svgs/${type()}_${occ()}.svg`;

  return (
    <Stack sx={{ width: '100%', alignItems: 'center', opacity: active ? 1 : 0.33 }}>
      <Avatar
        sx={{
          height: 30,
          width: 30,
          m: 2,
          transform: active ? `scale(1.25)` : 'scale(0.75))',
          background: active ? (theme) => `linear-gradient(90deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.main} 90%)` : '',
        }}
      >
        {i + 1}
      </Avatar>

      {/* active */}
      <Grow in>
        <Box
          sx={{
            width: '100%',
            height: 140,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image alt="A Vector image of a train" fill src={src} style={{ maxWidth: '100%', ...(reverse ? { transform: 'scaleX(-1)' } : {}) }} />
        </Box>
      </Grow>

      <Typography variant="subtitle1" gutterBottom fontWeight={'bold'}>
        {active ? `${capacity-passengers} Seats Available` : ''}
      </Typography>

      <Stack direction={'row'} sx={{ p: 0, minHeight: 48, position: 'relative' }}>
        <Grow in={!active} unmountOnExit timeout={{ enter: 1000, exit: 0 }}>
          <Chip label="Closed" size="medium" icon={<ClearOutlined/>}/>
        </Grow>
        <Grow in={active && occupancy < 0.33} unmountOnExit timeout={{ enter: 1000, exit: 0 }}>
          <Chip color="success" label="Board Here" size="medium" variant="outlined"/>
        </Grow>
        <Grow in={active && occupancy > 0.33 && occupancy < 0.9} unmountOnExit timeout={{ enter: 1000, exit: 0 }}>
          <Chip color="warning" variant="outlined" label="Carriage Busy" />
        </Grow>
        <Grow in={active && occupancy > 0.9} unmountOnExit timeout={{ enter: 1000, exit: 0 }}>
          <Chip color="error" variant="outlined" label="Carriage Full" />
        </Grow>
      </Stack>
    </Stack>
  );
}

function Train(props) {
  const { data = [], active = 0 } = props;

  if (!data || data.length <= 0) return null;
  const lastestDatapoint = data[data?.length - 1];
  const { carriages } = lastestDatapoint;
  const carriageCount = carriages.length || 0;
  const gridWidth = Math.floor(12 / carriageCount);

  return (
    <Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-around', alignItems: 'center' }}>
      <Grid container>
        {carriages.map((item, i) => (
          <Grid item xs={gridWidth} key={i}>
            <Cart active={active === i} i={i} locomotive={i === 0 || i === carriages.length - 1} reverse={i === carriages.length - 1} {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Train;
