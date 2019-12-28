import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_NOTIFICATION } from "../../store/types/notificationTypes";
import { AUTH_CANCEL } from "../../store/types/authTypes";
import { useSnackbar } from "notistack";

const NotificationBar = () => {
	const { enqueueSnackbar } = useSnackbar();

	const notification = useSelector(state => state.notification);
	const dispatch = useDispatch();
	const { error, message } = notification;
	const errorList = ["invalid signature", "jwt malformed", "auth/id-token-expired"];
	let msg = error;

	useEffect(() => {
		if (error) {
			if (error === errorList[2]) {
				dispatch({ type: AUTH_CANCEL });
				dispatch({ type: CLEAR_NOTIFICATION });
			} else {
				if (errorList.includes(error)) {
					// eslint-disable-next-line react-hooks/exhaustive-deps
					msg = "Ops something went wrong , please try later";
				}
				enqueueSnackbar(msg, { variant: "error" });
				dispatch({ type: CLEAR_NOTIFICATION });
			}
		}
		if (message) {
			enqueueSnackbar(message, { variant: "success" });
			dispatch({ type: CLEAR_NOTIFICATION });
		}
	}, [error, enqueueSnackbar, message]);

	return null;
};

export default NotificationBar;
