import { Box, Tab, Tabs, Typography, useTheme , Grid} from '@mui/material';
import _axios from 'frontend/api/axios';
import PostItemSkeleton from 'frontend/components/common/skeletons/PostItemSkeleton';
import { useLounge } from 'frontend/contexts/LoungeContext';
import { postTypes } from 'frontend/data';
import { PaginationPostsInerface } from 'frontend/interfaces/contextInterface';
import { PostInterface } from 'frontend/interfaces/postInterface';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { ReactNode, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import BuyToken from 'frontend/pages/BuyToken';
import Submenu from 'frontend/components/submenu';

import PostItem from 'frontend/pages/Lounge/PostItem';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
interface RespPost {
  data: { data: PostInterface[] };
  code: number;
  message: string;
  recordsFiltered: number;
  recordsTotal: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const HomeTab = () => {
  const theme = useTheme();

  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBookmarks , setIsLoadingBookmarks] = useState(false)
  // const [bookmarkups, setBookmarkups] = useState([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])


  const {
    counts,
    getUserPostCounts,
    posts,
    setPosts,
    textPosts,
    setTextPosts,
    photoPosts,
    setPhotoPosts,
    videoPosts,
    setVideoPosts,
    paginationPosts,
    setPaginationPosts,
    paginationTextPosts,
    setPaginationTextPosts,
    paginationPhotoPosts,
    setPaginationPhotoPosts,
    paginationVideoPosts,
    setPaginationVideoPosts
  } = useLounge();



  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const postDeleted = (postId: number) => {
    setBookmarkedPosts( bookmarkedPosts.filter((prev) => prev.id !== postId) );
  };

  const setHasNextFalse = (postType: string) => {
    if (postType === postTypes.all.value) {
      setPaginationPosts({ ...paginationPosts, hasNext: false });
    } else if (postType === postTypes.text.value) {
      setPaginationTextPosts({ ...paginationTextPosts, hasNext: false });
    } else if (postType === postTypes.image.value) {
      setPaginationPhotoPosts({ ...paginationPhotoPosts, hasNext: false });
    } else if (postType === postTypes.video.value) {
      setPaginationVideoPosts({ ...paginationVideoPosts, hasNext: false });
    }
  };

  const fetchUserBoookmarks = async () => {
    if (isLoadingBookmarks) return;
    try{
      setIsLoadingBookmarks(true)
      const { data }: any = await _axios.get(`/api/user/get-user-bookmarks/`);
      if(data?.data?.length){
        const bookmarksData = data?.data || []
        const bookMarkedPost = bookmarksData.map((bookmarkRow: any) => {
          return bookmarkRow
        })
        // setBookmarkups(bookMarkedPost)
        setBookmarkedPosts(bookMarkedPost)
      }
      setIsLoadingBookmarks(false);
    } catch(err){
      setIsLoadingBookmarks(false)
    }
  }

  const fetchPosts = async (pagination: PaginationPostsInerface) => {
    if (isLoading || !pagination.hasNext) return;

    try {
      setIsLoading(true);

      const { data }: RespPost = await _axios.post(`/api/lounge/pagination/list/`, pagination);

      setIsLoading(false);

      if (data?.data?.length) {
        if (pagination.post_type === postTypes.all.value) {
          setPosts([...posts, ...data.data]);
          setPaginationPosts(pagination);
        } else if (pagination.post_type === postTypes.text.value) {
          setTextPosts([...textPosts, ...data.data]);
          setPaginationTextPosts(pagination);
        } else if (pagination.post_type === postTypes.image.value) {
          setPhotoPosts([...photoPosts, ...data.data]);
          setPaginationPhotoPosts(pagination);
        } else if (pagination.post_type === postTypes.video.value) {
          setVideoPosts([...videoPosts, ...data.data]);
          setPaginationVideoPosts(pagination);
        }
      } else {
        setHasNextFalse(pagination.post_type);
      }
    } catch (err) {
      setIsLoading(false);
      setHasNextFalse(pagination.post_type);
    }
  };

  // useEffect(()=> {
  //   const bookmarkedPostsData = posts.filter((post) => {
  //     if(bookmarkups.includes(post?.id)){
  //       return post;
  //     }
  //   });
  //   setBookmarkedPosts(bookmarkups)
  // }, [posts , bookmarkups])

  useEffect(() => {
    getUserPostCounts();
  }, []);

  useEffect(() => {
    let list = [];
    let pagination = null;
    if (value === 0) {
      list = JSON.parse(JSON.stringify(posts));
      pagination = JSON.parse(JSON.stringify(paginationPosts));
    } else if (value === 1) {
      list = JSON.parse(JSON.stringify(textPosts));
      pagination = JSON.parse(JSON.stringify(paginationTextPosts));
    } else if (value === 2) {
      list = JSON.parse(JSON.stringify(photoPosts));
      pagination = JSON.parse(JSON.stringify(paginationPhotoPosts));
    } else if (value === 3) {
      list = JSON.parse(JSON.stringify(videoPosts));
      pagination = JSON.parse(JSON.stringify(paginationVideoPosts));
    }
    if (!list?.length) {
      fetchPosts(pagination);
    }
    fetchUserBoookmarks()
  }, [value]);

  return (
    <>
    <Grid container>
      <Submenu title="ALL BOOKMARKS" username="" routes={[]} noTag md={12} handleOpen={undefined} handleClose={undefined} />
      <FlexRow gap="5px" fWrap="wrap" style={{ width: "100%"}}>

        {/* <Box>
          <Tabs
            value={value}
            variant="fullWidth"
            onChange={handleChange}
            sx={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}
          >
            <Tab label={`All Posts (${counts?.all_posts ?? 0})`} />
            <Tab label={`Text Posts (${counts?.text_posts ?? 0})`} />
            <Tab label={`Photo Posts (${counts?.image_posts ?? 0})`} />
            <Tab label={`Video Posts (${counts?.video_posts ?? 0})`} />
          </Tabs>
        </Box> */}
        <Box style={{width: "100%"}}>
            {bookmarkedPosts.map((item: any) => (
              <PostItem
                fetchPosts={fetchPosts}
                canDeletePost={true}
                key={item?.id}
                isBookmarked={true}
                isBookmarksPage={true}
                description={item?.post?.content}
                createdAt={item?.post?.created_at}
                userName={
                  item?.post?.user
                    ? item?.post?.user?.display_name ||
                      item?.post?.user?.first_name ||
                      item?.post?.user?.custom_username
                    : ''
                }
                custom_username={item?.post?.user ? item?.post?.user?.custom_username : ''}
                image={item?.post?.media || null}
                post={item?.post}
                onDelete={postDeleted}
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
      </Grid>
    </>
  );
};

export default HomeTab;
