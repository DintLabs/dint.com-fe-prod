import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

type MessageItemProps = {
  messageId: number;
  message: string;
  isSender: boolean;
  time: string;
};

function MessageItem(props: MessageItemProps) {
  return (
    <Box
      className={`message-item ${
        props.isSender ? 'justify-content-end sender-message' : 'receiver-message'
      }`}
      key={props.messageId}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        className="message-container"
      >
        <Box className="message">
          <Typography component="span">{`${props.message} `} </Typography>

          <Typography component="span" variant="caption" className="message-time">
            {props.time}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

export default MessageItem;
