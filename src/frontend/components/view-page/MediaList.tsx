import { PostInterface } from 'frontend/interfaces/postInterface';
import React, { useEffect, useState } from 'react';
import CustomInfiniteScrollForMedia from './CustomInfiniteScrollForMedia';
import ViewMediaModal from './ViewMediaModal';
import { useMediaQuery } from '@mui/material';
import ViewMediaModalMobile from './ViewMediaModalMobile';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

type MediaListProps = {
  mediaList: any;
  totalMedia: number;
  mediaType?: string | null;
  fetchMoreMedia: () => void;
  loader: boolean;
  userDetails?: any;
  getUserPostCounts?: (id: number) => void;
  postDeleted?: (id: number) => void;
  isPage?: Boolean;
};

export type SelectedMediaType = {
  id: number | null;
  media: string | null;
  type: string | null;
  userId: number | null;
  like_post: [] | null;
  is_bookmarked: Boolean;
  description: string;
};

const MediaList = (props: MediaListProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state: RootState) => state.user.userData);
  const [mediaList, setMediaList] = useState(props.mediaList);
  const [isMediaViewModalOpen, setIsMediaViewModalOpen] =
    useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<PostInterface | undefined>(undefined);
  const isMobile = useMediaQuery("(max-width:600px)")
  useEffect(() => {
    setMediaList(props.mediaList);
  }, [props.mediaList]);

  const handleModalClose = () => {
    setIsMediaViewModalOpen(false);
    setSelectedMedia(undefined);
  };
  const handleMediaView = (media: PostInterface) => {
    if (!loggedInUser) {
      Swal.fire({
        title: 'You are not logged in',
        text: 'Click login button to Login',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#CBC9C9',
        confirmButtonText: 'Login',
        cancelButtonText: 'Dismiss'
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate(`/auth/login`, {
            state: {
              redirectUrl: pathname
            }
          });
        }
      });
      return;
    }

    setSelectedMedia(media);
    setIsMediaViewModalOpen(true);
  };

  //   to display the next media in the open modal
  const viewNextMedia = (mediaId: number) => {
    const currentMediaIndex = mediaList?.findIndex(
      (media: SelectedMediaType) => media?.id === mediaId
    );
    if (
      currentMediaIndex === mediaList.length - 4 &&
      mediaList.length !== props?.totalMedia
    ) {
      props?.fetchMoreMedia();
    }
    if (currentMediaIndex >= 0) {
      const nextMedia = mediaList[currentMediaIndex + 1];
      console.log("nextMedia--", nextMedia);
      nextMedia &&
        setSelectedMedia(nextMedia);
    }
  };

  //   to display the prev media in the open modal
  const viewPrevMedia = (mediaId: number) => {
    const currentMediaIndex = mediaList?.findIndex(
      (media: SelectedMediaType) => media?.id === mediaId
    );
    if (currentMediaIndex > 0) {
      const prevMedia = mediaList[currentMediaIndex - 1];
      setSelectedMedia(prevMedia);
    }
  };
  const onLikePost = (post: any[], postId: number) => {
    setSelectedMedia((prev: any) => ({ ...prev, like_post: post }));
    const newMediaList = mediaList.map((item: any) =>
      item.id === postId ? { ...item, like_post: post } :item
    );
    setMediaList(newMediaList);
  };

  const onBookMark = (isBookmark: Boolean, postId: number) => {
    setSelectedMedia((prev: any) => ({ ...prev, is_bookmarked: isBookmark }));
    const newMediaList = mediaList.map((item: any) =>
      item.id === postId ? { ...item, is_bookmarked: isBookmark } :item
    );
    setMediaList(newMediaList);
  }

  return (
    <>
      <CustomInfiniteScrollForMedia
        onClickHandler={handleMediaView}
        dataList={mediaList}
        totalData={props?.totalMedia}
        fetchMoreData={props.fetchMoreMedia}
        loader={props?.loader}
        isModalOpen={isMediaViewModalOpen}
        selectedMedia={selectedMedia}
      />
      {(isMediaViewModalOpen && !isMobile) && (
        <ViewMediaModal
          selectedMedia={selectedMedia as PostInterface}
          isFirstPost={mediaList?.findIndex(
            (media: PostInterface) => media.id === selectedMedia?.id
          ) === 0}
          isLastPost={mediaList?.findIndex(
            (media: PostInterface) => media.id === selectedMedia?.id
          ) ===
            mediaList.length - 1}
          getUserPostCounts={props?.getUserPostCounts}
          renderNextMedia={viewNextMedia}
          renderPrevMedia={viewPrevMedia}
          open={isMediaViewModalOpen}
          handleClose={handleModalClose}
          loading={props?.loader}
          author={props?.userDetails}
          canDeletePost={true}
          onDelete={props?.postDeleted}
          isPage={props?.isPage}
          onLikePost={onLikePost}
          onBookmark={onBookMark}
          dataList={mediaList}
        />
      )}
      {(isMediaViewModalOpen && isMobile) && (
        <ViewMediaModalMobile
          selectedMedia={selectedMedia}
          getUserPostCounts={props?.getUserPostCounts}
          open={isMediaViewModalOpen}
          handleClose={handleModalClose}
          loading={props?.loader}
          userDetails={props?.userDetails}
          onDelete={props?.postDeleted}
          isPage={props?.isPage}
          onLikePost={onLikePost}
          onBookmark={onBookMark}
          dataList={mediaList}
        />
      )}
    </>
  );
};

export default MediaList;
