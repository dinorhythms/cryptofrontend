import React from "react";
import { Switch, withRouter } from "react-router-dom";
import "./App.css";

// views
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/investments";
import Investment from "./pages/investments/Investment";
import SignIn from "./pages/sign-in/SignIn";
import Signout from "./pages/signout/Signout";
import Withdrawal from "./pages/withdrawals/withdrawal";
import Withdrawals from "./pages/withdrawals/withdrawals";
import Invest from "./pages/invest";

// Routes
import PrivateRoute from "./services/PrivateRoute";
import PublicRoute from "./services/PublicRoute";

// layouts
import PrivateLayout from "./utils/PrivateLayout";

const adminRole = "admin";
const employeeRole = "user";

function App(props) {
	return (
		<Switch>
			<PrivateRoute
				exact={true}
				path="/dashboard"
				component={Dashboard}
				role={[employeeRole, adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/investments"
				component={Investments}
				role={[employeeRole, adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/investments/:investmentId"
				component={Investment}
				role={[employeeRole, adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/withdrawals"
				component={Withdrawals}
				role={[employeeRole, adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/withdrawals/:withdrawalId"
				component={Withdrawal}
				role={[employeeRole, adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/signout"
				component={Signout}
				role={[employeeRole, adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/invest"
				component={Invest}
				role={[employeeRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PublicRoute path="/login" component={SignIn} />
		</Switch>
	);
}

export default withRouter(App);
