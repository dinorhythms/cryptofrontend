import {
	PLANS_FETCH,
	PLANS_RESOLVE,
	PLANS_REJECT,
  PLANS_CANCEL
} from "../types/plansTypes";

const initialState = {
	status: "idle",
	plans: null
};

const plansReducer = (state = initialState, action) => {
	switch (action.type) {
		case PLANS_FETCH:
			return {
				...state,
				status: "loading"
			};
		case PLANS_RESOLVE:
			return {
				...state,
				status: "success",
				plans: action.payload
			};
		case PLANS_REJECT:
			return {
				...state,
				status: "failure"
			};
		case PLANS_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default plansReducer;
