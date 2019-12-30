import {
	WITHDRAWAL_FETCH,
	WITHDRAWAL_RESOLVE,
	WITHDRAWAL_REJECT,
  WITHDRAWAL_CANCEL
} from "../types/withdrawalsTypes";

const initialState = {
	status: "idle",
	withdrawal: null
};

const withdrawalReducer = (state = initialState, action) => {
	switch (action.type) {
		case WITHDRAWAL_FETCH:
			return {
				...state,
				status: "loading"
			};
		case WITHDRAWAL_RESOLVE:
			return {
				...state,
				status: "success",
				withdrawal: action.payload
			};
		case WITHDRAWAL_REJECT:
			return {
				...state,
				status: "failure"
			};
		case WITHDRAWAL_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default withdrawalReducer;
