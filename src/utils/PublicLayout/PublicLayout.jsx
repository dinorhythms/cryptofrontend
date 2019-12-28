import React from "react";
import Grid from "@material-ui/core/Grid";


const PublicLayout = props => {
	return (
    <Grid container>
      <Grid item sxs={11} sm={12} md={12} elevation={6}>
        {props.children}
      </Grid>
    </Grid>
	);
};

export default PublicLayout;
