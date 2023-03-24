import React from 'react';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import flattenDeep from 'lodash/flattenDeep';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'frontend/redux/store';
import { PostCommentInterface } from 'frontend/interfaces/postInterface';
import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { toggleLikeForComment } from 'frontend/redux/actions/postActions';
import Comment from '../Comment';

type PostCommentsSectionProps = {
  comments: PostCommentInterface[];
  onAfterLike: (commentId: number, likedBy: number[]) => void;
};

function PostCommentsSection({
  comments,
  onAfterLike,
}: PostCommentsSectionProps) {
  const dispatch = useDispatch<AppDispatch>();
  const loggedInUser = useSelector((state: RootState) => state.user.userData);
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

  const handleLikeAction = async (commentId: number) => {
    try {
      if (!loggedInUser) return;

      const { liked } = await dispatch(toggleLikeForComment(commentId));

      const likedComment = comments.find((comment) => comment.id === commentId);
      const currentLikedBy = flattenDeep(likedComment?.liked_by ?? []);

      const likedBy = liked
        ? [...currentLikedBy, loggedInUser.id]
        : currentLikedBy.filter((userId) => userId !== loggedInUser.id);

      onAfterLike(commentId, likedBy);
    } catch (error) {
      toast.error('Cannot process like action. Try again.')
    }
  };

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
            liked={!!loggedInUser && flattenDeep(item.liked_by).includes(loggedInUser.id)}
            likesCount={flattenDeep(item.liked_by).length}
            onLikeClick={() => handleLikeAction(item.id)}
          />
        ))}
      </div>
    </Box>
  );
}

export default PostCommentsSection;
