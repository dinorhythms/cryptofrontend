import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';
import LockOpenIcon from '@material-ui/icons/LockOpen';

export const mainListItems = (
  <React.Fragment>
    <ListItem button key="Dashboard" component={NavLink} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button key="Invest" component={NavLink} to="/invest">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Invest Now" />
    </ListItem>
    <ListItem button key="Investments" component={NavLink} to="/investments">
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Investments History" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Withdraw Now" />
    </ListItem>
    <ListItem button key="Withdrawals" component={NavLink} to="/withdrawals">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Withdrawal History" />
    </ListItem>
  </React.Fragment>
)

export const secondaryListItems = (
  <div>
    <ListItem button key="Signout" component={NavLink} to="/signout">
      <ListItemIcon>
        <LockOpenIcon />
      </ListItemIcon>
      <ListItemText primary="Signout" />
    </ListItem>
  </div>
)
