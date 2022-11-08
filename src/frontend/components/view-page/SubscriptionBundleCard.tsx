import { CircularProgress, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type SubscriptionBundleCardProps = {
  months: number;
  discount: number;
  deleteLoader: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
};

const SubscriptionBundleCard = (props: SubscriptionBundleCardProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      className="bundle-container"
    >
      <Stack direction="row" spacing={2}>
        <Typography className="primary-text-color">{`${props?.months} Months`}</Typography>
        <Typography className="primary-text-color">{`${props?.discount}% Off`}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <IconButton size="small" onClick={props?.handleEdit}>
          <EditIcon />
        </IconButton>
        {!props.deleteLoader ? (
          <IconButton size="small" onClick={props?.handleDelete}>
            <DeleteIcon />
          </IconButton>
        ) : (
          <CircularProgress size="1.5rem" />
        )}
      </Stack>
    </Stack>
  );
};

export default SubscriptionBundleCard;
