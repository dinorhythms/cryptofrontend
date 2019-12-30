import React from "react";
import { Switch, withRouter } from "react-router-dom";
import "./App.css";

// Routes
import PrivateRoute from "./services/PrivateRoute";
import PublicRoute from "./services/PublicRoute";

// layouts
import PrivateLayout from "./utils/PrivateLayout";

// views
import SignIn from "./pages/sign-in/SignIn";
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/investments";
import Investment from "./pages/investments/Investment";

const adminRole = 'admin';
const employeeRole = 'user';

function App(props) {
	return (
		<Switch>
      <PrivateRoute
				exact={true}
				path="/dashboard"
				component={Dashboard}
				role={[employeeRole, adminRole]}
				layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/investments"
				component={Investments}
				role={[employeeRole, adminRole]}
				layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/investments/:investmentId"
				component={Investment}
				role={[employeeRole, adminRole]}
				layout={PrivateLayout}
				{...props}
			/>
			<PublicRoute path="/login" component={SignIn} />
		</Switch>
	);
}

export default withRouter(App);
