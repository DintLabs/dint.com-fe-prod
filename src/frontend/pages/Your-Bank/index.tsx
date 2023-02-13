import React, { useContext, useState } from 'react';
import { Box, Button, Grid, IconButton, Modal, Stack, Typography, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ContactSupportSharpIcon from '@mui/icons-material/ContactSupportSharp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import _ from 'lodash';
import FirstStep from './BankingSteps/FirstStep';
import SecondPageUsa from './BankingSteps/SecondPageUsa';
import SecondPageOther from './BankingSteps/SecondPageOther';
import { ThemeContext } from '../../contexts/ThemeContext';
import CaptureImageComponent from 'frontend/components/CaptureImageComponent';
import _axios from 'frontend/api/axios';
import Loader from 'frontend/components/common/Loader';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 500,
  minHeight: 500,
  textAlign: 'center',
  bgcolor: '#ffffff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BankContainer = () => {
  const [state, setState] = useState<any>({
    country: null,
    active: 0
  });
  const [open, toggleVerificationModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);

  const handleClose = () => {
    toggleVerificationModal(false)
  }

  const handleNextStep = (item = null) => {
    if (state.active !== 2) {
      setState((oldState: any) => ({
        ...oldState,
        country: item,
        active: state.active + 1
      }));
    }
  }

  const handlePreviousStep = () => {
    if (state.active !== 0) {
      setState((oldState: any) => ({
        ...oldState,
        active: state.active - 1
      }));
    }
  }

  const handleKYC = async (image: string) => {
    setLoading(true)
    try {
      const { data } = await _axios.post('api/user/verify_identity/', {
        // document: image,
        face_image: image
      });
      setLoading(false)
      console.log(data);
      if (data && data.code === 400) {
        toast.error('Action Failed')
      } else {
        toast.success('Verification Done')
      }
    } catch (err) {
      setLoading(false)
      toast.error('Action Failed')
      console.error(err);
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            borderLeft: `1px solid ${theme.palette.grey[700]}`,
            borderRight: `1px solid ${theme.palette.grey[700]}`,
            overflow: 'auto'
          }}
          pb={6}
        >
          <Stack
            p={2}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              borderBottom: `2px solid ${theme.palette.grey[700]}`,
              justifyContent: 'space-between'
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}

            >
              {state.active !== 0 && (
                <IconButton size="small" onClick={handlePreviousStep}>
                  <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
                </IconButton>
              )}
              <Typography className="primary-text-color capitalize-text" variant="subtitle1">
                BANKING
              </Typography>
            </Stack>
            <Stack>
              <ContactSupportSharpIcon sx={{ color: toggle ? 'white' : '#919eab' }} />
            </Stack>
          </Stack>

          {state.active === 0 &&
            <div style={{ margin: 'auto', width: 'fit-content', marginTop: '2rem' }}>
              <Button variant="contained" onClick={handleNextStep}>+ Add Bank</Button>
            </div>
          }
          {state.active === 1 &&
            <>
              <Stack
                p={2}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  borderBottom: `1px solid ${theme.palette.grey[700]}`,
                  justifyContent: 'space-between'
                }}
              >
                <InfoOutlinedIcon sx={{ color: toggle ? 'white' : '#919eab' }} />
                <Typography className="primary-text-color" variant="subtitle2">
                  We recommend using mobile device or device with camera to complete this verification step.
                </Typography>
              </Stack>
              <div style={{ margin: 'auto', width: 'fit-content', marginTop: '2rem' }}>
                <Button className="capitalize-text" variant="contained" onClick={() => toggleVerificationModal(true)}>Complete Verification</Button>
              </div>
            </>
          }
          <Loader loading={loading} />

          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h1" component="h1">
                Identity Verification Modal
              </Typography>
              <Typography id="modal-modal-description" variant="h4" sx={{ mt: 2, mb: 2 }}>
                Please click on "Capture Button" to take your photo
              </Typography>
              <CaptureImageComponent handleClose={handleClose} handleSubmit={handleKYC} />
            </Box>
          </Modal>

          {/* {state.active === 0 && <FirstStep nextStep={handleNextStep}/>}
          {state.active === 1 && (
            <>
              {_.includes(['United States','Canada'],state.country)
                ? <SecondPageUsa nextStep={handleNextStep}/>
                : <SecondPageOther nextStep={handleNextStep}/>
              }
            </>
          )} */}
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default BankContainer;
