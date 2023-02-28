import React, { useContext, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, Stack, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Controller, useForm } from 'react-hook-form';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: 20
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type StepPayload = {
  nextStep: (values : any) => void;
};
const SecondPageOther = (props:StepPayload) => {
  const [value, setValue] = React.useState(0);
  const { toggle } = useContext(ThemeContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { handleSubmit, control, formState } = useForm({
    mode: 'onChange'
  });

  const submitValues = (values: any)=>{
      props.nextStep(values)
  }
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Inside Europe" {...a11yProps(0)} sx= {{ flex: 1 }} />
            <Tab label="Outside Europe" {...a11yProps(1)} sx= {{ flex: 1 }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Stack>
            {/* <form >
            <Stack gap={2} mt={2}>
              <TextField
                style={{ flex: 1 }}
                label="Full name of the account holder"
                variant="filled"
                sx={{
                  '& .MuiFilledInput-input': {
                    color: toggle ? 'white' : '#161C24',
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                  }
                }}
              />
            </Stack>
            <Stack gap={2} mt={2}>
              <TextField
                style={{ flex: 1 }}
                label="IBAN"
                variant="filled"
                sx={{
                  '& .MuiFilledInput-input': {
                    color: toggle ? 'white' : '#161C24',
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                  }
                }}
              />
            </Stack>
            <Stack mt={3}>
              <SubmitButton
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              > Confirm
              </SubmitButton>
            </Stack>
            </form> */}
            <form onSubmit={handleSubmit(submitValues)}>
            <Stack direction="row" gap={2} mt={2}>
              <Controller
                name="fullname"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value = '', ref } }: any) => (
                  <FormControl variant="filled" sx={{ flex: 1  , '& .css-y9hmg1-MuiInputBase-root-MuiFilledInput-root' : {color: toggle ? 'white' : '#161C24'}}}>
                    <TextField
                      error={formState.errors?.state?.type === 'required'}
                      label="Full name of the account holder"
                      variant="filled"
                      value={value}
                      inputRef={ref}
                      onChange={(e: any) => onChange(e.target.value)}
                      sx={{
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                      }}
                    >
                    </TextField>
                  </FormControl>
                )}
              />
            </Stack>
            <Stack direction="row" gap={2} mt={2}>
            <Controller
              name="iban"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <FormControl variant="filled" sx={{ flex: 1  , '& .css-y9hmg1-MuiInputBase-root-MuiFilledInput-root' : {color: toggle ? 'white' : '#161C24'}}}>
                  <TextField
                    error={formState.errors?.state?.type === 'required'}
                    label="IBAN"
                    variant="filled"
                    value={value}
                    inputRef={ref}
                    onChange={(e: any) => onChange(e.target.value)}
                    sx={{
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    }}
                  >
                  </TextField>
                </FormControl>
              )}
            />
            </Stack>
            <Stack direction="row" gap={2} mt={2}>
            <Controller
              name="account_number"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value = '', ref } }: any) => (
                <FormControl variant="filled" sx={{ flex: 1  , '& .css-y9hmg1-MuiInputBase-root-MuiFilledInput-root' : {color: toggle ? 'white' : '#161C24'}}}>
                  <TextField
                    error={formState.errors?.account_number?.type === 'required'}
                    label="Account number"
                    variant="filled"
                    value={value}
                    inputRef={ref}
                    onChange={(e: any) => onChange(e.target.value)}
                    sx={{
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    }}
                  >
                  </TextField>
                </FormControl>
              )}
            />
            </Stack>
          <Stack mt={3}>
              <SubmitButton
                variant="contained"
                type="submit"
              > Confirm
              </SubmitButton>
            </Stack>
            </form>

          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stack>
            <Alert
              severity="warning"
              sx={{
                backgroundColor: toggle ? 'rgb(25, 22, 10)' : '#DFE3E8',
                color: toggle ? 'rgb(255, 243, 195)' : 'red'
              }}
            >
              To send EUR to this account, we need to use the
              SWIFT network. It's slower, so the transfer might take a
              day or two longer. Also note that intermediary banks
              and your recipient's bank might charge extra fees to
              the amount received.
            </Alert>
            <Stack gap={2} mt={2}>
              <TextField
                style={{ flex: 1 }}
                label="Full name of the account holder"
                variant="filled"
                sx={{
                  '& .MuiFilledInput-input': {
                    color: toggle ? 'white' : '#161C24',
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                  }
                }}
              />
            </Stack>
            <Stack gap={2} mt={2}>
              <TextField
                style={{ flex: 1 }}
                label="SWIFT/BIC code"
                variant="filled"
                sx={{
                  '& .MuiFilledInput-input': {
                    color: toggle ? 'white' : '#161C24',
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                  }
                }}
              />
            </Stack>
            <Stack gap={2} mt={2}>
              <TextField
                style={{ flex: 1 }}
                label="IBAN/Account Number"
                variant="filled"
                sx={{
                  '& .MuiFilledInput-input': {
                    color: toggle ? 'white' : '#161C24',
                  },
                  '& .MuiInputBase-root': {
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                  }
                }}
              />
            </Stack>
            <Stack mt={3}>
              <SubmitButton
                variant="contained"
                type="submit"
              > Confirm
              </SubmitButton>
            </Stack>
          </Stack>
        </TabPanel>
      </Box>
    </>
  );
};

export default SecondPageOther;