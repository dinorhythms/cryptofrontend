import {
	WALLET_FETCH,
	WALLET_RESOLVE,
	WALLET_REJECT,
  WALLET_CANCEL
} from "../types/walletTypes";

const initialState = {
	status: "idle",
	wallet: null
};

const walletReducer = (state = initialState, action) => {
	switch (action.type) {
		case WALLET_FETCH:
			return {
				...state,
				status: "loading"
			};
		case WALLET_RESOLVE:
			return {
				...state,
				status: "success",
				wallet: action.payload
			};
		case WALLET_REJECT:
			return {
				...state,
				status: "failure"
			};
		case WALLET_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default walletReducer;
