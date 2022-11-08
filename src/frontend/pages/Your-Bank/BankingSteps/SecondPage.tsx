import React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';

type FirstStepPayload = {
  nextStep: () => void;
};

const StyledButton = styled(Button)(({ theme }) => ({
  color:'white',
  borderColor:'white',
}));

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: 20
}));

const SecondPage = (props: FirstStepPayload) => {

  const { handleSubmit, control, formState } = useForm({
    mode: 'onChange'
  });

  const submitValues = async (values: any)=>{
    props.nextStep()
  }

  return (
    <form style={{ padding: 16 }} onSubmit={handleSubmit(submitValues)}>
      <Stack p={2}>
        <Typography className="secondary-text-color capitalize-text mb-2" variant="subtitle1">
          PERSONAL INFORMATION
        </Typography>
        <Typography className="primary-text-color" style={{ fontSize: '12px' }}>
          Fill in your legal name address and attach your government issued picture ID.
        </Typography>
      </Stack>
      <Stack gap={2} mt={2} direction={{ md: 'row', sm: 'column' }}>
        <Controller
          name="first_name"
          control={control}
          rules={{ required:true }}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.first_name?.type === 'required'}
              style={{ flex: 1 }}
              label="First Name"
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          rules={{ required:true }}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.last_name?.type === 'required'}
              style={{ flex: 1 }}
              label="Last Name"
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
      </Stack>
      <Stack direction="column" gap={2} mt={2}>
        <Controller
          name="country"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <FormControl variant="filled" style={{ flex: 1 }}>
              <InputLabel>Country</InputLabel>
              <Select
                error={formState.errors?.country?.type === 'required'}
                label="Country"
                variant="filled"
                value={value}
                inputRef={ref}
                onChange={(e: any) => onChange(e.target.value)}
              >
                <MenuItem value="BD">Bangladesh</MenuItem>
                <MenuItem value="USA">United States of America</MenuItem>
                <MenuItem value="EU">Europe</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="address"
          control={control}
          rules={{ required:true }}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.address?.type === 'required'}
              style={{ flex: 1 }}
              label="Address"
              multiline
              rows={2}
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
      </Stack>
      <Stack direction={{ md: 'row', sm: 'column' }} gap={2} mt={2}>
        <Controller
          name="city"
          control={control}
          rules={{ required:true }}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.city?.type === 'required'}
              style={{ flex: 1 }}
              label="City"
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="zip_code"
          control={control}
          rules={{required:true}}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.zip_code?.type === 'required'}
              style={{ flex: 1 }}
              label="Postal/ZIP"
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
      </Stack>
      <Stack direction={{ md: 'row', sm: 'column' }} gap={2} mt={2}>
        <Controller
          name="twitter"
          control={control}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.twitter?.type === 'required'}
              style={{ flex: 1 }}
              label="Twitter (optional)"
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="instagram"
          control={control}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.instagram?.type === 'required'}
              style={{ flex: 1 }}
              label="Instagram (optional)"
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
      </Stack>
      <Stack direction={{ md: 'row', sm: 'column' }} gap={2} mt={2}>
        <Controller
          name="website"
          control={control}
          rules={{required:true}}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              error={formState.errors?.website?.type === 'required'}
              style={{ flex: 1 }}
              label="Website"
              inputRef={ref}
              variant="filled"
              value={value}
              onChange={(e: any) => onChange(e.target.value)}
            />
          )}
        />
        <Controller
          name="date_of_birth"
          control={control}
          rules={{required:true}}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <DesktopDatePicker
              label="Date of Birth"
              inputRef={ref}
              value={value}
              onChange={(e: any) => onChange(e)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  style={{ flex: 1 }}
                  variant="filled"
                  error={formState.errors?.date_of_birth?.type === 'required'}
                />
              )}
            />
          )}
        />
      </Stack>
      <Stack direction={{ md: 'row', sm: 'column' }} gap={2} mt={2}>
        <Controller
          name="document_type"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <FormControl variant="filled" style={{ flex: 1 }}>
              <InputLabel>Document type</InputLabel>
              <Select
                error={formState.errors?.document_type?.type === 'required'}
                label="Document type"
                variant="filled"
                value={value}
                inputRef={ref}
                onChange={(e: any) => onChange(e.target.value)}
              >
                <MenuItem value="BD">Passport</MenuItem>
                <MenuItem value="USA">Id Card</MenuItem>
                <MenuItem value="EU">Driver License</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Stack>
      <Stack direction={{ md: 'row', sm: 'column' }} gap={2} mt={2}>
        <Controller
          name="file1"
          control={control}
          render={({ field: { onChange, value = '', ref } }: any) => (
            <TextField
              hidden
              type="file"
              id="file1"
              inputRef={ref}
              value={value}
              // onChange={(e: any) => onChange(e.target.files[0])}
            />
          )}
        />
        <StyledButton
          variant="outlined"
          style={{ flex: 1 }}
          color="primary"
          onClick={()=> {
            document.getElementById('file1')?.click()
          }}
        >
          SELECT FILE
        </StyledButton>
      </Stack>
      <Stack mt={2} justifyContent="end" direction="row">
        <SubmitButton
          variant="contained"
          type="submit"
        > SEND FOR APPROVAL
        </SubmitButton>
      </Stack>
    </form>

  );
};

export default SecondPage;