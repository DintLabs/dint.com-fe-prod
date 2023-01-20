import { Box, Stack, styled } from "@mui/system";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "frontend/redux/store";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import {
  getCampaignTypeLabelFromValue,
  getTimeInMMMDDyyyyFomat,
} from "frontend/utils";
import SubscribeButton from "./SubscribeButton";
import { ThemeContext } from "../../contexts/ThemeContext";

const Accordion = styled((props: any) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

type SubscriptionSectionProps = {
  containerRadius?: number;
  containerBorder?: number;
  freeTrialDetails?: any;
  monthlySubscriptionPrice?: number;
  subscriptionBundles?: any;
  promotionalCampaign?: any;
  handleSubscriptionModalOpen: () => void;
  setSelectedSubscripition: Function;
  isCreator?: boolean;
  isSubscriber?: boolean;
  handleUnsubscriptionModalOpen?: () => void;
  pageSubscription?: any;
};

const SubscriptionSection = (props: SubscriptionSectionProps) => {
  const handleSubscribe = (payload: any) => {
    props.handleSubscriptionModalOpen();
    props.setSelectedSubscripition(payload);
  };
  const { toggle } = useContext(ThemeContext);
  const pageData = useSelector((state: RootState) => state?.viewPage?.pageData);

  return props?.isSubscriber ? (
    <Box
      className="subscriptions-container"
      sx={{
        borderRadius: props.containerRadius,
        border: `${props.containerBorder}px solid`,
      }}>
      <Accordion
        expanded
        className="accordion-container"
        sx={{
          backgroundColor: toggle
            ? "rgba($color: $primary-color, $alpha: 0.1)"
            : "white",
        }}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography
            className="primary-text-color"
            textTransform="uppercase"
            variant="body2">
            Subscription
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-details">
          <SubscribeButton
            leftTitle="Subscribed"
            rightTitle={`$${pageData?.page_subscription[0]?.total_amount} per month`}
            handleClick={props?.handleUnsubscriptionModalOpen}
            unsubscribe={props?.isSubscriber}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  ) : (
    <Box
      className="subscriptions-container"
      sx={{
        borderRadius: props.containerRadius,
        border: `${props.containerBorder}px solid`,
      }}>
      {props?.freeTrialDetails?.length > 0 ? (
        <Accordion
          expanded
          className="accordion-container"
          sx={{
            backgroundColor: toggle
              ? "rgba($color: $primary-color, $alpha: 0.1)"
              : "white",
          }}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Stack direction="column">
              <Typography
                className="primary-text-color"
                textTransform="uppercase"
                variant="body2">
                {`Free Trial - ${props?.freeTrialDetails?.[0]?.trial_duration} days`}
              </Typography>
              <Typography
                className="secondary-text-color"
                variant="caption">{`left ${
                props?.freeTrialDetails?.[0]?.offer_limit_left
              } - ends on ${getTimeInMMMDDyyyyFomat(
                props?.freeTrialDetails?.[0]?.expiration_date
              )}`}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <SubscribeButton
              leftTitle="Subscribe"
              rightTitle="For free"
              handleClick={() =>
                handleSubscribe({
                  subscription_type: 1,
                  free_trial: props?.freeTrialDetails?.[0]?.id,
                })
              }
              disabled={props?.isCreator}
            />
          </AccordionDetails>
        </Accordion>
      ) : null}
      <Accordion
        expanded
        className="accordion-container"
        sx={{
          backgroundColor: toggle
            ? "rgba($color: $primary-color, $alpha: 0.1)"
            : "white",
        }}>
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Typography
            className="primary-text-color"
            textTransform="uppercase"
            variant="body2">
            Subscription
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="accordion-details">
          <SubscribeButton
            leftTitle="Subscribe"
            // rightTitle={`$${props.isCreator ? (pageData?.page_subscription[0]?.total_amount):(props.monthlySubscriptionPrice)} per month`}
            rightTitle={`$${props.monthlySubscriptionPrice} per month`}
            handleClick={() => handleSubscribe({ subscription_type: 2 })}
            disabled={props?.isCreator}
          />
        </AccordionDetails>
      </Accordion>
      {props.promotionalCampaign?.length > 0 ? (
        <Accordion
          className="accordion-container"
          sx={{
            backgroundColor: toggle
              ? "rgba($color: $primary-color, $alpha: 0.1)"
              : "white",
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Stack direction="column" spacing={1}>
              <Typography
                className="primary-text-color"
                textTransform="uppercase"
                variant="body2">
                {`Limited Offer - ${props?.promotionalCampaign?.[0]?.discount_percentage}% offer 31 days!`}
              </Typography>
              <Typography variant="caption" className="secondary-text-color">
                {`${getCampaignTypeLabelFromValue(
                  props?.promotionalCampaign?.[0]?.campaign_type
                )} - left ${
                  props?.promotionalCampaign?.[0]?.offer_limit_left
                } - ends on ${getTimeInMMMDDyyyyFomat(
                  props?.promotionalCampaign?.[0]?.expiration_date
                )}`}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <Stack direction="column" spacing={2}>
              {props?.promotionalCampaign?.[0]?.message ? (
                <Box className="campaign-message">
                  <Typography variant="body2">
                    {props?.promotionalCampaign?.[0]?.message}
                  </Typography>
                </Box>
              ) : null}
              <SubscribeButton
                leftTitle={`31 days (${props?.promotionalCampaign?.[0]?.discount_percentage}% off)`}
                rightTitle={`$${props?.promotionalCampaign?.[0]?.discount_price} total`}
                handleClick={() =>
                  handleSubscribe({
                    subscription_type: 3,
                    promotion_campaign: props?.promotionalCampaign?.[0]?.id,
                  })
                }
                disabled={props?.isCreator}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>
      ) : null}

      {props?.subscriptionBundles?.length > 0 ? (
        <Accordion
          className="accordion-container"
          sx={{
            backgroundColor: toggle
              ? "rgba($color: $primary-color, $alpha: 0.1)"
              : "white",
          }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography
              className="primary-text-color"
              textTransform="uppercase"
              variant="body2">
              Subscription Bundles
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="accordion-details">
            <Stack direction="column" spacing={2}>
              {props?.subscriptionBundles?.map((bundle: any) => (
                <SubscribeButton
                  key={bundle?.id}
                  leftTitle={`${bundle?.validity_in_months} months (${bundle?.discount}% off)`}
                  rightTitle={`$${bundle?.discount_price} total`}
                  handleClick={() =>
                    handleSubscribe({
                      subscription_type: 4,
                      subscription_tier: bundle?.id,
                    })
                  }
                  disabled={props?.isCreator}
                />
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </Box>
  );
};

export default SubscriptionSection;
