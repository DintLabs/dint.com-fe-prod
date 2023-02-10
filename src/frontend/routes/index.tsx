import VideoCardsMobileView from "frontend/components/view-page/VideoCardsMobileView";
import AuthGuard from "frontend/guards/AuthGuard";
import GuestGuard from "frontend/guards/GuestGuard";
import LoungeLayout from "frontend/layouts/lounge";
import MainLayout from "frontend/layouts/main";
import SecondaryMainNavBar from "frontend/layouts/main/SecondaryMainNavBar";
import MarketPlaceLayout from "frontend/layouts/marketPlace";
import Bookmarks from "frontend/pages/Bookmarks";
import CreatePage from "frontend/pages/Create-Page/CreatePage";
import Events from "frontend/pages/Events/Events";
import Followers from "frontend/pages/Followers";
import Home from "frontend/pages/Home/Home";
import UserList from "frontend/pages/UserList";
import FollowingList from "frontend/pages/UserList/FollowingList";
import BankContainer from "frontend/pages/Your-Bank";
import PaymentCard from "frontend/pages/Your-Bank/BankingSteps/PaymentCard";
// import Home from 'frontend/pages/Home/Home';
import _axios from "frontend/api/axios";
import SecondaryFooter from "frontend/layouts/main/SecondaryFooter";
import BlockedList from "frontend/pages/BlockedList.tsx";
import AddBlockedUsers from "frontend/pages/BlockedList.tsx/AddBlockedUsers";
import CloseFriend from "frontend/pages/CloseFriend";
import AddCloseFriend from "frontend/pages/CloseFriend/AddCloseFriend";
import Lists from "frontend/pages/Lists";
import Login from "frontend/pages/Login/Login";
import NewHome from "frontend/pages/Lounge/Lounge";
import MarketPlace from "frontend/pages/MarketPlace/MarketPlace";
import MarketPlaceCreate from "frontend/pages/MarketPlace/MarketPlaceCreate/MarketPlaceCreate";
import MyPurchases from "frontend/pages/MarketPlace/MyPurchases/MyPurchases";
import NotFound from "frontend/pages/NotFound";
import CookieNotice from "frontend/pages/Privacy/CookieNotice";
import PrivacyPolicy from "frontend/pages/Privacy/PrivacyPolicy";
import TermsOfServices from "frontend/pages/Privacy/TermsOfServices";
import Profile from "frontend/pages/Profile/Profile";
import PublicEvents from "frontend/pages/PublicEvents/PublicEvents";
import Referrals from "frontend/pages/Referrals";
import Register from "frontend/pages/Register/Register";
import RestrictedList from "frontend/pages/RestrictedList";
import AddUsers from "frontend/pages/RestrictedList/AddUsers";
import Settings from "frontend/pages/Settings";
import TicketCreate from "frontend/pages/TicketCreate/TicketCreate";
import ViewPage from "frontend/pages/View-Page/ViewPage";
import MyEvents from "frontend/pages/my-events";
import AddCard from "frontend/pages/payment/AddCard";
import Search from "frontend/pages/search";
import { fetchUserData, getConfineUserList } from "frontend/redux/slices/user";
import { AppDispatch } from "frontend/redux/store";
import ThemeConfig from "frontend/theme";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useRoutes } from "react-router-dom";
import Following from "../pages/Following/Following";
import RegistrationRefer from "frontend/pages/RegistrationRefer/RegistrationRefer";

// ----------------------------------------------------------------------

const win = window as any;

