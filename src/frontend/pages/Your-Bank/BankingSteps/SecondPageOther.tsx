import React, { useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Stack, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import { ThemeContext } from '../../../contexts/ThemeContext';


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
  nextStep: () => void;
};
const SecondPageOther = (props:StepPayload) => {
  const [value, setValue] = React.useState(0);
  const { toggle } = useContext(ThemeContext);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
            <Stack gap={2} mt={2}>
              <TextField
                style={{ flex: 1 }}
                label="Full Name of the account holder"
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
              > Confirm
              </SubmitButton>
            </Stack>
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
                label="Full Name of the account holder"
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