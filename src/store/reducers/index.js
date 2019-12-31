import { combineReducers } from 'redux';

import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import investmentReducer from './investmentReducer';
import investmentsReducer from './investmentsReducer';
import walletReducer from './walletReducer';
import withdrawalReducer from './withdrawalReducer';
import withdrawalsReducer from './withdrawalsReducer';
import plansReducer from './plansReducer';
import investReducer from './investReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  investment: investmentReducer,
  investments: investmentsReducer,
  wallet: walletReducer,
  withdrawal: withdrawalReducer,
  withdrawals: withdrawalsReducer,
  plans: plansReducer,
  invest: investReducer
});

export default rootReducer;