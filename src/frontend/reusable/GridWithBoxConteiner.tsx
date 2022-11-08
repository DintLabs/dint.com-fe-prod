import { useTheme, Grid, Box } from '@mui/material';
import React, { FC, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

interface GridWithBoxConteinerProps {
  children: React.ReactElement | React.ReactElement[];
  sx?: any;
  onClick?: () => void;
}

const GridWithBoxConteiner: FC<GridWithBoxConteinerProps> = ({ children, sx = {}, onClick }) => {
  const theme = useTheme();
  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  return (
    <Grid
      item
      xs={24}
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`,
        borderBottom: `1px solid ${theme.palette.grey[700]}`,
        width: '100%',
        ...sx
      }}
      onClick={() => onClick && onClick()}
    >
      <Box
        sx={{
          width: '100%',
          cursor: 'pointer',
          borderRadius: 1,
          '&:hover': {
            background: toggle ? theme.palette.grey[700] : theme.palette.grey[400],
            '.labels': {
              color: `#7635dc !important`
            },
            '.typo-label': {
              color: 'white'
            }
          }
        }}
        display="flex"
        pl="16px"
        pt="6px"
        pb="6px"
        pr="12px"
        alignItems="center"
        justifyContent="space-between"
      >
        {children}
      </Box>
    </Grid>
  );
};

export default GridWithBoxConteiner;
