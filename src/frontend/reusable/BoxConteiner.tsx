import { Box } from '@mui/material';
import React from 'react';

const BoxConteiner = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Box
        sx={{
          padding: '4px'
        }}
      >
        <Box
          sx={{
            cursor: 'pointer',
            borderRadius: 1,
            width: '100%'
          }}
          display="flex"
          pl="12px"
          pt="6px"
          pb="6px"
          pr="12px"
          alignItems="center"
          justifyContent="space-between"
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default BoxConteiner;
