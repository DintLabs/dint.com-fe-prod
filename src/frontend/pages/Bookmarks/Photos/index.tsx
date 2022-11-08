import { Grid,Stack } from '@mui/material';
import {Col} from  "react-bootstrap";
import Submenu from 'frontend/components/submenu';
import { FlexRow } from 'frontend/reusable/reusableStyled';
import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import {ThemeContext} from '../../../contexts/ThemeContext'
import _axios from '../../../api/axios';

const ImgStyled = styled.img`
  width: 100%;
`;

const Photos = () => {
  const geBookmarkPhotos = async () => {
    if (isLoadingBookmarks) return;
    try{
      setIsLoadingBookmarks(true)
      const { data }: any = await _axios.get(`/api/user/get-user-bookmarks/?type=image`);
      if(data?.data?.length){
        const bookmarksData = data?.data || []
        const bookMarkedPost = bookmarksData.map((bookmarkRow: any) => {
          return bookmarkRow?.post
        })
        setBookmarkedPosts(bookMarkedPost)
      }
      setIsLoadingBookmarks(false)
    } catch(err){
      setIsLoadingBookmarks(false)
    }
  }

  useEffect(() => {
    geBookmarkPhotos();
  }, []);

  const { toggle } = useContext(ThemeContext);

  const [isLoadingBookmarks, setIsLoadingBookmarks] = useState(false);
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const [isOpenFullMode, setIsOpenFullMode] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const togglePhoto = (img) => {
    setIsOpenFullMode(!isOpenFullMode);
    setSelectedPhoto(img);
  }

  return (
    <Grid container>
      <Submenu title="PHOTOS" username="" routes={[]} noTag md={12} />

      <FlexRow fWrap="wrap" direction="row">
        {bookmarkedPosts.map((image, i) => (
          <Col key={`${image}_${i}`} style={{width:"33%"}}>
            <ImgStyled
              onClick={() => togglePhoto(image.media)}
              src={image.media} alt="image"
              style={{border : !toggle && 'solid 1px #161C24', cursor: "pointer"}}
              width="100%" height="200px"
            />

            {isOpenFullMode && selectedPhoto && (
              <Stack
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: "0px",
                    left: "0",
                    top:"80px",
                    backgroundColor: toggle ? "black" : 'white',
                    cursor: "pointer"
                }}
                alignItems="center" justifyContent="center"
                onClick={() => setIsOpenFullMode(!isOpenFullMode)}>
              <ImgStyled

              src={selectedPhoto} alt="image"

              width="50%" height="80%"
            />
              </Stack>
            )}
          </Col>
        ))}
      </FlexRow>
    </Grid>
  );
};

export default Photos;
