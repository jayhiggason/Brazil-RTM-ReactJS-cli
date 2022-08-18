/**
 *
 * NotFound
 *
 */

import React, { memo } from "react";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

/** Styles class*/
const useStyles = makeStyles(() => ({

  heading: {
    margin: '10px',
    fontSize: '20px',
    fontFamily:'MarsCentra-Bold',
  },
  Card:{
    height:'200px'
  }
}));

export function NotFound() {
  const classes= useStyles();
  return (

      <Card  elevation={5} style={{margin: '40px 40px 40px 40px', }}>
        <Grid container className={classes.Card}
              justify="center"
              alignItems="center">
          <Grid item >
            <Typography className={classes.heading}  align={'center'}>Page Not Found</Typography>
          </Grid>

        </Grid>
      </Card>

  );
}

export default memo(NotFound);
