import { Box, Divider, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { getTimeInMMMDDyyyyFomat } from 'frontend/utils';
import { useDispatch } from 'frontend/redux/store';
import { deleteFreeTrial } from 'frontend/redux/slices/viewPage';
import Loader from '../common/Loader';

type FreeTrialCardProps = {
  id: number | string;
  duration: number | string;
  creationDate: number | string;
  offerExpiration: number | string;
  offerLimit: number | string;
};

const FreeTrialCard = (props: FreeTrialCardProps) => {
  const dispatch = useDispatch();
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);

  const handleDeleteFreeTrial = () => {
    if (props?.id) {
      setDeleteLoader(true);
      dispatch(deleteFreeTrial(+props?.id)).then((res: boolean) => {
        if (res) {
          setDeleteLoader(false);
        } else {
          setDeleteLoader(false);
        }
      });
    }
  };

  return (
    <Box className="free-trial-card">
      <Loader loading={deleteLoader} />
      <Stack direction="column">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography className="primary-text-color" variant="body1">
            {`Free trial for ${
              props?.duration === 0 ? 'Unlimited days' : `${props?.duration} days`
            }`}
          </Typography>
          <IconButton size="small" onClick={handleDeleteFreeTrial}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography className="secondary-text-color" variant="body2">
            Link Created
          </Typography>
          <Typography className="primary-text-color" variant="body2">
            {getTimeInMMMDDyyyyFomat(props?.creationDate)}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography className="secondary-text-color" variant="body2">
            Offer Limit
          </Typography>
          <Typography className="primary-text-color" variant="body2">
            {props?.offerLimit === 0 ? 'Unlimited' : `${props.offerLimit} subscribers`}
          </Typography>
        </Stack>
        <Divider />
        <Stack direction="row" justifyContent="space-between">
          <Typography className="secondary-text-color" variant="body2">
            Offer Expiration
          </Typography>
          <Typography className="primary-text-color" variant="body2">
            {props?.offerExpiration === 0 ? 'No Expiry' : `${props?.offerExpiration} days`}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FreeTrialCard;
