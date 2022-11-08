// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserDataInterface } from 'frontend/interfaces/reduxInterfaces';
import { AppDispatch, RootState } from 'frontend/redux/store';
import { setUserData } from 'frontend/redux/slices/user';

interface UseUserHook {
  reduxUser: UserDataInterface | null;
  setCurrentUser: (newDataUser: UserDataInterface) => void;
}

const useUser = (): UseUserHook => {
  const dispatch = useDispatch<AppDispatch>();

  // storageUser
  // JSON.parse(localStorage.getItem('userData') || '');

  const reduxUser = useSelector((state: RootState) => state.user.userData);

  // useEffect(() => {
  //   if (reduxUser) {
  //     localStorage.setItem('userData', JSON.stringify(reduxUser));
  //   }
  // }, [reduxUser]);

  const setCurrentUser = (newDataUser: UserDataInterface) => {
    localStorage.setItem('userData', JSON.stringify(newDataUser));
    dispatch(setUserData(newDataUser));
  };

  return { reduxUser, setCurrentUser };
};

export default useUser;
