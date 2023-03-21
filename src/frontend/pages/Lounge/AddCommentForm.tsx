import React, { FormEvent, useContext, useRef } from 'react';
import { createPortal } from 'react-dom';
import Picker from '@emoji-mart/react';
import { IconButton } from '@mui/material';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import { ThemeContext } from 'frontend/contexts/ThemeContext';
import { AppDispatch, RootState, useSelector } from '../../redux/store';
import { toast } from 'react-toastify';
import { PostCommentInterface } from 'frontend/interfaces/postInterface';
import { addCommentForPost } from '../../redux/actions/postActions';
import { useDispatch } from 'react-redux';
import Portal from '../../reusable/Portal';

type Position = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  transform?: string;
};

type EmojiPickerPlacement = 'top' | 'bottom' | 'left' | 'right';

type OnAfterSaveCommentPayload = {
  event: FormEvent<HTMLFormElement>;
  comment: PostCommentInterface;
};

type AddCommentFormProps = {
  postId: number;
  className?: string;
  emojiPickerPlacement?: EmojiPickerPlacement;
  onAfterSaveComment?: (payload: OnAfterSaveCommentPayload) => void;
};

function AddCommentForm({
  postId,
  className = '',
  emojiPickerPlacement = 'bottom',
  onAfterSaveComment,
}: AddCommentFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { toggle } = useContext(ThemeContext);
  const user = useSelector((state: RootState) => state.user.userData);

  const [showEmoji, setShowEmoji] = React.useState<boolean>(false);
  const [commentText, setCommentText] = React.useState<string>('');
  let inputRef = useRef<HTMLInputElement>(null);
  let emojiIconRef = useRef<SVGSVGElement>(null);

  const pickerPosition: Position = React.useMemo(() => {
    if (!emojiIconRef.current || !showEmoji) {
      return { top: 0, left: 0 };
    }

    const rect = emojiIconRef.current.getBoundingClientRect();
    const gapToIcon = 15;
    switch (emojiPickerPlacement) {
      case 'top':
        return {
          bottom: window.innerHeight - window.scrollY - rect.top + gapToIcon,
          left: rect.left,
        }
      case 'left':
        return {
          top: rect.top + window.scrollY,
          right: window.innerWidth - rect.left + gapToIcon,
          transform: `translate(0, -50%)`,
        };
      case 'right':
        return {
          top: rect.top + window.scrollY,
          left: rect.right + gapToIcon,
          transform: `translate(0, -50%)`,
        };
      case 'bottom':
      default:
        return {
          top: rect.bottom + window.scrollY + gapToIcon,
          left: rect.left,
        };
    }
  }, [showEmoji, emojiPickerPlacement]);

  const handleEmojiPickup = (emoji: any) => {
    if (inputRef) {
      const cursorPosition = inputRef.current?.selectionStart || 0;
      const text =
        commentText.slice(0, cursorPosition) +
        commentText.slice(cursorPosition) +
        emoji.native;
      setCommentText(text);
    }
  };

  const handleSubmit = React.useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (commentText.length < 1) {
      toast.error("Comment is Required!");
      return;
    }

    if (!user) return;

    const comment: PostCommentInterface = await dispatch(
      addCommentForPost(user.id, postId, commentText)
    );

    if (onAfterSaveComment) {
      onAfterSaveComment({ comment, event });
    }

    setCommentText('');
    setShowEmoji(false);
  }, [commentText, dispatch, onAfterSaveComment, postId, user]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={className}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          position: 'relative',
          color: toggle ? '#fff' : '#000',
        }}
      >
        <IconButton
          className="d-flex align-items-center justify-content-center"
          sx={{ color: toggle ? "#fff" : "#000" }}
          onClick={() => setShowEmoji(!showEmoji)}
        >
          <SentimentSatisfiedOutlinedIcon ref={emojiIconRef} />
        </IconButton>
        <div className="emoji-wrapper">
          {showEmoji && (
            <Portal rootId="emoji-picker-portal">
              <div
                style={{
                  position: "absolute",
                  zIndex: 9999,
                  ...pickerPosition,
                }}
              >
                <Picker
                  onEmojiSelect={(e: any) => handleEmojiPickup(e)}
                  emoji="point_up"
                  title="Pick your emoji"
                  theme={toggle ? "dark" : "light"}
                  onClickOutside={() => setShowEmoji(false)}
                />
              </div>
            </Portal>
          )}
        </div>
        <input
          style={{
            border: "none",
            outline: "none",
            boxShadow: "none",
            borderRadius: 0,
            background: "transparent",
            color: toggle ? "#fff" : "#000",
          }}
          className="form-control w-100"
          placeholder="Add a Comment"
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <IconButton
          sx={{
            fontWeight: 500,
            fontSize: 15,
            color: toggle ? "#fff" : "#000000",
          }}
          type="submit"
        >
          Post
        </IconButton>
      </div>
    </form>
  );
}

export default AddCommentForm;
