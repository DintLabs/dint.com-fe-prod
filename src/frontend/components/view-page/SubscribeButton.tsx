import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';

type SubscribeButtonProps = {
  leftTitle?: string;
  rightTitle?: string;
  disabled?: boolean;
  handleClick?: () => void;
  loading?: boolean;
  unsubscribe?: boolean;
};

const SubscribeButton = (props: SubscribeButtonProps) => {
  const [isHoverOn, setIsHoverOn] = useState<boolean>(false);

  return props?.unsubscribe ? (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className={`disabled-outlined-button-div ${
        isHoverOn ? 'hoverable-disabled-unsubscribe-button' : null
      }`}
      component="div"
      onMouseOver={() => {
        setIsHoverOn(true);
      }}
      onMouseLeave={() => {
        setIsHoverOn(false);
      }}
      onClick={props?.handleClick}
    >
      <Typography variant="body2">{isHoverOn ? 'Unsubscribe' : props.leftTitle}</Typography>
      <Typography variant="caption">{isHoverOn ? '' : props.rightTitle}</Typography>
    </Stack>
  ) : props?.disabled ? (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="disabled-outlined-button-div"
    >
      <Typography variant="body2">{props.leftTitle}</Typography>
      <Typography variant="caption">{props.rightTitle}</Typography>
    </Stack>
  ) : (
    <LoadingButton
      fullWidth
      variant="contained"
      className="subscription-button"
      onClick={props?.handleClick}
      loading={props?.loading}
    >
      <Typography variant="body2">{props.leftTitle}</Typography>
      <Typography variant="caption">{props.rightTitle}</Typography>
    </LoadingButton>
  );
};

export default SubscribeButton;
