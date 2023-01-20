import { Box, Chip, Divider, IconButton, Typography } from "@mui/material";
import { Stack, useTheme } from "@mui/system";
import UserSubscriptionDetails from "frontend/components/subscriptions/UserSubscriptionDetails";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionsForUser } from "frontend/redux/slices/subscriptions";

import SubscribedPageCardSkeleton from "frontend/components/common/skeletons/SubscribedPageCardSkeleton";
import { AppDispatch, RootState } from "frontend/redux/store";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const allSubscriptions = useSelector(
    (state: RootState) => state?.subscriptions?.allSubscriptions
  );
  const subsData = useSelector((state: RootState) => state?.subscriptions);
  // const activeSubscriptions = useSelector(
  //   (state: RootState) => state?.subscriptions
  // );
  // const expiredSubscriptions = useSelector(
  //   (state: RootState) => state?.subscriptions?.expiredSubscriptions
  // );
  const userData = useSelector((state: RootState) => state?.user?.userData);
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  const [subscriptionsLoader, setSubscriptionsLoader] =
    useState<boolean>(false);
  const [tabConfigObject, setTabConfigObject] = useState<any>([
    { id: 0, title: "All", count: 0, data: [] },
    { id: 1, title: "Active", count: 0, data: [] },
    { id: 2, title: "Expired", count: 0, data: [] },
  ]);

  const activeSubscriptions = useMemo(
    () =>
      allSubscriptions?.data?.filter((el: any) => {
        return el.is_active == true;
      }),
    [allSubscriptions]
  );

  const expiredSubscriptions = useMemo(
    () =>
      allSubscriptions?.data?.filter((el: any) => {
        return el.is_active == false;
      }),
    [allSubscriptions]
  );

  // to fetch the page's subscribers details
  useEffect(() => {
    if (userData?.id) {
      setSubscriptionsLoader(true);
      dispatch(getSubscriptionsForUser(userData?.id)).then((res: boolean) => {
        if (res) {
          setSubscriptionsLoader(false);
        } else {
          setSubscriptionsLoader(false);
        }
      });
    }
  }, [dispatch, userData?.id]);

  //  to set the different subscribers
  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState;
      oldTabs[0].count = allSubscriptions?.total;
      oldTabs[0].data = allSubscriptions?.data;
      return oldTabs;
    });
  }, [allSubscriptions]);
  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState;
      oldTabs[1].count = activeSubscriptions?.length;
      oldTabs[1].data = activeSubscriptions;
      return oldTabs;
    });
  }, [activeSubscriptions]);
  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState;
      oldTabs[2].count = expiredSubscriptions?.length;
      oldTabs[2].data = expiredSubscriptions;
      return oldTabs;
    });
  }, [expiredSubscriptions]);

  const handleTabSelection = (index: number) => {
    setSelectedTabIndex(index);
  };

  const navigate = useNavigate();

  return (
    <Stack
      className="subscriptions-page-container"
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`,
        position: "relative",
      }}>
      {/* main header */}
      <Stack
        direction="row"
        alignItems="center"
        className="container-header"
        spacing={2}
        sx={{ p: { xs: 1, md: 1, xl: 1 } }}>
        <IconButton
          className="primary-text-color"
          size="small"
          onClick={() => navigate(-1)}>
          <AiOutlineArrowLeft className="primary-text-color" />
        </IconButton>
        <Typography
          className="primary-text-color"
          textTransform="uppercase"
          variant="subtitle1"
          sx={{ pt: 0.25 }}>
          SUBSCRIPTIONS
        </Typography>
      </Stack>

      {/* Status and search header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: { xs: 1.5, md: 1.5, xl: 1.5 } }}>
        <Typography
          className="secondary-text-color"
          textTransform="uppercase"
          variant="body2">
          {tabConfigObject[selectedTabIndex].title}
        </Typography>
      </Stack>

      {/* filter chips header */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ px: { xs: 1.5, md: 1.5, xl: 1.5 }, pb: 1 }}>
        {tabConfigObject.map((tab: any) => (
          <Chip
            key={tab.id}
            label={`${tab.title} ${tab.count}`}
            clickable
            className={
              selectedTabIndex === tab.id
                ? "active-chip-color"
                : " inactive-chip-color"
            }
            onClick={() => {
              handleTabSelection(tab.id);
            }}
          />
        ))}
      </Stack>

      <Divider />
      {/* body section */}
      <Box className="container-body">
        {subscriptionsLoader ? (
          <SubscribedPageCardSkeleton numberOfCards={5} />
        ) : tabConfigObject[selectedTabIndex].count > 0 ? (
          <UserSubscriptionDetails
            subscriptions={tabConfigObject[selectedTabIndex].data}
          />
        ) : (
          <Stack justifyContent="center" alignItems="center" sx={{ pt: 18 }}>
            Nothing found
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default Subscriptions;
