import { Grid } from '@mui/material';

import Submenu from 'frontend/components/submenu';
import {
  settingsSubmenuConnectAccount,
  settingsSubmenuAccount,
  settingsSubmenuConnectSecurity,
  settingsSubmenuSocialAccount,
  settingsSubmenuAccountManagement
} from 'frontend/data';
import { RootState } from 'frontend/redux/store';
import { useSelector } from 'react-redux';

const Account = () => {
  const { userData } = useSelector((state: RootState) => state.user);

  if (userData instanceof Object) {
    settingsSubmenuAccount[0].subname = `@${userData.custom_username}`;
  }

  return (
    <Grid container>
      <Submenu
        title="ACCOUNT"
        username="Account info"
        routes={settingsSubmenuAccount}
        secondBlocks={[{ title: 'Liked Accounts', block: settingsSubmenuSocialAccount }]}
        noTag
        md={12} handleOpen={undefined} handleClose={undefined}      />

      <Submenu
        title=""

        routes={settingsSubmenuConnectAccount}
        secondBlocks={[{ title: 'Security', block: settingsSubmenuConnectSecurity }]}
        noTag
        md={12} username={''} handleOpen={undefined} handleClose={undefined}      />

      <Submenu
        title=""
        username="Account management"
        routes={settingsSubmenuAccountManagement}
        noTag
        md={12} handleOpen={undefined} handleClose={undefined}      />
    </Grid>
  );
};

export default Account;
