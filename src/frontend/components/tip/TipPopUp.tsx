import { FC, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useNavigate } from 'react-router';

import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { ThemeContext } from "../../contexts/ThemeContext";

interface TipPopUpProps {
  user: UserDataInterface | null;
  openPopUpTip: boolean;
  setOpenPopUpTip: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  onOpen: () => void;
}

const TipPopUp: FC<TipPopUpProps> = ({ openPopUpTip, setOpenPopUpTip, onClose, onOpen, user }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggle } = useContext(ThemeContext);

  const { control } = useForm();

  const goToProfile = () => {
    navigate(`/${user && user.custom_username}`);
  };

  return (
    <Dialog
      open={openPopUpTip}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: toggle ? '#212B36' : '#DFE3E8'
        }
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{color: toggle ? 'white' : '#161C24'}}>SEND TIP</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          minWidth: '300px',
          justifyContent: 'space-between'
        }}
      >
        <DialogContentText id="alert-dialog-description" sx={{ width: '100%', color: toggle ? 'white' : '#161C24' }} component="span">
          <FlexRow ai="center" w="100%" jc="space-around">
            <Avatar
              component="span"
              onClick={goToProfile}
              src={user?.profile_image}
              sx={{ width: 75, height: 75, cursor: 'pointer' }}
            />
            <Stack component="span">
              <Typography
                component="span"
                onClick={goToProfile}
                variant="h3"
                sx={{ color: toggle ? 'text.primary' : '#000000', cursor: 'pointer' }}
              >
                {user?.display_name || ''}
              </Typography>
              <Typography
                component="span"
                onClick={goToProfile}
                variant="h6"
                sx={{ color: 'text.secondary', cursor: 'pointer' }}
              >
                {user?.custom_username || ''}
              </Typography>
            </Stack>
          </FlexRow>
        </DialogContentText>

        <DialogContentText id="alert-dialog-description" component="span">
          <FormControl fullWidth>
            <Controller
              control={control}
              name="tip_amount"
              rules={{
                required: true
              }}
              defaultValue=""
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  // error={}
                  inputRef={ref}
                  value={value}
                  label="Tip amount"
                  variant="filled"
                  onChange={(e: any) => {
                    onChange(e.target.value);
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      marginLeft: 0
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">
                        {/* {isUniqueUsername ? <BsCheckLg color="green" /> : <ImCross color="red" />} */}
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </FormControl>
          <Typography
            component="span"
            variant="caption"
            sx={{ color: 'text.secondary', cursor: 'pointer' }}
          >
            Minimum $1 USD
          </Typography>
        </DialogContentText>

        <DialogContentText id="alert-dialog-description" component="span">
          <FormControl fullWidth>
            <Controller
              control={control}
              name="message"
              defaultValue=""
              render={({ field: { onChange, value = '', ref } }: any) => (
                <TextField
                  inputRef={ref}
                  value={value}
                  label="Message (optional)"
                  variant="filled"
                  onChange={(e: any) => {
                    onChange(e.target.value);
                  }}
                  sx={{
                    flex: 1,
                    '& .MuiFormHelperText-root': {
                      color: theme.palette.grey[600],
                      marginLeft: 0
                    },
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                    },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8',
                      '&:focus, &:hover':{
                        backgroundColor: ''
                      }
                    }
                  }}
                />
              )}
            />
          </FormControl>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>CANCEL</Button>
        <Button onClick={onOpen} autoFocus>
          SEND TIP
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TipPopUp;
