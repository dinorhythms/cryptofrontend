import {
	INVESTMENTS_FETCH,
	INVESTMENTS_RESOLVE,
	INVESTMENTS_REJECT,
  INVESTMENTS_CANCEL
} from "../types/investmentTypes";

const initialState = {
	status: "idle",
	investments: null
};

const investmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case INVESTMENTS_FETCH:
			return {
				...state,
				status: "loading"
			};
		case INVESTMENTS_RESOLVE:
			return {
				...state,
				status: "success",
				investments: action.payload
			};
		case INVESTMENTS_REJECT:
			return {
				...state,
				status: "failure"
			};
		case INVESTMENTS_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default investmentsReducer;
