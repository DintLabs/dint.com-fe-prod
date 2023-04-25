import { Box, Grid } from '@mui/material';
import _axios from 'frontend/api/axios';
import PostItemSkeleton from 'frontend/components/common/skeletons/PostItemSkeleton';
import { useLounge } from 'frontend/contexts/LoungeContext';
import { postTypes } from 'frontend/data';
import { PaginationPostsInerface } from 'frontend/interfaces/contextInterface';
import { LikePostInterface, PostCommentInterface, PostInterface } from 'frontend/interfaces/postInterface';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import { useEffect, useState } from 'react';
import Submenu from 'frontend/components/submenu';

import PostItem from 'frontend/pages/Lounge/PostItem/PostItem';
import { convertDateToLocal } from 'frontend/utils/date';

interface RespPost {
  data: { data: PostInterface[] };
  code: number;
  message: string;
  recordsFiltered: number;
  recordsTotal: number;
}

const HomeTab = () => {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBookmarks , setIsLoadingBookmarks] = useState(false)
  const [bookmarkedPosts, setBookmarkedPosts] = useState<any[]>([])


  const {
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

  const removeFromBookmarksList = (postId: number) => {
    setBookmarkedPosts(bookmarkedPosts.filter((prev) => prev.post.id !== postId));
  };

  const updatePostLikes = (postId: number, likes: LikePostInterface[]) => {
    setBookmarkedPosts(bookmarkedPosts.map((bookmark) => {
      if (bookmark.post.id !== postId) {
        return bookmark;
      }

      return {
        ...bookmark,
        post: {
          ...bookmark.post,
          like_post: likes,
          total_likes: likes.length,
        },
      };
    }));
  };

  const updatePostComments = (postId: number, comments: PostCommentInterface[]) => {
    setBookmarkedPosts(bookmarkedPosts.map((bookmark) => {
      if (bookmark.post.id !== postId) {
        return bookmark;
      }

      return {
        ...bookmark,
        post: {
          ...bookmark.post,
          post_comment: comments,
        },
      };
    }));
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
          return {
            ...bookmarkRow,
            post: {
              ...bookmarkRow?.post ?? {},
              created_at: convertDateToLocal(bookmarkRow?.post?.created_at),
            },
          };
        })

        setBookmarkedPosts(bookMarkedPost)
      }
      setIsLoadingBookmarks(false);
    } catch(err){
      setIsLoadingBookmarks(false)
    }
  }

  const fetchPosts = async (pagination?: PaginationPostsInerface) => {
    if (isLoading || !pagination?.hasNext) return;

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
    fetchUserBoookmarks()
  }, [value]);

  return (
    <>
      <Grid container>
        <Submenu title="ALL BOOKMARKS" username="" routes={[]} noTag md={12} handleOpen={undefined} handleClose={undefined} />
        <FlexRow gap="5px" fWrap="wrap" style={{ width: "100%"}}>
          <Box style={{ width: '100%', paddingTop: '10px' }}>
            {bookmarkedPosts.map((item: any) => (
              <PostItem
                key={`all_bookmarks-${item?.id}`}
                post={{ ...item.post, is_bookmarked: true }}
                onPostLike={updatePostLikes}
                onPostCommentsChange={updatePostComments}
                onPostBookmark={(postId, bookmarked) => {
                  if (!bookmarked) {
                    removeFromBookmarksList(postId);
                  }
                }}
                onPostDelete={removeFromBookmarksList}
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
