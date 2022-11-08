import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import styled from '@emotion/styled';
import { DialogTitle } from '@mui/material';

type ConfirmationPayload = {
  isOpen: boolean,
  handleClose: () => void,
  onConfirm: any | null,
  title: string,
  confirmText: string,
};

const StyledDailog = styled(Dialog)(() => ({
  '& .MuiTypography-h6' : {
    color:'black',
    padding: '16px 24px',
    fontSize: '1.25rem',
    fontWeight:500
  },
  '& .MuiDialog-paper':{
    backgroundColor:'white'
  }
}));

export default function ConfirmationModel(props: ConfirmationPayload) {
  const { isOpen, title, confirmText, handleClose ,onConfirm } = props;
  return (
    <StyledDailog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{title}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onConfirm}>{confirmText}</Button>
      </DialogActions>
    </StyledDailog>
  );
}
