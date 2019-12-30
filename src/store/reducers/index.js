import { combineReducers } from 'redux';

import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import investmentReducer from './investmentReducer';
import investmentsReducer from './investmentsReducer';
import walletReducer from './walletReducer';
import withdrawalReducer from './withdrawalReducer';
import withdrawalsReducer from './withdrawalsReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  investment: investmentReducer,
  investments: investmentsReducer,
  wallet: walletReducer,
  withdrawal: withdrawalReducer,
  withdrawals: withdrawalsReducer
});

export default rootReducer;