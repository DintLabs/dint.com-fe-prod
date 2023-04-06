import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'frontend/redux/store';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import DraftsIcon from '@mui/icons-material/Drafts';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { setWalletSliceChanges, getKeys } from 'frontend/redux/actions/createWallet';
import { useTheme, Typography, FormControl, TextField, Stack, Alert } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getWalletBalance } from '../../redux/slices/wallet';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  maxWidth?: string;
}

export default function KeysDialog() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { walletModal, privateKey, phrase } = useSelector((rootState: RootState) => rootState.wallet);
  const [isPrivate, setPrivate] = React.useState(false);
  const [privatesKey, setPrivateKey] = React.useState<any>('');
  const [isPhrase, setPhrase] = React.useState(false);
  const [phraseKey, setPhraseKey] = React.useState<any>('');
  const { handleSubmit, formState, watch, control, setValue } = useForm();

  React.useEffect(() => {
    dispatch(getWalletBalance());
  }, [isPhrase, privatesKey])

  const handleClose = () => {
    dispatch(setWalletSliceChanges({ walletModal: false }))
  };

  const handlePrivate = () => {
    setPrivate(true);
    setPhrase(false);
    setPhraseKey('');
    setPrivateKey('');
  }

  const handlePhrase = () => {
    setPhrase(false)
    setPhrase(true);
    setPhraseKey('');
    setPrivateKey('');
  }

  const showPhrase = () => {
    setPhraseKey(phrase)
  }

  const showPrivate = async () => {
    setPrivateKey(privateKey)
  }

  const { toggle } = React.useContext(ThemeContext);

  return (
    <div>
      <Dialog
        open={walletModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: toggle ? '#161C24' : 'white',
            color: toggle ? 'white' : '#161C24',
            boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
            borderRadius: 10
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}>
          Edit Main account
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={handlePrivate}>
                <ListItemIcon>
                  <CreateIcon style={{ color: "#f76c2f" }} />
                </ListItemIcon>
                <Typography variant="body1">Export Private Key</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handlePhrase}>
                <ListItemIcon>
                  <CompareArrowsIcon style={{ color: "#f76c2f", transform: 'rotate(90deg)' }} />
                </ListItemIcon>
                <Typography variant="body1">Export Recovery Phrase</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions style={{ borderTop: `1px solid ${theme.palette.grey[700]}`, justifyContent: 'center' }} />
      </Dialog>

      <Dialog
        open={isPrivate}
        onClose={() => setPrivate(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: '#161C24',
            color: 'white',
            boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
            borderRadius: 10
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}>
          Export private key
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" style={{ marginTop: 10 }}>Do not share with anyone! It can be used to steal your account.</Alert>
          <Typography variant="body1" style={{ paddingTop: 10, paddingBottom: 10 }}>NOTE: This will only export private key of the current account.</Typography>
          <form>
          <Stack>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="bio"
              rules={{
                required: true,
                maxLength: 1000
              }}
              render={({ field: { onChange, value = privatesKey, ref } }: any) => (
                <TextField
                  error={
                    formState.errors?.bio?.type === 'required' ||
                    formState.errors?.bio?.type === 'maxLength'
                  }
                  inputRef={ref}
                  label="Private key"
                  placeholder="Click below button to show your private key"
                  value={value}
                  variant="filled"
                  multiline
                  rows={4}
                  inputProps={{
                    readOnly: true,
                    style: {
                      color: 'white',
                    }
                  }}
                />
              )}
            />
          </FormControl>
          </Stack>
          </form>
        </DialogContent>
        <DialogActions style={{ borderTop: `1px solid ${theme.palette.grey[700]}`, justifyContent: 'center', padding: 15 }}>
          <button
            className="btn btn-primary"
            style={{ background: '#7635dc', outline: 'unset', borderWidth: 0 }}
            type="button"
            onClick={showPrivate}

          >
            Show
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isPhrase}
        onClose={() => setPhrase(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: '#161C24',
            color: 'white',
            boxShadow: '0px 7px 8px -4px rgb(0 0 0 / 20%), 0px 12px 17px 2px rgb(0 0 0 / 14%), 0px 5px 22px 4px rgb(0 0 0 / 12%)',
            borderRadius: 10
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}>
          Export recovery phrase
        </DialogTitle>
        <DialogContent>
          <Alert severity="error" style={{ marginTop: 10 }}>Do not share with anyone! It can be used to steal your account.</Alert>
          <Typography variant="body1" style={{ paddingTop: 10, paddingBottom: 10 }}>NOTE: This will export only current accounts delivered from your recovery phrase
          Imported accounts (private keys or keystore files) are not included!</Typography>
          <form>
          <Stack>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="bio"
              rules={{
                required: true,
                maxLength: 1000
              }}
              render={({ field: { onChange, value = phraseKey, ref } }: any) => (
                <TextField
                  error={
                    formState.errors?.bio?.type === 'required' ||
                    formState.errors?.bio?.type === 'maxLength'
                  }
                  inputRef={ref}
                  label="Phrase key"
                  value={value}
                  variant="filled"
                  placeholder="Click below button to show your recovery phrase"
                  rows={4}
                  inputProps={{
                    readOnly: true,
                    style: {
                      color: 'white',
                    }
                  }}
                />
              )}
            />
          </FormControl>
          </Stack>
          </form>
        </DialogContent>
        <DialogActions style={{ borderTop: `1px solid ${theme.palette.grey[700]}`, justifyContent: 'center', padding: 15 }}>
          <button
            className="btn btn-primary"
            style={{ background: '#7635dc', outline: 'unset', borderWidth: 0 }}
            type="button"
            onClick={showPhrase}
          >
            Show
          </button>
        </DialogActions>
      </Dialog>


    </div>
  );
}
