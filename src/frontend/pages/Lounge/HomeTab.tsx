import { Avatar, Box, Grid, ListItemAvatar, Tab, Tabs, Typography, useTheme } from '@mui/material';
import _axios from 'frontend/api/axios';
import PostItemSkeleton from 'frontend/components/common/skeletons/PostItemSkeleton';
import { useLounge } from 'frontend/contexts/LoungeContext';
import { postTypes } from 'frontend/data';
import { PaginationPostsInerface } from 'frontend/interfaces/contextInterface';
import { PostInterface } from 'frontend/interfaces/postInterface';
import { ReactNode, SyntheticEvent, useCallback, useContext, useEffect, useState } from 'react';
import BuyToken from 'frontend/pages/BuyToken';
import storyImage from 'frontend/assets/img/web3/story.png'


import AddPost from './AddPost';
import './navbarTab.css';
import PostItem from './PostItem';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { useNavigate } from 'react-router';

interface Props {
  createPost: Function;
}

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

const HomeTab = ({ createPost }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');
  const { toggle } = useContext(ThemeContext);

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

  const postDeleted = (postId: number) => {
    setPosts(posts.filter((prev) => prev.id !== postId));
    setTextPosts(textPosts.filter((prev) => prev.id !== postId));
    setPhotoPosts(photoPosts.filter((prev) => prev.id !== postId));
    setVideoPosts(videoPosts.filter((prev) => prev.id !== postId));
    getUserPostCounts();
  };

  const handleScroll = useCallback(() => {
    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const { body } = document;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const currentHeight = windowHeight + window.pageYOffset;

    if (currentHeight + 900 >= docHeight) {
      console.log('handleScroll called ===>');
      if (!isLoading) {
        let pagination = null;
        if (value === 0) {
          pagination = paginationPosts;
        } else if (value === 1) {
          pagination = paginationTextPosts;
        } else if (value === 2) {
          pagination = paginationPhotoPosts;
        } else if (value === 3) {
          pagination = paginationVideoPosts;
        }
        if (pagination && !isLoading && pagination.hasNext) {
          fetchPosts({ ...pagination, start: pagination.start + 5 });
        }
      }
    }
  }, [
    paginationPosts,
    paginationPhotoPosts,
    paginationTextPosts,
    paginationVideoPosts,
    isLoading,
    value
  ]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
  }, [value]);

  return (
    <Box
      id="postsListScrollableDiv"
      style={{
        // borderLeft: `1px solid ${theme.palette.grey[700]}`,
        // borderRight: `1px solid ${theme.palette.grey[700]}`
      }}
    >
      {/* <AddPost createPost={createPost} widthScreen={0} /> */}
      <Box sx={{
        display: 'flex',
        width: '100%',
        margin: '10px 0',
        padding: '10px 0'
      }}>
        <Box sx={{ width: '60%' }}>
          <Box sx={{ overflow: 'hidden' }}>
            <ListItemAvatar
              style={{ cursor: "pointer", display: 'flex', gap: '10px' }}
            >
              {Array.from({ length: 8 }, (_, i) =>
                <div key={i} style={{ textAlign: 'center', width: 'fit-content' }}>
                  <Avatar src={storyImage} sx={{ width: 80, height: 80 }} />
                  <Typography variant='h5' sx={{ fontWeight: '600', marginTop: '10px', color: toggle ? 'text.primary' : '#161C24' }}>
                    Karry Wee
                  </Typography>
                </div>
              )}
            </ListItemAvatar>
          </Box>
          <Box>
            <Tabs
              value={value}
              variant="fullWidth"
              onChange={handleChange}
              sx={{ borderBottom: `1px solid ${theme.palette.grey[700]}` }}
            >
              <Tab label={`All  (${counts?.all_posts ?? 0})`} />
              <Tab label={`Text (${counts?.text_posts ?? 0})`} />
              <Tab label={`Photos  (${counts?.image_posts ?? 0})`} />
              <Tab label={`Videos  (${counts?.video_posts ?? 0})`} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {posts.map((item) => (
              <PostItem
                fetchPosts={fetchPosts}
                canDeletePost={true}
                key={item?.id}
                description={item?.content}
                createdAt={item?.created_at}
                userName={
                  item?.user
                    ? item?.user?.display_name ||
                    item?.user?.first_name ||
                    item?.user?.custom_username
                    : ''
                }
                custom_username={item?.user ? item?.user?.custom_username : ''}
                image={item?.media || null}
                post={item}
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
          </TabPanel>
          <TabPanel value={value} index={1}>
            {textPosts.map((item, i) => (
              <PostItem
                fetchPosts={fetchPosts}
                canDeletePost={true}
                key={`textPosts_${i}`}
                description={item?.content}
                createdAt={item?.created_at}
                userName={item?.user?.display_name || item?.user?.custom_username}
                custom_username={item?.user?.custom_username}
                image={item?.media || null}
                post={item}
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
          </TabPanel>
          <TabPanel value={value} index={2}>
            {photoPosts.map((item, i) => (
              <PostItem
                fetchPosts={fetchPosts}
                canDeletePost={true}
                key={`photoPosts_${i}`}
                description={item?.content}
                createdAt={item?.created_at}
                userName={item?.user?.display_name || item?.user?.custom_username}
                custom_username={item?.user?.custom_username}
                image={item?.media || null}
                post={item}
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
          </TabPanel>

          <TabPanel value={value} index={3}>
            {videoPosts.map((item, i) => (

              <PostItem
                fetchPosts={fetchPosts}
                canDeletePost={true}
                key={`videoPosts_${i}`}
                description={item?.content}
                createdAt={item?.created_at}
                userName={item?.user?.display_name || item?.user?.custom_username}
                custom_username={item?.user?.custom_username}
                image={item?.media || null}
                post={item}
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
          </TabPanel>
        </Box>
        <Box sx={{
          marginLeft: '5rem',
          width: '30%'
        }}>
          <Box sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            gap: '12px'
          }}>

            <Avatar src={savedUser?.profile_image} sx={{ width: 50, height: 50 }} />
            <div>
              <Typography variant="h4" sx={{ color: toggle ? 'text.primary' : '#161C24' }}>
                {savedUser.display_name}
              </Typography>
              <Typography variant="h5" sx={{ color: 'text.secondary' }} >
                @{savedUser.custom_username}
              </Typography>
            </div>
          </Box>
          <Box sx={{
            marginTop: '2rem',
            marginLeft: '10px',
          }}>
            <Typography variant="h4" sx={{ color: toggle ? 'text.primary' : '#161C24' }} mb={4}>
              Suggestions
            </Typography>


            {Array.from({ length: 5 }, (_, i) =>
              <Box key={i} sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                gap: '12px',
                marginTop: '12px'
              }}>

                <Avatar src={savedUser?.profile_image} sx={{ width: 35, height: 35 }} />
                <div>
                  <Typography variant="h5" sx={{ color: toggle ? 'text.primary' : '#161C24' }}>
                    Lucas Williams
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary' }} >
                    @username
                  </Typography>
                </div>
              </Box>
            )}
            <Grid direction='row' gap={2} sx={{ display: 'flex', marginTop: '30px' }}>
              <div onClick={() => navigate('/terms')}>
                <Typography variant="h6" sx={{ color: 'text.secondary', cursor: 'pointer' }} >
                  Terms of Service
                </Typography>
              </div>
              <div onClick={() => navigate('/privacy')}>
                <Typography variant="h6" sx={{ color: 'text.secondary', cursor: 'pointer' }} >
                  Privacy Policy
                </Typography>
              </div>
              <div onClick={() => navigate('/cookies')}>
                <Typography variant="h6" sx={{ color: 'text.secondary', cursor: 'pointer' }} >
                  Cookie Policy
                </Typography>
              </div>
            </Grid>
            <Grid direction='row' gap={2} sx={{ display: 'flex', marginTop: '20px', }}>
              <div onClick={() => navigate('/help')}>
                <Typography variant="h6" sx={{ color: 'text.secondary', cursor: 'pointer' }}>
                  Help
                </Typography>
              </div>
             
           
              <Typography variant="h6" sx={{ color: 'text.secondary' }} >
                © 2023, Dint.
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeTab;
