import * as React from 'react';

import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import FormControl from '@mui/material/FormControl';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Submenu from 'frontend/components/submenu';
import { Button, Grid, Stack } from '@mui/material';
import GridWithBoxConteiner from 'frontend/reusable/GridWithBoxConteiner';
import { FlexCol } from 'frontend/reusable/reusableStyled';
import { ThemeContext } from '../../../../contexts/ThemeContext';

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const Password = () => {
  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  });
  const { toggle } = React.useContext(ThemeContext);


  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <Grid container>
      <Submenu title="CHANGE PASSWORD" username="" routes={[]} noTag md={12} />

      <GridWithBoxConteiner sx={{backgroundColor: toggle ? '' : '#dfe3e8'}}>
        <FlexCol w="100%">
          <FlexCol w="100%">
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">New password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                sx={{
                  color: toggle ? 'white' : '#919EAB'
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </FlexCol>

          <FlexCol>
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirming new password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                sx={{
                  color: toggle ? 'white' : '#919EAB'
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </FlexCol>
        </FlexCol>
      </GridWithBoxConteiner>
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ width: '100%', margin: '10px' }}
      >
        <Button variant="outlined">Save</Button>
      </Stack>
    </Grid>
  );
};

export default Password;
