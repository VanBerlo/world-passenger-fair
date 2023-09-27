import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Image from 'next/image';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Train } from '@mui/icons-material';

export default function Header({ activeCarriage = 1, port, setActiveCarriage, handlePortConnection }) {
  const handleCarriageChange = (e) => {
    if (setActiveCarriage) {
      setActiveCarriage(e.target.value);
    }
  };

  return (
    <>
      <Dialog open={Boolean(!port)} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Connect The LED Matrix'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The LED matrix needs to be selected manually due to browser security. use the button below to selected the LED matrix from the list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePortConnection} color="primary" variant="contained">
            Connect LED Matrix
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          variant="elevation"
          sx={{
            background: 'linear-gradient( 90deg, rgba(120,34,120,1) 0%,  rgba(180,0,235,1) 100%)',
            px: 2,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              display: 'flex',
            }}
          >
            <Image src="/assets/images/logo_white.png" width={200} height={20} />

            <Box>
              <FormControl sx={{ minWidth: 120, color: (theme) => theme.palette.primary.contrastText }} size="small">
                <Select
                  startAdornment={<Train sx={{ mr: 1 }} />}
                  value={activeCarriage}
                  onChange={handleCarriageChange}
                  sx={{
                    minWidth: 120,
                    borderRadius: 0.5,
                    bgcolor: (theme) => theme.palette.primary.contrastText,
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  <MenuItem value={1}>Carriage 1</MenuItem>
                  <MenuItem value={2}>Carriage 2</MenuItem>
                  <MenuItem value={3}>Carriage 3</MenuItem>
                  <MenuItem value={4}>Carriage 4</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
      </Box>
    </>
  );
}
