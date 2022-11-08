import { Divider, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type ViewMoreDividerProps = {
  title: string;
  showLess: boolean;
  handleToggleView: () => void;
};

const ViewMoreDivider = (props: ViewMoreDividerProps) => {
  return (
    <Divider className="secondary-text-color">
      <Stack
        direction="row"
        spacing={0.25}
        justifyContent="center"
        alignItems="center"
        className="view-more-divider cursor-pointer"
        onClick={props?.handleToggleView}
      >
        <Typography variant="caption">{props?.showLess ? props?.title : 'View less'}</Typography>
        {props?.showLess ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
      </Stack>
    </Divider>
  );
};

export default ViewMoreDivider;
