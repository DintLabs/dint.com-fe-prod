import React from 'react';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';

type FirstStepPayload = {
  nextStep: (item?: any) => void;
};
const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  borderRadius: 20
}));

const ThirdPage = (props: FirstStepPayload) => {
  const navigate = useNavigate()
  const onWithdraw = () => {
    // navigate("/en/fiat/withdraw/EUR");
    navigate("/en/fiat/withdraw")
  }

  return (
    <>
      <Stack p={2}>
        <Typography className="secondary-text-color" variant="subtitle1">
      Your bank account was added successfully 
        </Typography>
        <Typography className="primary-text-color" style={{ fontSize: '12px' }}>
          Please allow 24-48 hours for review
        </Typography>
      </Stack>
      <Stack p={2} direction="row" justifyContent="end">
        <Tooltip title="We recommand using mobaile device or device with camera to pass this verification step"
                 enterTouchDelay={0}
                 placement="top"
                 arrow
        >
          <IconButton>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <SubmitButton
          sx = {{mr : 5}}
          onClick={onWithdraw}
          variant="contained"
          type="submit"
        > Withdraw 
        </SubmitButton>
        <SubmitButton
          // onClick={props.nextStep}
          variant="contained"
          type="submit"
        > Verification
        </SubmitButton>
      </Stack>
    </>
  );
};

export default ThirdPage;