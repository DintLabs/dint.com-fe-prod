import React,{ useContext } from 'react';
import { FormControl, FormControlLabel, InputLabel, MenuItem, Radio, Select, Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import {countryData} from './country';
import { ThemeContext } from '../../../contexts/ThemeContext';

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  width:100,
  borderRadius: 20
}));

type FirstStepPayload = {
  nextStep: (values : any) => void;
};

const FirstStep = (props:FirstStepPayload) => {
  const { handleSubmit, control, formState } = useForm({
    mode: 'onChange'
  });

  const submitValues = (values: any)=>{
    props.nextStep(values);
  }

  const { toggle } = useContext(ThemeContext);

  return (
    <form onSubmit={handleSubmit(submitValues)}>
      <Stack p={2}>
        <Typography className="secondary-text-color" variant="subtitle1">
        Country of your legal residence
        </Typography>
        <Typography className="primary-text-color" style={{ fontSize: '12px' }} mt={2}>
          Please note that you will not be able to change it later.
        </Typography>
        <Stack direction="row" gap={2} mt={2}>
          <Controller
            name="country"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value = '', ref } }: any) => (
              <FormControl variant="filled" style={{ flex: 1 }}>
                <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
                <Select
                  error={formState.errors?.country?.type === 'required'}
                  label="Country"
                  variant="filled"
                  value={value}
                  inputRef={ref}
                  onChange={(e: any) => onChange(e.target.value)}
                  style={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: toggle ? 'white' : '#161C24'
                  }}
                >
                  {countryData.map((country:string,index:number)=>
                    <MenuItem
                      style={{
                        backgroundColor: toggle ? 'transparent' : '#DFE3E8',
                        color: toggle ? 'white' : '#161C24'
                      }}
                      key={index}
                      value={country}
                    >
                      {country}
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction="row" gap={2} mt={2}>
          <Controller
            name="state"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value = '', ref } }: any) => (
              <FormControl variant="filled" sx={{ flex: 1  , '& .css-y9hmg1-MuiInputBase-root-MuiFilledInput-root' : {color: toggle ? 'white' : '#161C24'}}}>
                <TextField
                  error={formState.errors?.state?.type === 'required'}
                  label="State"
                  variant="filled"
                  value={value}
                  inputRef={ref}
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: `${toggle ? '#fff' : '#161C24'}!important`,
                  }}
                >
                </TextField>
              </FormControl>
            )}
          />
        </Stack>

        <Stack direction="row" gap={2} mt={2}>
          <Controller
            name="city"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value = '', ref } }: any) => (
              <FormControl variant="filled" sx={{ flex: 1 ,'& .css-y9hmg1-MuiInputBase-root-MuiFilledInput-root' : {color: toggle ? 'white' : '#161C24'}}}>
                <TextField
                  error={formState.errors?.city?.type === 'required'}
                  label="City"
                  variant="filled"
                  value={value}
                  inputRef={ref}
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: `${toggle ? '#fff' : '#161C24'}!important`,
                  }}
                >
                </TextField>
              </FormControl>
            )}
          />
        </Stack>
        <Stack direction="row" gap={2} mt={2}>
          <Controller
            name="postal_code"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value = '', ref } }: any) => (
              <FormControl variant="filled" sx={{ flex: 1 ,'& .css-y9hmg1-MuiInputBase-root-MuiFilledInput-root' : {color: toggle ? 'white' : '#161C24'}}}>
                <TextField
                  error={formState.errors?.city?.type === 'required'}
                  label="Postal Code"
                  variant="filled"
                  value={value}
                  inputRef={ref}
                  onChange={(e: any) => onChange(e.target.value)}
                  sx={{
                    backgroundColor: toggle ? 'rgba(255, 255, 255, 0.13)' : '#DFE3E8',
                    color: `${toggle ? '#fff' : '#161C24'}!important`,
                  }}
                >
                </TextField>
              </FormControl>
            )}
          />
        </Stack>
        <Stack direction="row" gap={2} mt={2}>
          <FormControl>
            <FormControlLabel
              value="1"
              control={<Radio />}
              sx={{ color: toggle ? 'white' : '#919eab' }}
              label="Tick here to confirm that you are at least 18 years old and age of majority in your place of residence"
            />
          </FormControl>
        </Stack>
        <Stack mt={2} justifyContent="end" direction="row">
          <SubmitButton
            variant="contained"
            type="submit"
          > Submit
          </SubmitButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default FirstStep;
