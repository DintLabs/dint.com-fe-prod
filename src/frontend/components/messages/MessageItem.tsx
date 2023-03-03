import { Avatar, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';

type MessageItemProps = {
  messageId: number;
  message: string;
  isSender: boolean;
  time: string;
  receiverImage:string;
  senderImage:string;
  messageSender:string
};

function MessageItem(props: MessageItemProps) {
  const navigate = useNavigate();
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
          <Avatar onClick={()=>navigate(`/${props.messageSender}`)} component="span" sx={{margin:"0% 5px" , cursor:"pointer"}} src={props.isSender ? `${props.senderImage}` : `${props.senderImage}`} />
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
