import React, { useContext, useState } from 'react';
import { Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ContactSupportSharpIcon from '@mui/icons-material/ContactSupportSharp';
import _ from 'lodash';
import FirstStep from './BankingSteps/FirstStep';
import SecondPageUsa from './BankingSteps/SecondPageUsa';
import SecondPageOther from './BankingSteps/SecondPageOther';
import { ThemeContext } from '../../contexts/ThemeContext';

const BankContainer = () => {
  const [state,setState] = useState<any>({
    country:null,
    active:0
  });
  const theme = useTheme();
  const { toggle } = useContext(ThemeContext);

  const handleNextStep = (item = null) => {
    if (state.active !== 2) {
      setState((oldState:any)=>({
        ...oldState,
        country:item,
        active:state.active + 1
      }));
    }
  }

  const handlePreviousStep = () => {
    if (state.active !== 0) {
      setState((oldState:any)=>({
        ...oldState,
        active:state.active - 1
      }));
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
            overflow:'auto'
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
              <ContactSupportSharpIcon sx={{ color: toggle ? 'white' : '#919eab' }}/>
            </Stack>
          </Stack>

          {state.active === 0 && <FirstStep nextStep={handleNextStep}/>}
          {state.active === 1 && (
            <>
              {_.includes(['United States','Canada'],state.country)
                ? <SecondPageUsa nextStep={handleNextStep}/>
                : <SecondPageOther nextStep={handleNextStep}/>
              }
            </>
          )}
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default BankContainer;
