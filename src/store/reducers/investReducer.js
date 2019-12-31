import { ADD_PLAN, ADD_AMOUNT, CLEAR_INVEST, INVEST, INVEST_ERROR } from "../types/investTypes";

const initialState = {
	status: "idle",
  selectedPlan: null,
  amount: 0,
  profit: 0,
  total: 0
};

const investReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_PLAN:
			return {
				...state,
				selectedPlan: action.payload
      };
      case ADD_AMOUNT:
        return {
          ...state,
          ...action.payload
        };
      case INVEST:
        return {
          ...state,
          status: "loading"
        };
      case INVEST_ERROR:
          return {
            ...state,
            status: "idle"
          };
      case CLEAR_INVEST:
        return {
          ...state,
          status: 'idle',
          selectedPlan: null,
          amount: 0,
          profit: 0,
          total: 0
        };
		default:
			return state;
	}
};

export default investReducer;
