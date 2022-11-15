import { Stack, IconButton, Typography, useTheme } from '@mui/material';
import { FlexRow } from 'frontend/reusable/reusableStyled';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router';

import AddIcon from '@mui/icons-material/Add';

interface BackBlockProps {
  title: string;
  isPlusIco?: boolean;
  handleOpen: any;
  handleClose: any;
}

const BackBlock = ({ title, isPlusIco, handleOpen, handleClose }: BackBlockProps) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Stack
      p={1}
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        borderBottom: `6px solid ${theme.palette.grey[700]}`,
        width: '100%'
      }}
    >
      <FlexRow jc="space-between" ai="center" w="100%">
        <FlexRow ai="center">
          <IconButton size="small" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
          </IconButton>

          <Typography className="primary-text-color capitalize-text" variant="subtitle1">
            {title}
          </Typography>
        </FlexRow>
        {isPlusIco && <AddIcon sx={{ cursor: "pointer" }} onClick={handleOpen} />}
      </FlexRow>
    </Stack>
  );
};

export default BackBlock;
