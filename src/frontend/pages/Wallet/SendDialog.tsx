import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, dispatch } from 'frontend/redux/store';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme, Typography, Avatar, TextField, FormControl, Select, MenuItem } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { transferDint } from 'frontend/redux/actions/wallet/transferDint';
import { sendMatic } from 'frontend/redux/actions/wallet/sendMatic';

export default function SendDialog(props: any) {
  const theme = useTheme();
  const { handleSubmit, formState, watch, control, setValue } = useForm();

  const handleClose = () => {
    props.handleClose() 
  };

  const onSubmit = (data: any) => {
    dispatch(transferDint(data))
    props.handleClose() 

    dispatch(sendMatic(data))
    props.handleClose() 

  }


  

  return (
    <div>
      <Dialog
        open={props.isSend}
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
            width: '500px'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${theme.palette.grey[700]}`, fontSize: '20px'  }}>
          Send 
        </DialogTitle>
        <DialogContent sx={{
          textAlign: 'center'
        }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ my: 2 }}>
              <Controller
                control={control}
                name="type"
                rules={{
                  required: true,
                  maxLength: 1000
                }}
                defaultValue=''
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <Select
                    error={
                      formState.errors?.type?.type === 'required'
                    }
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="filled"
                    value={value}
                    label="Type"
                    onChange={(e: any) => {
                      onChange(e.target.value);
                    }}
                    inputProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                  >
                    <MenuItem value='dint'>Dint</MenuItem>
                    <MenuItem value='matic'>Matic</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ my: 2 }}>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: true,
                  maxLength: 1000
                }}
                defaultValue=''
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <TextField
                    error={
                      formState.errors?.amount?.type === 'required'
                    }
                    inputRef={ref}
                    label="Amount"
                    value={value}
                    variant="filled"
                    placeholder="Amount"
                    inputProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                    onChange={(e: any) => {
                      onChange(e.target.value);
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="recipient_address"
                rules={{
                  required: true,
                  maxLength: 1000
                }}
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <TextField
                    error={
                      formState.errors?.recipient_address?.type === 'required'
                    }
                    inputRef={ref}
                    label="Recipient address"
                    value={value}
                    variant="filled"
                    placeholder="Recipient address"
                    inputProps={{
                      style: {
                        color: 'white',
                      }
                    }}
                    onChange={(e: any) => {
                      onChange(e.target.value);
                    }}
                  />
                )}
              />
            </FormControl>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit" className='mt-3'>SEND</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}