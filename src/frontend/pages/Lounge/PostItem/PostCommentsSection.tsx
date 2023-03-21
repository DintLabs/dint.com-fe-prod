import React from 'react';
import { PostCommentInterface } from 'frontend/interfaces/postInterface';
import Comment from '../Comment';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { Box } from '@mui/material';

type PostCommentsSectionProps = {
  comments: PostCommentInterface[];
};

function PostCommentsSection({
  comments,
}: PostCommentsSectionProps) {
  const [showAllComments, setShowAllComments] = React.useState<boolean>(false);
  const [visibleComments, setVisibleComments] = React.useState<PostCommentInterface[]>(
    [...comments].reverse().slice(0, 1),
  );

  React.useEffect(() => {
    if (showAllComments) {
      setVisibleComments([...comments].reverse());
    } else {
      setVisibleComments([...comments].reverse().slice(0, 1));
    }
  }, [comments, showAllComments]);

  return (
    <Box sx={{ px: 2 }}>
      {visibleComments?.length > 0 && (
        <div
          className="view-comm"
          style={{ cursor: "pointer" }}
          onClick={() => setShowAllComments(!showAllComments)}
        >
          {
            !showAllComments
              ? `View all ${comments.length} Comments`
              : `Comments (${comments?.length})`
          }
        </div>
      )}
      <div className="custom-wrapper">
        {visibleComments.map((item, i) => (
          <Comment
            key={`comments_${item?.created_at}_${i}`}
            text={item.comment}
            createdAt={item.created_at}
            author={item.user as UserDataInterface}
          />
        ))}
      </div>
    </Box>
  );
}

export default PostCommentsSection;
