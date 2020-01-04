import React from "react";
import { Switch, withRouter } from "react-router-dom";
import "./App.css";

// views
import Dashboard from "./pages/dashboard/Dashboard";
import Investments from "./pages/investments";
import Investment from "./pages/investments/Investment";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/signup/Signup";
import Signout from "./pages/signout/Signout";
import Withdrawal from "./pages/withdrawals/withdrawal";
import Withdrawals from "./pages/withdrawals/withdrawals";
import Invest from "./pages/invest";

// Routes
import PrivateRoute from "./services/PrivateRoute";
import PublicRoute from "./services/PublicRoute";

// layouts
import PrivateLayout from "./utils/PrivateLayout";
import Withdraw from "./pages/withdrawals/withdraw";
import AdminInvestments from "./pages/investments/AdminInvestments";
import AdminInvestment from "./pages/investments/AdminInvestment";
import AdminWithdrawals from "./pages/withdrawals/AdminWithdrawals";
import AdminWithdrawal from "./pages/withdrawals/AdminWithdrawal";
import Settings from "./pages/settings/settings";

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
			<PrivateRoute
				exact={true}
				path="/withdraw"
				component={Withdraw}
				role={[employeeRole]}
				Layout={PrivateLayout}
				{...props}
			/>

			{/* Admin Routes */}

			<PrivateRoute
				exact={true}
				path="/admin/investments"
				component={AdminInvestments}
				role={[adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/admin/investments/:investmentId"
				component={AdminInvestment}
				role={[adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/admin/withdrawals"
				component={AdminWithdrawals}
				role={[adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/admin/withdrawals/:withdrawalId"
				component={AdminWithdrawal}
				role={[adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>
			<PrivateRoute
				exact={true}
				path="/admin/settings"
				component={Settings}
				role={[adminRole]}
				Layout={PrivateLayout}
				{...props}
			/>

			<PublicRoute path="/login" component={SignIn} />
			<PublicRoute path="/signup" component={SignUp} />
		</Switch>
	);
}

export default withRouter(App);
