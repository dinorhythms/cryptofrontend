import {
	INVESTMENT_FETCH,
	INVESTMENT_RESOLVE,
	INVESTMENT_REJECT,
  INVESTMENT_CANCEL
} from "../types/investmentTypes";

const initialState = {
	status: "idle",
	investment: null
};

const investmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case INVESTMENT_FETCH:
			return {
				...state,
				status: "loading"
			};
		case INVESTMENT_RESOLVE:
			return {
				...state,
				status: "success",
				investment: action.payload
			};
		case INVESTMENT_REJECT:
			return {
				...state,
				status: "failure"
			};
		case INVESTMENT_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default investmentReducer;
