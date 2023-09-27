import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

function CustomCardHeader({ header, subheader, sx, ...props }: { sx?: any; header: string | number; subheader: string | number }) {
  return (
    <Box sx={{ widows: '100%', ...sx }} {...props}>
      <Typography variant="h6" fontWeight={"light"}>{header}</Typography>
      <Typography variant="body2" color={"textSecondary"}>{subheader}</Typography>
      <Divider sx={{ my: 0.5 }} />
    </Box>
  );
}

export default CustomCardHeader;
