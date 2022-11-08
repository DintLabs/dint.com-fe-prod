import React from 'react';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import MessagesSection from '../common/messages/MessagesSection';

const NewMessage = (props: any) => {
  return (
    <Box sx={window.innerWidth < 900 ? { width: '100%' } : { width: 0 }}>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <MessagesSection handleClose={props.handleClose} />
      </Modal>
    </Box>
  );
};

export default NewMessage;
