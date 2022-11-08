import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'frontend/redux/store';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme, Typography, Avatar, TextField, Stack, Alert } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function QrScanDialog(props: any) {
  const theme = useTheme();
  const { address } = useSelector((rootState: RootState) => rootState.wallet);

  const handleClose = () => {
    props.handleClose() 
  };

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  return (
    <div>
      <Dialog
        open={props.isQrScan}
        onClose={() => handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: '#161C24',
            color: 'white',
            boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
            borderRadius: 10,
            width: '650px'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${theme.palette.grey[700]}`, fontSize: '20px'  }}>
        <Avatar alt="Remy Sharp" sx={{ mr: 2 }}>A</Avatar> Receive Poylgon (MATIC)
        </DialogTitle>
        <DialogContent sx={{
          textAlign: 'center'
        }}>
          <img
          src={`${process.env.REACT_APP_QR_URL}?style=ethereum&address=${address}`}
          alt='QR'
          loading="lazy"
          className='p-3'
          />

          <Typography variant="body2" display="block" color="text.secondary">
            Your (MATIC) address
          </Typography>
          <Typography variant="body2" color="white">
            {address}
          </Typography>

          <div className='text-center'>
            <Button variant="text" className='mt-3' onClick={copyContent}>COPY ADDRESS</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}