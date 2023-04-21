import React, { useContext } from 'react';
import { IconButton, Menu, MenuItem, Typography, Box, Grid, Chip } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ThemeContext } from 'frontend/contexts/ThemeContext';

type BankDetailsCardProps = {
  bank: any;
  onTogglePrimary: (bankId: string) => void;
};

function BankDetailsCard({ bank, onTogglePrimary }: BankDetailsCardProps) {
  const { toggle } = useContext(ThemeContext);
  const [menuRef, setMenuRef] = React.useState<HTMLElement | null>(null);

  return (
    <Grid
      container
      sx={{
        color: toggle ? '#fff' : '#000',
        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#f2f2f2',
        borderRadius: 1,
        width: 'auto',
        mx: 2,
        my: 1,
        p: 2,
      }}
    >
      <Grid item display="flex" justifyContent="space-between" xs={12}>
        <Box display="flex" gap={1}>
          <Typography>
            XXXX-XXXX-XXXX-{bank.accountNumber.substring(bank.accountNumber.length - 4)}
          </Typography>
          <Chip size="small" label={bank.primary ? 'Primary' : 'Secondary'} />
        </Box>

        <IconButton
          aria-controls={
            menuRef ? 'demo-positioned-menu' : undefined
          }
          aria-haspopup="true"
          aria-expanded={menuRef ? 'true' : undefined}
          onClick={(e) => setMenuRef(e.currentTarget)}
          style={{ width: '10px', height: '5px' }}
        >
          <MoreHorizIcon />
        </IconButton>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography>
          Account holder: {bank.accountHolderName}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography>
          Country: {bank.country}
        </Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography>
          City: {bank.city}
        </Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography>
          State: {bank.state}
        </Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography>
          Post code: {bank.postCode}
        </Typography>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography>
          IBAN: {bank.iban}
        </Typography>
      </Grid>

      <Menu
        aria-labelledby="demo-positioned-button"
        anchorEl={menuRef}
        open={!!menuRef}
        style={{ padding: '0' }}
        onClose={() => setMenuRef(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => {
          setMenuRef(null);
          onTogglePrimary(bank.id);
        }}>
          {bank.primary ? 'Not Primary' : 'Primary'}
        </MenuItem>
      </Menu>
    </Grid>
  );
}

export default BankDetailsCard;
