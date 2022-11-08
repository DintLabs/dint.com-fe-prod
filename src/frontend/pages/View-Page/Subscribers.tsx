import { Box, Chip, Divider, IconButton, Typography } from '@mui/material';
import { Stack, useTheme } from '@mui/system';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import PageSubscribersDetails from 'frontend/components/subscribers/PageSubscribersDetails';
import { useSelector } from 'react-redux';
import { useDispatch } from 'frontend/redux/store';
import { getSubscribersForPage } from 'frontend/redux/slices/subscribers';

import SubscriberCardSkeleton from 'frontend/components/common/skeletons/SubscriberCardSkeleton';
import { TabConfigObjectInterface } from 'frontend/interfaces/reduxInterfaces';
import { useNavigate } from 'react-router';

const Subscribers = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allSubscribers = useSelector((state: any) => state?.subscribers?.allSubscribers);
  const activeSubscribers = useSelector((state: any) => state?.subscribers?.activeSubscribers);
  const expiredSubscribers = useSelector((state: any) => state?.subscribers?.expiredSubscribers);
  const pageData = useSelector((state: any) => state?.page?.pageData);

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const [subscribersLoader, setSubscriberLoader] = useState<boolean>(false);
  const [tabConfigObject, setTabConfigObject] = useState<TabConfigObjectInterface[]>([
    { id: 0, title: 'All', count: 0, data: [] },
    { id: 1, title: 'Active', count: 0, data: [] },
    { id: 2, title: 'Expired', count: 0, data: [] }
  ]);

  // to fetch the page's subscribers details
  useEffect(() => {
    if (pageData?.id) {
      setSubscriberLoader(true);
      dispatch(getSubscribersForPage(pageData?.id)).then((res: boolean) => {
        if (res) {
          setSubscriberLoader(false);
        } else {
          setSubscriberLoader(false);
        }
      });
    }
  }, [dispatch, pageData?.id]);

  //  to set the different subscribers
  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState;
      oldTabs[0].count = allSubscribers?.total;
      oldTabs[0].data = allSubscribers?.data;
      return oldTabs;
    });
  }, [allSubscribers]);

  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState;
      oldTabs[1].count = activeSubscribers?.total;
      oldTabs[1].data = activeSubscribers?.data;
      return oldTabs;
    });
  }, [activeSubscribers]);

  useEffect(() => {
    setTabConfigObject((prevState: any) => {
      const oldTabs = prevState;
      oldTabs[2].count = expiredSubscribers?.total;
      oldTabs[2].data = expiredSubscribers?.data;
      return oldTabs;
    });
  }, [expiredSubscribers]);

  const handleTabSelection = (index: number) => {
    setSelectedTabIndex(index);
  };

  return (
    <Stack
      className="subscribers-page-container"
      sx={{
        borderLeft: `1px solid ${theme.palette.grey[700]}`,
        borderRight: `1px solid ${theme.palette.grey[700]}`,
        position: 'relative',
        width: window.innerWidth < 1000 ? '100%' : '70%'
      }}
    >
      {/* main header */}

      <Stack
        direction="row"
        alignItems="center"
        className="container-header"
        spacing={2}
        sx={{ p: { xs: 1, md: 1, xl: 1 } }}
      >
        {window.innerWidth < 1000 ? (
          <IconButton className="primary-text-color" size="small">
            <AiOutlineArrowLeft
              className="primary-text-color"
              onClick={() => {
                navigate(`/${pageData?.page_name}`);
              }}
            />
          </IconButton>
        ) : null}
        <Typography
          className="primary-text-color"
          textTransform="uppercase"
          variant="subtitle1"
          sx={{ pt: 0.25 }}
        >
          Subscribers
        </Typography>
      </Stack>

      {/* Status and search header */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: { xs: 1.5, md: 1.5, xl: 1.5 } }}
      >
        <Typography className="secondary-text-color" textTransform="uppercase" variant="body2">
          {tabConfigObject[selectedTabIndex].title}
        </Typography>
      </Stack>

      {/* filter chips header */}
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ px: { xs: 1.5, md: 1.5, xl: 1.5 }, pb: 1 }}
      >
        {tabConfigObject.map((tab: any) => (
          <Chip
            key={tab.id}
            label={`${tab.title} ${tab.count}`}
            clickable
            className={selectedTabIndex === tab.id ? 'active-chip-color' : ' inactive-chip-color'}
            onClick={() => {
              handleTabSelection(tab.id);
            }}
          />
        ))}
      </Stack>

      <Divider />
      {/* body section */}
      <Box className="container-body">
        {subscribersLoader ? (
          <SubscriberCardSkeleton numberOfCards={5} />
        ) : tabConfigObject[selectedTabIndex].count > 0 ? (
          <PageSubscribersDetails subscribers={tabConfigObject[selectedTabIndex].data} />
        ) : (
          <Stack justifyContent="center" alignItems="center" sx={{ pt: 18 }}>
            Nothing found
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default Subscribers;
