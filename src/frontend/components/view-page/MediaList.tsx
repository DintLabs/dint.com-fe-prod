import { PostInterface } from 'frontend/interfaces/reduxInterfaces';
import React, { useState } from 'react';
import CustomInfiniteScrollForMedia from './CustomInfiniteScrollForMedia';
import ViewMediaModal from './ViewMediaModal';

type MediaListProps = {
  mediaList: any;
  totalMedia: number;
  mediaType?: string | null;
  fetchMoreMedia: () => void;
  loader: boolean;
  userDetails?: any;
  getUserPostCounts?: (id: number) => void;
  postDeleted?: (id: number) => void;
};

export type SelectedMediaType = {
  id: number | null;
  media: string | null;
  type: string | null;
  userId: number | null;
  likePost: [] | null;
  is_bookmarked: Boolean
};

const MediaList = (props: MediaListProps) => {
  const [isMediaViewModalOpen, setIsMediaViewModalOpen] =
    useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<SelectedMediaType>({
    id: null,
    media: null,
    type: null,
    userId: null,
    likePost: null ,
    is_bookmarked:false
  });

  const handleModalClose = () => {
    setIsMediaViewModalOpen(false);
    setSelectedMedia({ id: null, media: null, type: null, userId:null, likePost: null, is_bookmarked:false });
  };
  const handleMediaView = (media: SelectedMediaType) => {
    setSelectedMedia(media);
    setIsMediaViewModalOpen(true);
  };

  //   to display the next media in the open modal
  const viewNextMedia = (mediaId: number) => {
    const currentMediaIndex = props?.mediaList?.findIndex(
      (media: SelectedMediaType) => media?.id === mediaId
    );
    if (
      currentMediaIndex === props?.mediaList.length - 4 &&
      props?.mediaList.length !== props?.totalMedia
    ) {
      props?.fetchMoreMedia();
    }
    if (currentMediaIndex >= 0) {
      const nextMedia = props?.mediaList[currentMediaIndex + 1];
      setSelectedMedia({
        id: nextMedia?.id,
        media: nextMedia?.media,
        type: nextMedia?.type,
        userId: nextMedia?.user.id,
        likePost: nextMedia?.like_post,
        is_bookmarked : nextMedia?.is_bookmarked
      });
    }
  };

  //   to display the prev media in the open modal
  const viewPrevMedia = (mediaId: number) => {
    const currentMediaIndex = props?.mediaList?.findIndex(
      (media: SelectedMediaType) => media?.id === mediaId
    );
    if (currentMediaIndex > 0) {
      const nextMedia = props?.mediaList[currentMediaIndex - 1];
      setSelectedMedia({
        id: nextMedia?.id,
        media: nextMedia?.media,
        type: nextMedia?.type,
        userId: nextMedia?.user.id,
        likePost: nextMedia?.like_post,
        is_bookmarked : nextMedia?.is_bookmarked
      });
    }
  };

  return (
    <>
      <CustomInfiniteScrollForMedia
        onClickHandler={(media: SelectedMediaType) => handleMediaView(media)}
        dataList={props?.mediaList}
        totalData={props?.totalMedia}
        fetchMoreData={props.fetchMoreMedia}
        loader={props?.loader}
        isModalOpen={isMediaViewModalOpen}
        selectedMedia={selectedMedia}
      />
      <ViewMediaModal
        selectedMediaId={selectedMedia?.id}
        isFirstPost={
          props?.mediaList?.findIndex((media: PostInterface) => media.id === selectedMedia.id) === 0
        }
        isLastPost={
          props?.mediaList?.findIndex((media: PostInterface) => media.id === selectedMedia.id) ===
          props?.totalMedia - 1
        }
        getUserPostCounts={props?.getUserPostCounts}
        renderNextMedia={viewNextMedia}
        renderPrevMedia={viewPrevMedia}
        open={isMediaViewModalOpen}
        handleClose={handleModalClose}
        source={selectedMedia.media}
        type={selectedMedia?.type}
        loading={props?.loader}
        userDetails={props?.userDetails}
        canDeletePost={true}
        onDelete={props?.postDeleted}
        postUser={selectedMedia?.userId}
        likePost={selectedMedia?.likePost}
        is_bookmarked={selectedMedia?.is_bookmarked}
        selectedMedia={selectedMedia}
      />
    </>
  );
};

export default MediaList;
