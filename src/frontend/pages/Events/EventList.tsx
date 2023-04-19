import React from 'react';
import { IEvent } from 'frontend/types/event';
import { RootState, useSelector } from 'frontend/redux/store';
import { Box, CircularProgress, Typography } from '@mui/material';
import EventListCard from './EventListCard';

type EventListProps = {
  onEventEdit: (event: IEvent) => void;
};

const EventList = ({ onEventEdit }: EventListProps) => {
  const { lstEvent, isLoading } = useSelector((rootState: RootState) => rootState.event);

  if (isLoading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );

  if (!lstEvent.length)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography component="span">No Events Found. </Typography>
      </Box>
    );

  return (
    <>
      {lstEvent.map((event: IEvent, index: number) => (
        <EventListCard
          key={index}
          event={event}
          onEventEdit={onEventEdit}
        />
      ))}
    </>
  );
};

export default EventList;
