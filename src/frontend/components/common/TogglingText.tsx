import { Typography } from '@mui/material';
import React, { useState } from 'react';

type TogglingTextProps = {
  text: string;
  thresoldLength: number;
};

const TogglingText = (props: TogglingTextProps) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const toggleDescriptionShow = () => {
    setShowDescription((prevState) => !prevState);
  };

  return (
    <>
      <Typography component="span" className="secondary-text-color" sx={{ wordBreak: 'break-all' }}>
        {showDescription
          ? props.text
          : props.text?.length > props.thresoldLength
          ? props.text?.slice(0, props.thresoldLength).concat('...')
          : props.text}
      </Typography>

      {props.text?.length > props.thresoldLength ? (
        <Typography
          component="div"
          className="link-text-color cursor-pointer"
          onClick={toggleDescriptionShow}
        >
          {!showDescription ? 'Show More' : 'Show Less'}
        </Typography>
      ) : null}
    </>
  );
};

export default TogglingText;