export default function Router() {
  const dispatch = useDispatch<AppDispatch>();
  win.objNavigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getConfineUserList());
  }, []);

  const online = async () => {
    const obj = {
      is_online: true,
    };

    await _axios
      .put(`/api/user/update-status/`, obj)
      .then((response: any) => {
        console.log("response", response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  useEffect(() => {
    online();
  }, []);

  return useRoutes([
    {
      path: "auth",
      element: <MainLayout />,
      children: [
        // {
        //   path: 'login',
        //   element: (
        //     <GuestGuard>
        //       <Login />
        //     </GuestGuard>
        //   )
        // },
        // {
        //   path: 'signup',
        //   element: (
        //     <GuestGuard>
        //       <Register />
        //     </GuestGuard>
        //   )
        // }
      ],
    },
    {
      path: "auth/login",
      element: (
        <>
          <Login />
          {/* <SecondaryFooter /> */}
        </>
      ),
    },
    {
      path : "auth/refer",
      element : (
        <>
        <RegistrationRefer />
        {/* <SecondaryFooter /> */}
        </>
      )
    },
    {
      path: "auth/signup",
      element: (
        // <GuestGuard>
        <>
          <Register />
          {/* <SecondaryFooter /> */}
        </>
        // </GuestGuard>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <Login />
          {/* <SecondaryFooter /> */}
        </>
      ),
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/home", element: <Home /> },
        // {
        //   path: "/",
        //   element: (
        //     <GuestGuard>
        //       <Login />
        //     </GuestGuard>
        //   ),
        // },
        {
          path: "/events",
          element: (
            <AuthGuard>
              <Events />
            </AuthGuard>
          ),
        },
        { path: "/public/events", element: <PublicEvents /> },
        {
          path: "/ticketcreate",
          element: (
            <AuthGuard>
              <TicketCreate />
            </AuthGuard>
          ),
        },
        {
          path: "/profile",
          element: (
            <AuthGuard>
              <Profile />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <ThemeConfig>
          <SecondaryMainNavBar />
        </ThemeConfig>
      ),
      children: [
        {
          path: "ig",
          element: <VideoCardsMobileView />,
        },
        {
          path: "/404",
          element: <NotFound />,
        },
        {
          path: "/buy-dint-token",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/dint-wallet",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/lounge",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/lounge/events",
          element: (
            <AuthGuard>
              <MyEvents />
            </AuthGuard>
          ),
        },
        {
          path: "/lounge/following",
          element: (
            <AuthGuard>
              <Following />
            </AuthGuard>
          ),
        },
        {
          path: "/privacy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/cookies",
          element: <CookieNotice />,
        },
        {
          path: "/terms",
          element: <TermsOfServices />,
        },
        {
          path: "/lounge/:page",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/lounge/:page/:username",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/lounge/messages/user/:uid",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/lounge/messages/newMessage",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/page/creation",
          element: (
            <AuthGuard>
              <CreatePage />
            </AuthGuard>
          ),
        },

        {
          path: ":username/subscribers",
          element: (
            <AuthGuard>
              <ViewPage />
            </AuthGuard>
          ),
        },
        {
          path: ":username/settings",
          element: (
            <AuthGuard>
              <ViewPage />
            </AuthGuard>
          ),
        },
        {
          path: "/en/fiat/withdraw/:currency",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/processWithdraw",
          element: (
            <AuthGuard>
              <NewHome />
            </AuthGuard>
          ),
        },
        {
          path: "/:username",
          element: <NewHome />,
        },
        {
          path: "/*",
          element: <NotFound />,
        },
      ],
    },
    {
      path: "/marketplace",
      element: <MarketPlaceLayout />,
      children: [
        { path: "/marketplace/", element: <MarketPlace /> },
        { path: "/marketplace/create", element: <MarketPlaceCreate /> },
        { path: "/marketplace/my-purchases", element: <MyPurchases /> },
      ],
    },
    {
      path: "/",
      element: (
        <ThemeConfig>
          <LoungeLayout />
        </ThemeConfig>
      ),
      children: [
        {
          path: "/followers/*",
          element: (
            <AuthGuard>
              <Followers />
            </AuthGuard>
          ),
        },
        {
          path: "/payment/add",
          element: (
            <AuthGuard>
              <AddCard />
            </AuthGuard>
          ),
        },
        {
          path: "/settings/*",
          element: (
            <AuthGuard>
              <Settings />
            </AuthGuard>
          ),
        },
        {
          path: "/cards",
          element: (
            <AuthGuard>
              <PaymentCard />
            </AuthGuard>
          ),
        },
        {
          path: "/referrals/*",
          element: (
            <AuthGuard>
              <Referrals />
            </AuthGuard>
          ),
        },
        {
          path: "/your-bank",
          element: (
            <AuthGuard>
              <BankContainer />
            </AuthGuard>
          ),
        },
        {
          path: "/bookmarks/*",
          element: (
            <AuthGuard>
              <Bookmarks />
            </AuthGuard>
          ),
        },
        {
          path: "/close-friends/*",
          element: (
            <AuthGuard>
              <CloseFriend />
            </AuthGuard>
          ),
        },
        {
          path: "/add-close-friends/*",
          element: (
            <AuthGuard>
              <AddCloseFriend />
            </AuthGuard>
          ),
        },
        {
          path: "/userlist/*",
          element: (
            <AuthGuard>
              <UserList />
            </AuthGuard>
          ),
        },
        {
          path: "/restrictedlist/*",
          element: (
            <AuthGuard>
              <RestrictedList />
            </AuthGuard>
          ),
        },
        {
          path: "/blockedlist/*",
          element: (
            <AuthGuard>
              <BlockedList />
            </AuthGuard>
          ),
        },
        {
          path: "/add-restricted-users/*",
          element: (
            <AuthGuard>
              <AddUsers />
            </AuthGuard>
          ),
        },
        {
          path: "/add-blocked-users/*",
          element: (
            <AuthGuard>
              <AddBlockedUsers />
            </AuthGuard>
          ),
        },
        {
          path: "/following-list/*",
          element: (
            <AuthGuard>
              <FollowingList />
            </AuthGuard>
          ),
        },
        {
          path: "/lists/*",
          element: (
            <AuthGuard>
              <Lists />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <ThemeConfig>
          <LoungeLayout isSearchPage={true} />
        </ThemeConfig>
      ),
      children: [
        {
          path: "/search",
          element: (
            <AuthGuard>
              <Search />
            </AuthGuard>
          ),
        },
      ],
    },
  ]);
}
