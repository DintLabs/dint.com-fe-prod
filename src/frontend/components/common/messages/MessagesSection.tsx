import React, { useEffect, useState, useContext } from 'react';
import InputBase from '@mui/material/InputBase';
import { Box, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import UserListItem from 'frontend/components/messages/UserListItem';
import { RootState, useDispatch, useSelector } from 'frontend/redux/store';
import { messagesActions, searchNewUsers } from 'frontend/redux/slices/messages';
import UserListItemSkeleton from '../skeletons/UserListItemSkeleton';
import { ThemeContext } from '../../../contexts/ThemeContext';

const MessagesSection = (props: any) => {
  const dispatch = useDispatch();

  const searchedUserList = useSelector((state: RootState) => state.messages.searchedUserList);

  const [searchUserPayload, setSearchUserPayload] = useState<{ search: string }>({ search: '' });
  const [searchUserLoader, setSearchUserLoader] = useState<boolean>(false);

  const { toggle } = useContext(ThemeContext);


  useEffect(() => {
    setSearchUserLoader(true);
    dispatch(searchNewUsers(searchUserPayload)).then((res) => {
      if (res) {
        setSearchUserLoader(false);
      } else {
        setSearchUserLoader(false);
      }
    });
  }, [dispatch, searchUserPayload]);

  const sxStyle = {
    width: window.innerWidth < 900 ? '100%' : 450,
    height: window.innerWidth < 900 ? '100%' : 650,
    borderRadius: window.innerWidth < 900 ? 'none' : '15px',
    backgroundColor: toggle ? '#0f1318' : '#DFE3E8 !important'
  };

  return (
    <Box sx={sxStyle} className="add-new-user-modal-container">
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }} mb={1}>
          {window.innerWidth < 900 ? (
            <ArrowBackIosNewIcon
              onClick={() => props.handleClose()}
              style={{ cursor: 'pointer' }}
            />
          ) : (
            <CloseIcon onClick={() => props.handleClose()} style={{ cursor: 'pointer' }} />
          )}

          <Typography component="span" id="modal-modal-title2" variant="h4">
            New Message
          </Typography>
          <Typography component="span" id="modal-modal-title3" variant="h4" mr={1}>
            Next
          </Typography>
        </Box>
        <Divider style={{ width: '100%', marginTop: '5px' }} />
        <Box
          sx={{
            overflow: 'hidden',
            overflowY: 'scroll',
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Typography id="modal-modal-title3" variant="h4" pt={2} pb={2} ml={1}>
            To:
          </Typography>
          <InputBase
            value={searchUserPayload.search}
            fullWidth
            style={{ marginLeft: '5px', color: toggle ? '#919eab' : '#161C24' }}
            placeholder="Search..."
            onChange={(e) => {
              setSearchUserPayload((prevState) => ({
                ...prevState,
                search: e.target.value.trim()
              }));
            }}
          />
        </Box>
        <Divider style={{ width: '100%' }} />
        <Typography id="modal-modal-description" sx={{ mt: 2, ml: 1 }} variant="h4">
          Suggested
        </Typography>
      </Box>

      <Box
        ml={1}
        sx={{
          height: window.innerWidth < 900 ? '100%' : 500,
          overflowY: 'scroll',
          color: 'black',
          marginLeft: '-2px'
        }}
      >
        {searchUserLoader ? (
          <>
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
            <UserListItemSkeleton />
          </>
        ) : (
          searchedUserList.map((user: any) => (
            <UserListItem
              key={user.id}
              id={user.id}
              profile={user.profile_image}
              name={user.display_name || user.custom_username}
              caption={user.caption || ''}
              onClickHandler={() => {
                dispatch(messagesActions.addNewUserInChat(user));
                props.handleClose();
              }}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default MessagesSection;
