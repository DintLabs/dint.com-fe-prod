import { PostInterface } from 'frontend/interfaces/reduxInterfaces';
import React, { useState } from 'react';
import CustomInfiniteScrollForMedia from './CustomInfiniteScrollForMedia';
import ViewMediaModal from './ViewMediaModal';

type MediaListProps = {
  mediaList: any;
  totalMedia: number;
  mediaType: 'image' | 'video';
  fetchMoreMedia: () => void;
  loader: boolean;
};

export type SelectedMediaType = {
  id: number | null;
  media: string | null;
};

const MediaList = (props: MediaListProps) => {
  const [isMediaViewModalOpen, setIsMediaViewModalOpen] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<SelectedMediaType>({ id: null, media: null });

  const handleModalClose = () => {
    setIsMediaViewModalOpen(false);
    setSelectedMedia({ id: null, media: null });
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
      setSelectedMedia({ id: nextMedia?.id, media: nextMedia?.media });
    }
  };

  //   to display the prev media in the open modal
  const viewPrevMedia = (mediaId: number) => {
    const currentMediaIndex = props?.mediaList?.findIndex(
      (media: SelectedMediaType) => media?.id === mediaId
    );
    if (currentMediaIndex > 0) {
      const nextMedia = props?.mediaList[currentMediaIndex - 1];
      setSelectedMedia({ id: nextMedia?.id, media: nextMedia?.media });
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
        renderNextMedia={viewNextMedia}
        renderPrevMedia={viewPrevMedia}
        open={isMediaViewModalOpen}
        handleClose={handleModalClose}
        source={selectedMedia.media}
        type={props?.mediaType}
        loading={props?.loader}
      />
    </>
  );
};

export default MediaList;
