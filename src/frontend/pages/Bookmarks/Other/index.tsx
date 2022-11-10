import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Grid,
  Typography,
  useTheme
} from '@mui/material';

import Submenu from 'frontend/components/submenu';
import { postTypes } from "../../../data";
import PostItem from "../../Lounge/PostItem";
import PostItemSkeleton from "../../../components/common/skeletons/PostItemSkeleton";
import { FlexRow } from "../../../reusable/reusableStyled";
import { GetUserBookmark } from "../../../hooks/bookmark";

const Other = () => {
  const theme = useTheme();
  const {data:bookmarkedPosts, loading:isLoading} = GetUserBookmark(postTypes.text.value)

  return (
    <Grid container
          sx={{
            borderLeft: `1px solid ${theme.palette.grey[700]}`,
            borderRight: `1px solid ${theme.palette.grey[700]}`
          }}
    >
      <Submenu title="OTHER" username="" routes={[]} noTag md={12} />
      <FlexRow gap="5px" fWrap="wrap" style={{ width: "100%"}}>
        <Box style={{width: "100%"}}>
          {bookmarkedPosts && bookmarkedPosts.map((post: any) => (
            <PostItem
              fetchPosts={()=>{}}
              canDeletePost={true}
              key={post?.id}
              isBookmarked={true}
              isBookmarksPage={true}
              description={post?.content}
              createdAt={post?.created_at}
              userName={
                  post?.user
                  ? post?.user?.display_name ||
                  post?.user?.first_name ||
                  post?.user?.custom_username
                  : ''
              }
              custom_username={post?.user ? post?.user?.custom_username : ''}
              image={post?.media || null}
              post={post}
              onDelete={()=>{}}
            />
          ))}

          {isLoading && (
            <>
              <PostItemSkeleton />
              <PostItemSkeleton />
              <PostItemSkeleton />
            </>
          )}
        </Box>
      </FlexRow>
      {/*<Box
        style={{
          borderBottom: `1px solid ${theme.palette.grey[700]}`,
          width:"100%"
        }}
      >
        <List>
          <ListItem>
            <ListItemAvatar
              style={{ cursor: 'pointer' }}
            >
              <Avatar style={{width:"60px",height:"60px",marginRight:"10px"}}/>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  style={{ cursor: 'pointer' }}
                  variant="subtitle1"
                  sx={{ color: toggle ? 'text.primary' : '#161C24' }}
                >
                  Max Passa
                </Typography>
              }
              secondary={
                <Typography component="span" variant="caption" sx={{ color: 'text.secondary', }}>
                  @max
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Typography component="span" variant="caption" sx={{ color: 'text.secondary', }}>
                3 hours ago
              </Typography>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Box sx={{ p: 2 }}>
          <Typography component="span" variant="body2" sx={{ color: toggle ? 'text.primary' : '#161C24',fontSize:"16px"}}>
            hii my name is max
          </Typography>
        </Box>

        <Box sx={{ p: 2 }} className="d-flex align-items-center justify-content-between">
          <Stack direction="row">

            <IconButton
              className="d-flex align-items-center justify-content-center"

            >
              <FavoriteBorderRoundedIcon />
              <p className="m-0 small ms-2">0</p>
            </IconButton>


            <IconButton

              className="d-flex align-items-center justify-content-center"
            >
              <MessageRoundedIcon />
              <p className="m-0 small ms-2"> 0</p>
            </IconButton>
            <IconButton  sx={{ fontSize: '12px' }}>
              <MonetizationOnIcon />
              SEND TIP
            </IconButton>
          </Stack>

          <IconButton>
            <BookmarkIcon />
          </IconButton>
        </Box>
      </Box>*/}
    </Grid>
  );
};

export default Other;
