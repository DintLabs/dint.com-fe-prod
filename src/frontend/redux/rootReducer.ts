import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import eventReducer from './slices/event';
import userProfileReducer from './slices/userProfile';
import marketplaceReducer from './slices/marketplace';
import adminReducer from './slices/admin';
import newHomeReducer from './slices/newHome';
import createWalletReducer from './actions/createWallet';
import getMaticBalanceReducer from './actions/wallet/getMaticBalance';
import getDintBalanceReducer from './actions/wallet/getDintBalance';
import metamaskReducer from './slices/metamask';
import messagesReducer from './slices/messages';
import viewPageReducer from './slices/viewPage';
import userReducer from './slices/user';
import pageReducer from './slices/page';
import subscriptionsReducer from './slices/subscriptions';
import subscribersReducer from './slices/subscribers';
import commonReducer from './slices/common';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const reducers = combineReducers({
  event: eventReducer,
  userProfile: userProfileReducer,
  marketplace: marketplaceReducer,
  admin: adminReducer,
  newHome: newHomeReducer,
  wallet: createWalletReducer,
  metamask: metamaskReducer,
  user: userReducer,
  messages: messagesReducer,
  page: pageReducer,
  viewPage: viewPageReducer,
  subscriptions: subscriptionsReducer,
  subscribers: subscribersReducer,
  common: commonReducer,
  maticBalance: getMaticBalanceReducer,
  dintBalance: getDintBalanceReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE')
    state = {
      ...state,
      messages: undefined,
      viewPage: undefined,
      page: undefined,
      user: undefined,
      subscriptions: undefined,
      subscribers: undefined
    };

  return reducers(state, action);
};

export { rootPersistConfig, rootReducer };
