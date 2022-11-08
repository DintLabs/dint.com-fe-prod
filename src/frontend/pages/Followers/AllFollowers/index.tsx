import { Stack, Typography } from '@mui/material';
import _axios from 'frontend/api/axios';
import FollowersListItemSkeleton from 'frontend/components/common/skeletons/FollowersListItemSkeleton';
import FollowersItem from 'frontend/components/followers/FollowersItem';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AllFollowers = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await _axios.get('/api/connection/get-follower-list/');
      if (data.code === 200) {
        setRequests(data.data);
      }
    } catch (err: any) {
      console.error('err ===>', err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeRequest = async (fData: any) => {
    const toastId = toast.loading('Removing...');
    try {
      const { data } = await _axios.delete(
        `api/connection/remove-follower-by-user-id/${fData.id}/`
      );
      if (data.code === 200) {
        toast.update(toastId, {
          render: 'Removed request',
          type: 'success',
          isLoading: false
        });
        setRequests((prev) => prev.filter((item: any) => item.id !== fData.id));
      } else {
        toast.update(toastId, {
          render: data.message,
          type: 'error',
          isLoading: false
        });
      }
    } catch (err: any) {
      toast.update(toastId, {
        render: err.message,
        type: 'error'
      });
    }
    setTimeout(() => toast.dismiss(), 2000);
  };

  return (
    <Stack p={2} gap={2}>
      {isLoading && (
        <>
          <FollowersListItemSkeleton />
          <FollowersListItemSkeleton />
          <FollowersListItemSkeleton />
          <FollowersListItemSkeleton />
          <FollowersListItemSkeleton />
        </>
      )}
      {!isLoading &&
        requests.map((item, i) => <FollowersItem key={i} data={item} onRemove={removeRequest} />)}
      {!isLoading && requests.length === 0 && (
        <Typography variant="h5" sx={{ color: 'text.primary', textAlign: 'center' }}>
          No followers yet
        </Typography>
      )}
    </Stack>
  );
};

export default AllFollowers;
