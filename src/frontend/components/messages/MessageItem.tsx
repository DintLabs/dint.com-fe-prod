import { Avatar, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';

type MessageItemProps = {
  messageId: number;
  message: string;
  isSender: boolean;
  time: string;
  receiverImage:string;
  senderImage:string;
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
        <Box sx={{ display:"flex" , flexDirection:props.isSender?"row-reverse" :"" }}>
          <Avatar component="span" sx={{margin:"0% 5px"}} src={props.isSender ? `${props.senderImage}` : `${props.senderImage}`} />
          <Box className="message">
            <Typography component="span">{`${props.message} `} </Typography>
            <Typography component="span" variant="caption" className="message-time">
              {props.time}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default MessageItem;
