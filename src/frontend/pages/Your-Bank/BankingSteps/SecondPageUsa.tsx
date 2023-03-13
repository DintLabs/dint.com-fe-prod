import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import _axios from 'frontend/api/axios';
import { toast } from 'react-toastify';
import Loader from 'frontend/components/common/Loader';


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
      id={`payment-tabpanel-${index}`}
      aria-labelledby={`payment-tab-${index}`}
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
    id: `payment-tab-${index}`,
    'aria-controls': `payment-tabpanel-${index}`
  };
}

type StepPayload = {
  nextStep: (item?: any) => void;
};
export default function SecondPageUsa(props:StepPayload) {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = React.useState(false);

  const { handleSubmit, control, formState, reset } = useForm({
    mode: 'onChange'
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { toggle } = useContext(ThemeContext);
  React.useEffect(() => {
    isSubmitSuccessful && reset();
    setIsSubmitSuccessful(false);
  }, [isSubmitSuccessful]);

  const onSubmit = async (fieldsData: any) => {
    setLoading(true);
    setIsSubmitSuccessful(true);
    try {
      const { data } = await _axios.post("api/user/add_bank_accounts/", {
        accountHolderName: fieldsData.accountHolderName,
        accountNumber: fieldsData.account_number,
        iban: fieldsData.routing_number || fieldsData.iban,
        country: fieldsData.country,
        city: fieldsData.city,
        state: fieldsData.address,
        postCode: fieldsData.post_code,
      });
      if (data && data.code === 400) {
        setLoading(false);
        toast.error("Action Failed");
      } else {
        setLoading(false);
        toast.success("Verification Done");
        props.nextStep();
      }
    } catch (err) {
      setLoading(false);
      toast.error("Action Failed");
      console.error(err);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {loading ?
        <Loader loading={loading} />
      : (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="ACH" {...a11yProps(0)} sx={{ flex: 1 }} />
              <Tab label="Wire" {...a11yProps(1)} sx={{ flex: 1 }} />
              <Tab label="SWIFT" {...a11yProps(2)} sx={{ flex: 1 }} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="accountHolderName"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <TextField
                    error={formState.errors?.first_name?.type === 'required'}
                        style={{ flex: 1 }}
                        label="Full name of the account holder"
                        inputRef={ref}
                        variant="filled"
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        sx={{
                      '& .MuiFilledInput-input': {
                        color: toggle ? 'white' : '#161C24',
                          },
                      '& .MuiInputBase-root': {
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                      }
                        }}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="routing_number"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <TextField
                    error={formState.errors?.routing_number?.type === 'required'}
                        style={{ flex: 1 }}
                        label="ACH routing number"
                        inputRef={ref}
                        variant="filled"
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                        sx={{
                      '& .MuiFilledInput-input': {
                        color: toggle ? 'white' : '#161C24',
                          },
                      '& .MuiInputBase-root': {
                        backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                      }
                        }}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="account_number"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <TextField
                        style={{ flex: 1 }}
                        label="Acoount number"
                        variant="filled"
                        sx={{
                  '& .MuiFilledInput-input': {
                    color: toggle ? 'white' : '#161C24',
                          },
                  '& .MuiInputBase-root': {
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                  }
                        }}
                        onChange={(e: any) => onChange(e.target.value)}
                        inputRef={ref}
                        value={value}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Account type
                  </FormLabel>
                  <Controller
                    name="account_type"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        sx={{ color: toggle ? "white" : "#161C24" }}
                        onChange={(e: any) => onChange(e.target.value)}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label="Checking"
                          value="Checking"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Savings"
                          value="Savings"
                        />
                      </RadioGroup>
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
              </Stack>
            </form>
          </TabPanel>

            
          <TabPanel value={value} index={1}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="accountHolderName"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
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
                        onChange={(e: any) => onChange(e.target.value)}
                        inputRef={ref}
                        value={value}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="routing_number"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <TextField
                        style={{ flex: 1 }}
                        label="Fedwire routing number"
                        variant="filled"
                        sx={{
                '& .MuiFilledInput-input': {
                  color: toggle ? 'white' : '#161C24',
                          },
                '& .MuiInputBase-root': {
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                }
                        }}
                        onChange={(e: any) => onChange(e.target.value)}
                        inputRef={ref}
                        value={value}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="account_number"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <TextField
                        style={{ flex: 1 }}
                        label="Acoount number"
                        variant="filled"
                        sx={{
                '& .MuiFilledInput-input': {
                  color: toggle ? 'white' : '#161C24',
                          },
                '& .MuiInputBase-root': {
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                }
                        }}
                        onChange={(e: any) => onChange(e.target.value)}
                        inputRef={ref}
                        value={value}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Account type
                  </FormLabel>
                  <Controller
                    name="account_type"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "" } }: any) => (
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        sx={{ color: toggle ? "white" : "#161C24" }}
                        onChange={(e: any) => onChange(e.target.value)}
                        value={value}
                      >
                        <FormControlLabel
                          control={<Radio />}
                          label="Checking"
                          value="Checking"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Savings"
                          value="Savings"
                        />
                      </RadioGroup>
                    )}
                  />
                </Stack>
          <Typography className="secondary-text-color capitalize-text my-2 " variant="subtitle1">
                  Recipient Address
                </Typography>
                <Stack gap={2} mt={2}>
                  <FormControl variant="filled" style={{ flex: 1 }}>
                    <InputLabel>Country</InputLabel>
                    <Controller
                      name="country"
                      control={control}
                      rules={{ required: true }}
                      shouldUnregister={true}
                      render={({
                        field: { onChange, value = "", ref },
                      }: any) => (
                        <Select
                          label="Country"
                          variant="filled"
                          style={{
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                          }}
                          onChange={(e: any) => onChange(e.target.value)}
                        >
                          <MenuItem
                            style={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: toggle ? 'white' : '#161C24'
                            }}
                  value="BD">Bangladesh</MenuItem>
                          <MenuItem
                            style={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: toggle ? 'white' : '#161C24'
                            }}
                  value="USA">United States of America</MenuItem>
                          <MenuItem
                            sx={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: toggle ? 'white' : '#161C24'
                            }}
                  value="EU">Europe</MenuItem>
                        </Select>
                      )}
                    />
                    <Stack gap={2} mt={2}>
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({
                          field: { onChange, value = "", ref },
                        }: any) => (
                          <TextField
                            style={{ flex: 1 }}
                            label="City"
                            variant="filled"
                            sx={{
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                              },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                    }
                            }}
                            onChange={(e: any) => onChange(e.target.value)}
                            inputRef={ref}
                            value={value}
                          />
                        )}
                      />
                    </Stack>
                    <Stack gap={2} mt={2}>
                      <Controller
                        name="address"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({
                          field: { onChange, value = "", ref },
                        }: any) => (
                          <TextField
                            style={{ flex: 1 }}
                            label="Recipient address"
                            variant="filled"
                            sx={{
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                              },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                    }
                            }}
                            onChange={(e: any) => onChange(e.target.value)}
                            inputRef={ref}
                            value={value}
                          />
                        )}
                      />
                    </Stack>
                    <Stack gap={2} mt={2}>
                      <Controller
                        name="post_code"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({
                          field: { onChange, value = "", ref },
                        }: any) => (
                          <TextField
                            style={{ flex: 1 }}
                            label="Post code"
                            variant="filled"
                            sx={{
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                              },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                    }
                            }}
                            onChange={(e: any) => onChange(e.target.value)}
                            inputRef={ref}
                            value={value}
                          />
                        )}
                      />
                    </Stack>
                  </FormControl>
                </Stack>

                <Stack mt={3}>
            <SubmitButton
              variant="contained"
              type="submit"
            > Confirm
                  </SubmitButton>
                  </Stack>
                  
              </Stack>
            </form>
          </TabPanel>

          <TabPanel value={value} index={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="accountHolderName"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
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
                        inputRef={ref}
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="routing_number"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <TextField
                        style={{ flex: 1 }}
                        label="ACH routing number"
                        variant="filled"
                        sx={{
                '& .MuiFilledInput-input': {
                  color: toggle ? 'white' : '#161C24',
                          },
                '& .MuiInputBase-root': {
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                }
                        }}
                        inputRef={ref}
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                      />
                    )}
                  />
                </Stack>
                <Stack gap={2} mt={2}>
                  <Controller
                    name="account_number"
                    control={control}
                    rules={{ required: true }}
                    shouldUnregister={true}
                    render={({ field: { onChange, value = "", ref } }: any) => (
                      <TextField
                        style={{ flex: 1 }}
                        label="Acoount number"
                        variant="filled"
                        sx={{
                '& .MuiFilledInput-input': {
                  color: toggle ? 'white' : '#161C24',
                          },
                '& .MuiInputBase-root': {
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                }
                        }}
                        inputRef={ref}
                        value={value}
                        onChange={(e: any) => onChange(e.target.value)}
                      />
                    )}
                  />
                </Stack>
          <Typography className="secondary-text-color capitalize-text my-2 mt-5" variant="subtitle1">
                  Recipient Address
                </Typography>
                <Stack gap={2} mt={2}>
                  <FormControl variant="filled" style={{ flex: 1 }}>
                    <InputLabel>Country</InputLabel>
                    <Controller
                      name="country"
                      control={control}
                      rules={{ required: true }}
                      shouldUnregister={true}
                      render={({
                        field: { onChange, value = "", ref },
                      }: any) => (
                        <Select
                          label="Country"
                          variant="filled"
                          style={{
                  backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                  color: toggle ? 'white' : '#161C24'
                          }}
                          onChange={(e: any) => onChange(e.target.value)}
                        >
                          <MenuItem
                            style={{
                              backgroundColor: toggle
                                ? "rgba(255, 255, 255, 0.13)"
                                : "#DFE3E8",
                              color: toggle ? "white" : "#161C24",
                            }}
                            value="BD"
                          >
                            Bangladesh
                          </MenuItem>
                          <MenuItem
                            style={{
                              backgroundColor: toggle
                                ? "rgba(255, 255, 255, 0.13)"
                                : "#DFE3E8",
                              color: toggle ? "white" : "#161C24",
                            }}
                            value="USA"
                          >
                            United States of America
                          </MenuItem>
                          <MenuItem
                            style={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: toggle ? 'white' : '#161C24'
                            }}
                  value="EU">Europe</MenuItem>
                        </Select>
                      )}
                    />
                    <Stack gap={2} mt={2}>
                      <Controller
                        name="city"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({
                          field: { onChange, value = "", ref },
                        }: any) => (
                          <TextField
                            style={{ flex: 1 }}
                            label="City"
                            variant="filled"
                            sx={{
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                              },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                    }
                            }}
                            inputRef={ref}
                            value={value}
                            onChange={(e: any) => onChange(e.target.value)}
                          />
                        )}
                      />
                    </Stack>
                    <Stack gap={2} mt={2}>
                      <Controller
                        name="address"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({
                          field: { onChange, value = "", ref },
                        }: any) => (
                          <TextField
                            style={{ flex: 1 }}
                            label="Recipient address"
                            variant="filled"
                            sx={{
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                              },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                    }
                            }}
                            inputRef={ref}
                            value={value}
                            onChange={(e: any) => onChange(e.target.value)}
                          />
                        )}
                      />
                    </Stack>
                    <Stack gap={2} mt={2}>
                      <Controller
                        name="post_code"
                        control={control}
                        rules={{ required: true }}
                        shouldUnregister={true}
                        render={({
                          field: { onChange, value = "", ref },
                        }: any) => (
                          <TextField
                            style={{ flex: 1 }}
                            label="Post code"
                            variant="filled"
                            sx={{
                    '& .MuiFilledInput-input': {
                      color: toggle ? 'white' : '#161C24',
                              },
                    '& .MuiInputBase-root': {
                      backgroundColor: toggle ? 'rgba(255, 255, 255, 0.09)' : '#DFE3E8'
                    }
                            }}
                            inputRef={ref}
                            value={value}
                            onChange={(e: any) => onChange(e.target.value)}
                          />
                        )}
                      />
                    </Stack>
                  </FormControl>
                </Stack>

                  
                <Stack mt={3}>
            <SubmitButton
              variant="contained"
              type="submit"
            > Confirm
                  </SubmitButton>
                  </Stack>
                  
                </Stack>
            </form>
          </TabPanel>
        </>
      )}
    </Box>
  );
}

