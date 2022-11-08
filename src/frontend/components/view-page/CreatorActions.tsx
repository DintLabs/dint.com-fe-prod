import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from 'frontend/redux/store';

type CreatorActionsProps = {
  anchorElement: HTMLElement | null;
  handleClose: () => void;
};

const CreatorActions = (props: CreatorActionsProps) => {
  const navigate = useNavigate();

  const isMenuOpen = Boolean(props.anchorElement);
  const pageData = useSelector((state: RootState) => state?.page?.pageData);

  const navigateOnCreatePage = () => {
    navigate('/page/creation');
  };

  const navigateOnSubscribers = () => {
    navigate(`/${pageData?.page_name}/subscribers`);
  };

  const navigateOnSettingsPage = () => {
    navigate(`/${pageData?.page_name}/settings`);
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={props.anchorElement}
      open={isMenuOpen}
      onClose={props.handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button'
      }}
    >
   
      <MenuItem onClick={navigateOnSubscribers}>
        <ListItemIcon>
          <GroupsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Subscriptions</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={navigateOnSettingsPage}>
        <ListItemIcon>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default CreatorActions;
