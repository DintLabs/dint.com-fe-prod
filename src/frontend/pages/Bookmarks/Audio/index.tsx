import { Grid } from '@mui/material';

import Submenu from 'frontend/components/submenu';
import { Col } from "react-bootstrap";
import { FlexRow } from "../../../reusable/reusableStyled";
import { GetUserBookmark } from "../../../hooks/bookmark";
import { postTypes } from "../../../data";

const Audio = () => {
  const {data:bookmarkedPosts, loading:isLoading} = GetUserBookmark(postTypes.audio.value)
  return (
    <Grid container>
      <Submenu title="AUDIO" username="" routes={[]} noTag md={12} handleOpen={undefined} handleClose={undefined} />
      <FlexRow fWrap="wrap">
        {!isLoading  && bookmarkedPosts.map((audio:any, i:number) => (
          <Col lg={4} md={6} sm={12} key={`${audio}_${i}`} style={{height:"200px"}}>
            <audio controls>
              <source src={audio?.media} id="video_here" height="100%"/>
            </audio>
          </Col>
        ))}
      </FlexRow>
    </Grid>
  );
};

export default Audio;
