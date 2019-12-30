import {
	WITHDRAWALS_FETCH,
	WITHDRAWALS_RESOLVE,
	WITHDRAWALS_REJECT,
  WITHDRAWALS_CANCEL
} from "../types/withdrawalsTypes";

const initialState = {
	status: "idle",
	withdrawals: null
};

const withdrawalsReducer = (state = initialState, action) => {
	switch (action.type) {
		case WITHDRAWALS_FETCH:
			return {
				...state,
				status: "loading"
			};
		case WITHDRAWALS_RESOLVE:
			return {
				...state,
				status: "success",
				withdrawals: action.payload
			};
		case WITHDRAWALS_REJECT:
			return {
				...state,
				status: "failure"
			};
		case WITHDRAWALS_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default withdrawalsReducer;
