import { useContext, useRef, useState } from 'react';
import { Box, TextField, Stack, useTheme, FormControl, useMediaQuery } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as axios from 'axios';
import { RootState, useDispatch, useSelector } from 'frontend/redux/store';
import { HOME_SIDE_MENU } from 'frontend/redux/slices/newHome';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function BuyToken() {
  const theme = useTheme();
  const paymentFormRef = useRef();
  const [inProgress, setInProgress] = useState(false)
  const { handleSubmit, formState, watch, control, setValue } = useForm();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const { selectedMenu } = useSelector((rootState: RootState) => rootState.newHome);
  const { address } = useSelector((rootState: RootState) => rootState.wallet);
  const { toggle } = useContext(ThemeContext);

  const onSubmit = async (data: any) => {
    try {
      setInProgress(true)
      await axios.default(`${process.env.REACT_APP_API_LINK}/api/checkout?email=${data.email}&amount=${data.amount}&walletAddr=${data.walletAddr}`).then((res) => {
        const { data } = res;
        window.open(data.session.url)
      })
      setInProgress(false)
    } catch(err) {
      setInProgress(false)
      console.log({ err })
    }
  }
  return (
    <Box
        id="postsListScrollableDiv"
        style={HOME_SIDE_MENU.HOME === selectedMenu ? {} : {
          borderLeft: `1px solid ${theme.palette.grey[700]}`,
          borderRight: `1px solid ${theme.palette.grey[700]}`,
          padding: 10
        }}
      >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <main style={{ width: HOME_SIDE_MENU.HOME === selectedMenu ? '80%' : '50%' }}>
        <h1 style={{ color: toggle ? 'white' : '#161C24', textAlign: 'center' }}>
          Buy Dint Token
        </h1>
        { address }
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2} mt={2} ml={isLargeScreen ? 3 : 0}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="walletAddr"
                rules={{
                  required: true,
                  maxLength: 100
                }}
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <TextField
                    error={
                      formState.errors?.walletAddr?.type === 'required' ||
                      formState.errors?.walletAddr?.type === 'maxLength'
                    }
                    inputRef={ref}
                    value= {value}
                    label="Wallet Address"
                    variant="filled"
                    onChange={(e: any) => onChange(e.target.value)}
                    sx={{
                      flex: 1,
                      '& .MuiFormHelperText-root': {
                        color: theme.palette.grey[600],
                        textAlign: 'right'
                      },
                      '& .MuiFilledInput-input': {
                        color: toggle ? 'white' : '#161C24',
                      },
                      '& .MuiInputBase-root': {
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: true,
                  maxLength: 100
                }}
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <TextField
                    error={
                      formState.errors?.email?.type === 'required' ||
                      formState.errors?.email?.type === 'maxLength'
                    }
                    inputRef={ref}
                    value={value}
                    label="Email"
                    variant="filled"
                    onChange={(e: any) => onChange(e.target.value)}
                    sx={{
                      flex: 1,
                      '& .MuiFormHelperText-root': {
                        color: theme.palette.grey[600],
                        textAlign: 'right'
                      },
                      '& .MuiFilledInput-input': {
                        color: toggle ? 'white' : '#161C24',
                      },
                      '& .MuiInputBase-root': {
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: true,
                  maxLength: 100
                }}
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <TextField
                    error={
                      formState.errors?.amount?.type === 'required' ||
                      formState.errors?.amount?.type === 'maxLength'
                    }
                    inputRef={ref}
                    value={value}
                    label="Amount"
                    variant="filled"
                    onChange={(e: any) => onChange(e.target.value)}
                    sx={{
                      flex: 1,
                      '& .MuiFormHelperText-root': {
                        color: theme.palette.grey[600],
                        textAlign: 'right'
                      },
                      '& .MuiFilledInput-input': {
                        color: toggle ? 'white' : '#161C24',
                      },
                      '& .MuiInputBase-root': {
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                      },
                    }}
                  />
                )}
              />
            </FormControl>
            <button
              className="btn btn-primary"
              style={{ background: '#7635dc', marginBottom: 100, outline: 'unset', borderWidth: 0 }}
              type="submit"
            >
              Start payment
            </button>
          </Stack>
        </form>
      </main>
    </div>
    </Box>
  )
}