import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import { useDispatch } from 'frontend/redux/store';
import { HOME_SIDE_MENU, setNewHomeSliceChanges } from 'frontend/redux/slices/newHome';

type UseRichMessagePayload = {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function useRichMessage({ text, className = '', style = {} }: UseRichMessagePayload) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const messageContent: JSX.Element[] = useMemo(() => {
    if (!text) return [];

    const words = text.split(' ').map((w) => w.trim());
    return words.map((word, i) => {
      if (word.startsWith('@')) {
        const username = word.slice(1);

        return (
          <Typography
            key={i}
            component="span"
            className={className}
            sx={{ ...style, color: '#4AA081', cursor: 'pointer' }}
            onClick={() => {
              dispatch(setNewHomeSliceChanges({ selectedMenu: HOME_SIDE_MENU.HOME }));
              navigate(`/${username}`);
            }}
          >
            {`${word} `}
          </Typography>
        );
      }
      return (
        <Typography key={i} component="span" className={className} sx={style}>
          {`${word} `}
        </Typography>
      );
    })
  }, [className, dispatch, navigate, style, text]);

  return messageContent;
}
