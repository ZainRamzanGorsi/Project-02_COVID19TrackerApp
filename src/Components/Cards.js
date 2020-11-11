import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CountUp from "react-countup";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
//*********** CSS ***********/
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "cyan",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "& > *": {
      paddingTop: 20,
      margin: theme.spacing(5),
      width: theme.spacing(30),
      height: theme.spacing(15),
    },
  },
}));

function Cards({ data: { confirmed, recovered, deaths, lastUpdate },  }) {
  const classes = useStyles();
  if (!confirmed) {
    return(
    <div style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: '20%'}}>
      <h1>Please Waite! Data is Loading...</h1> 
      <br />
      <h6>Sorry! This is due to heavy load in <b>API</b>.</h6>
      </div>
     );
  }
  return (
    <div className={classes.root}>
      <Paper elevation={3} style={{ color: "Black", fontWeight: "bold" }}>
        Total Confirmed Cases
        <Typography variant="h4" style={{ fontWeight: "bold", marginTop: 10 }}>
          <CountUp start={0} end={confirmed.value} duration={2.5} separator="," />
        </Typography>
        <Typography variant="body2" style={{ color: "Black"}}>
          {new Date(lastUpdate).toDateString()}
        </Typography>
      </Paper>

      <Paper elevation={3} style={{ color: "Green", fontWeight: "bold" }}>
        Total Recovered Cases
        <Typography variant="h4" style={{ fontWeight: "bold", marginTop: 10 }}>
          <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
        </Typography>
        <Typography variant="body2" style={{ color: "Green"}}>
          {new Date(lastUpdate).toDateString()}
        </Typography>
      </Paper>

      <Paper elevation={3} style={{ color: "red", fontWeight: "bold" }}>
        Total Deaths
        <Typography variant="h4" style={{ fontWeight: "bold", marginTop: 10 }}>
          <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
        </Typography>
        <Typography variant="body1" color="textSecondary" style={{ color: "red" }}>
          {new Date(lastUpdate).toDateString()}
        </Typography>
      </Paper>
    </div>
  );
}

export default Cards;
