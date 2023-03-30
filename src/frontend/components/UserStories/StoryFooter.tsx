import React from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import _axios from 'frontend/api/axios';
import { MdDelete } from 'react-icons/md';
import { Box, IconButton, TextField } from '@mui/material';
import { RootState, useDispatch } from 'frontend/redux/store';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { sendMessage } from 'frontend/redux/slices/messages';
import TipPopUp from 'frontend/components/tip/TipPopUp';
import { IUserOwnStories } from 'frontend/types/lounge';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { deleteStory } from 'frontend/redux/slices/lounge';

type StoryFooterProps = {
  username: string;
  story: IUserOwnStories;
};

function StoryFooter({
  username,
  story,
}: StoryFooterProps) {
  const dispatch = useDispatch();
  const { toggle } = React.useContext(ThemeContext);
  const loggedInUser = useSelector((state: RootState) => state.user.userData);

  const [message, setMessage] = React.useState<string>('');
  const [tipOpened, setTipOpened] = React.useState<boolean>(false);
  const [userData, setUserData] = React.useState<UserDataInterface | null>(null);
  const isOwner = React.useMemo(
    () => loggedInUser?.custom_username === username,
    [loggedInUser, username],
  );

  const handleMessageSend = React.useCallback(async () => {
    if (isOwner) return;

    if (message.trim().length > 0 && loggedInUser) {
      const result = await dispatch(sendMessage({
        sender: `${loggedInUser.id}`,
        reciever: `${story.user}`,
        content: message.trim(),
        media: ''
      }));

      if (result) {
        toast.success('Your message has been sent.');
      }
      setMessage('');
    }
  }, [isOwner, dispatch, loggedInUser, message, story.user]);

  const handleTipSend = React.useCallback(async () => {
    if (isOwner) return;

    try {
      const payload = { custom_username: username };
      const { data } = await _axios.post('/api/user/get-profile-by-username/', payload);

      if (data.code === 200) {
        setUserData(data.data);
        setTipOpened(true);
      } else {
        toast.error('User is not available for tip.');
      }
    } catch (error) {
      toast.error('User is not available for tip.');
    }
  }, [isOwner, username]);

  const handleDelete = async () => {
    if (!isOwner) return;

    // TODO: uncomment after API implementation
    // await dispatch(deleteStory(story.id));
    console.log('Mocked story delete:', story.id);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        position: 'absolute',
        bottom: 15,
        left: 0,
        width: '100%',
        padding: '0 10px',
        zIndex: 999,
        '@media screen and (max-width: 899px)': {
          position: 'sticky',
        },
        flexDirection: isOwner ? 'row-reverse' : 'row',
      }}
    >
      {isOwner ? (
        <IconButton onClick={handleDelete}>
          <MdDelete />
        </IconButton>
      ) : (
        <>
          <TextField
            fullWidth
            color="secondary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleMessageSend();
              }
            }}
            placeholder="Send Message"
            sx={{
              color: toggle ? 'white' : '#161C24',
              height: 40,
              '.MuiInputBase-root': {
                borderRadius: '25px',
                '.MuiInputBase-input': {
                  height: '40px !important',
                  padding: '0 14px',
                  outline: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: 'transparent',
                    boxShadow: 'none',
                  },
                  '&:focus': {
                    boxShadow: 'none',
                    outline: 'none',
                    borderColor: 'red',
                  },
                },
              },
            }}
          />

          <IconButton
            onClick={() => console.log(story)}
            sx={{ fontSize: '12px' }}
          >
            <FavoriteBorderRoundedIcon />
          </IconButton>

          <IconButton
            onClick={handleTipSend}
            sx={{ fontSize: '12px' }}
          >
            <MonetizationOnIcon />
          </IconButton>

          {tipOpened && (
            <TipPopUp
              user={userData}
              onClose={() => setTipOpened(false)}
              openPopUpTip={tipOpened}
              onOpen={() => {}}
              setOpenPopUpTip={setTipOpened}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default StoryFooter;
