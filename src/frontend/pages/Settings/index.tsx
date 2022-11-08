import { Grid, IconButton, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Submenu from 'frontend/components/submenu';
import { settingsSubmenu, settingsSubmenuGeneral } from 'frontend/data';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProfileSettings from './ProfileSettings';
import Account from './Account';
import PrivacyAndSafety from './PrivacyAndSafety';
import Notifications from './Notifications';
import Display from './Display';
import Languages from './Display/sections/Languages';
import TgBotNotif from './Notifications/sections/TgBotNotif';
import SmsNotif from './Notifications/sections/SmsNotif';
import ToastNotif from './Notifications/sections/ToastNotif';
import SiteNotif from './Notifications/sections/SiteNotif';
import EmailNotif from './Notifications/sections/EmailNotif';
import PushNotif from './Notifications/sections/PushNotif';
import Username from './Account/sections/Username';
import EmailFromAccount from './Account/sections/EmailFromAccount';
import PhoneNumber from './Account/sections/PhoneNumber';
import Password from './Account/sections/Password';
import TwoStepAuth from './Account/sections/TwoStepAuth';
import LoginSession from './Account/sections/LoginSession';
import Twitter from './Account/sections/Twitter';
import Google from './Account/sections/Google';

const Settings = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  // const [drawerFlag, setDrawerFlag] = useState(false);

  const savedUser = JSON.parse(localStorage.getItem('userData') ?? '{}');

  // const toggleDrawer = (open: any) => (event: any) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setDrawerFlag(open);
  // };

  // const list = () => (
  //   <Box
  //     sx={{ width: 250 }}
  //     role="presentation"
  //     onClick={toggleDrawer(false)}
  //     onKeyDown={toggleDrawer(false)}
  //   >
  //     <List>
  //       {settingsSubmenu.map((item, index) => (
  //         <ListItem key={index} disablePadding onClick={() => navigate(item.href)}>
  //           <ListItemButton>
  //             <ListItemText primary={item.name} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //   </Box>
  // );

  return (
    <div>
      <Grid container>
        <>
          {isLargeScreen ? (
            <>
              <Submenu
                title="Settings"
                username={savedUser?.custom_username}
                routes={settingsSubmenu}
                secondBlocks={[{ title: 'General', block: settingsSubmenuGeneral }]}
              />
            </>
          ) : (
            <>
              {location.pathname !== `/settings` && (
                <IconButton onClick={() => navigate(-1)}>
                  <IoMdArrowRoundBack className="primary-text-color cursor-pointer" />
                </IconButton>
              )}
            </>
          )}
        </>

        <Grid item xs={12} md={8}>
          <Routes>
            <Route
              path="/"
              element={
                isLargeScreen ? (
                  <></>
                ) : (
                  <Submenu
                    title="Settings"
                    username={savedUser?.custom_username}
                    routes={settingsSubmenu}
                    secondBlocks={[{ title: 'General', block: settingsSubmenuGeneral }]}
                  />
                )
              }
            />

            {/* Main routers */}
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/account" element={<Account />} />
            <Route path="/privacy-and-safety" element={<PrivacyAndSafety />} />
            <Route path="/notifications" element={<Notifications />} />

            <Route path="/display" element={<Display />} />

            {/* Account routers */}
            <Route path="/display/account/username" element={<Username />} />
            <Route path="/display/account/email" element={<EmailFromAccount />} />
            <Route path="/display/account/phone-number" element={<PhoneNumber />} />
            <Route path="/display/account/twitter" element={<Twitter />} />
            <Route path="/display/account/google" element={<Google />} />
            <Route path="/display/account/connect" element={<ProfileSettings />} />
            <Route path="/display/account/password" element={<Password />} />
            <Route path="/display/account/login-session" element={<LoginSession />} />
            <Route path="/display/account/authentication" element={<TwoStepAuth />} />
            <Route
              path="/settings/display/account/hello-authentication"
              element={<ProfileSettings />}
            />
            <Route path="/settings/display/account/delete" element={<ProfileSettings />} />

            {/* Notifications routers */}
            <Route path="/display/notification/push" element={<PushNotif />} />
            <Route path="/display/notification/email" element={<EmailNotif />} />
            <Route path="/display/notification/site" element={<SiteNotif />} />
            <Route path="/display/notification/toast" element={<ToastNotif />} />
            <Route path="/display/notification/sms" element={<SmsNotif />} />

            <Route path="/display/notification/tg-bot" element={<TgBotNotif />} />

            {/* Language routers */}
            <Route path="/display/language" element={<Languages />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
