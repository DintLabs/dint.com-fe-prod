/* eslint-disable jsx-a11y/media-has-caption */
import { CircularProgress, Dialog, IconButton, Stack } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import React from 'react';

type ViewMediaModalProps = {
  selectedMediaId: number | null;
  type: 'image' | 'video';
  open: boolean;
  handleClose: () => void;
  source: any;
  isFirstPost: boolean;
  isLastPost: boolean;
  renderNextMedia: (mediaId: number) => void;
  renderPrevMedia: (mediaId: number) => void;
  loading: boolean;
};

const ViewMediaModal = (props: ViewMediaModalProps) => {
  return (
    <Dialog
      open={props?.open}
      onClose={props?.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="view-media-modal"
    >
      {!props?.isFirstPost ? (
        <IconButton
          className="media-dialog-left-navigation-icon"
          onClick={() => {
            if (props?.selectedMediaId) props?.renderPrevMedia(props?.selectedMediaId);
          }}
        >
          <ArrowLeftIcon />
        </IconButton>
      ) : null}
      {!props?.isLastPost ? (
        <IconButton
          className="media-dialog-right-navigation-icon"
          onClick={() => {
            if (props?.selectedMediaId) props?.renderNextMedia(props?.selectedMediaId);
          }}
          disabled={props?.loading}
        >
          <ArrowRightIcon />
        </IconButton>
      ) : null}
      {props?.loading ? (
        <Stack justifyContent="center" alignItems="center" width={300} height={300}>
          <CircularProgress />
        </Stack>
      ) : props?.type === 'image' ? (
        <img src={props?.source} alt="Not Displayed" />
      ) : (
        <video key={props?.selectedMediaId} className="video-dialog" controls autoPlay>
          <source src={props?.source} id="video_here" />
          Your browser does not support HTML5 video.
        </video>
      )}
    </Dialog>
  );
};

export default ViewMediaModal;
