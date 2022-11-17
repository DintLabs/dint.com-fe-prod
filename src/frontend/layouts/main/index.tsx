import { FlexCol } from 'frontend/reusable/reusableStyled';
import { isIPhone } from 'frontend/utils';

import { Outlet } from 'react-router-dom';

import MainFooter from './MainFooter';
import MainNavbar from './MainNavBar';

export default function MainLayout() {
  return (
    <FlexCol h={isIPhone() ? `${window.innerHeight}` : '100vh'}>
      <MainNavbar />
      <div id="page-body" >
        <Outlet />
        <MainFooter />
      </div>
    </FlexCol>
  );
}
