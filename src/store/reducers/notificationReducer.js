import {
	SET_ERROR,
	CLEAR_NOTIFICATION,
	SET_SUCCESS
} from "../types/notificationTypes";

// Initial State
const initialState = {
	error: null,
	message: null
};

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERROR: {
			return {
				...state,
				error: action.payload,
				message: null
			};
		}
		case SET_SUCCESS: {
			return {
				...state,
				error: null,
				message: action.payload
			};
		}
		case CLEAR_NOTIFICATION: {
			return {
				...state,
				error: null,
				message: null
			};
		}
		default: {
			return state;
		}
	}
};

export default notificationReducer;
