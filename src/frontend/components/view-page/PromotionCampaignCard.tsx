import { Box, Divider, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCampaignTypeLabelFromValue, getTimeInMMMDDyyyyFomat } from 'frontend/utils';
import { useDispatch } from 'react-redux';
import { deleteCampaign } from 'frontend/redux/slices/viewPage';
import Loader from '../common/Loader';

type PromotionCampaignCardProps = {
  campaignDetails: any;
};

const PromotionCampaignCard = (props: PromotionCampaignCardProps) => {
  const dispatch = useDispatch<any>();
  const [deleteLoader, setDeleteLoader] = useState<boolean>(false);

  const handleDeletePromotionCampaign = () => {
    if (props?.campaignDetails?.id >= 0) {
      setDeleteLoader(true);
      dispatch(deleteCampaign(props?.campaignDetails?.id)).then(() => {
        setDeleteLoader(false);
      });
    }
  };
  return (
    <Stack direction="column" className="promotion-campaign-card">
      <Loader loading={deleteLoader} />
      <Stack
        direction="row"
        className="promotion-title"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="column">
          <Typography variant="body1" className="primary-text-color">
            {`Limited offer - ${props?.campaignDetails?.discount_percentage}% off for 31 days!`}
          </Typography>
          <Typography
            variant="body2"
            className="secondary-text-color"
          >{`For ${getCampaignTypeLabelFromValue(
            props?.campaignDetails?.campaign_type
          )?.toLowerCase()}`}</Typography>
        </Stack>
        <IconButton size="small" onClick={handleDeletePromotionCampaign}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
      {props?.campaignDetails?.message ? (
        <Box className="campaign-message">
          <Typography variant="body2" className="primary-text-color">
            {props?.campaignDetails?.message}
          </Typography>
        </Box>
      ) : null}
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" className="secondary-text-color">
          Started
        </Typography>
        <Typography variant="body2" className="primary-text-color">
          {getTimeInMMMDDyyyyFomat(props?.campaignDetails?.created_at)}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" className="secondary-text-color">
          Limit
        </Typography>
        <Typography variant="body2" className="primary-text-color">
          {`${props?.campaignDetails?.offer_limit} Subscribers`}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" className="secondary-text-color">
          Claims count
        </Typography>
        <Typography variant="body2" className="primary-text-color">
          0
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PromotionCampaignCard;
