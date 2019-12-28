import React from "react";
import { Route, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({
	exact,
	path,
	component: Component,
	role,
  layout: Layout,
  history
}) => {
	const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  if (!isAuthenticated || (user && !role.includes(user.role))){
		history.push('/login');
		return null;
	}
	
	return (
		<Layout history={history} auth={auth}>
			<Route exact={exact} path={path} component={Component} />
		</Layout>
	);
};

export default withRouter(PrivateRoute);
