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
        md={12}
      />

      <Submenu
        title=""
        username="Connected account"
        routes={settingsSubmenuConnectAccount}
        secondBlocks={[{ title: 'Security', block: settingsSubmenuConnectSecurity }]}
        noTag
        md={12}
      />

      <Submenu
        title=""
        username="Account management"
        routes={settingsSubmenuAccountManagement}
        noTag
        md={12}
      />
    </Grid>
  );
};

export default Account;
