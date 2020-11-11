import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { fetchDailyData } from "./api";
import { Line, Bar } from "react-chartjs-2";

const useStyles = makeStyles((theme) => ({
  // container: {
  //   width: "80%",
  //   marginTop: 30,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   alignItems: "center",
    
  // },
  "& > *": {
    paddingTop: 20,
    margin: theme.spacing(5),
    width: theme.spacing(30),
    height: theme.spacing(15),
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
}));

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const classes = useStyles();
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);
  //**********CHART *****/

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            labels: "Infected",
            borderColor: "blue",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            labels: "Deaths",
            borderColor: "red",
            backgroundColor: "rgb(250,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,250,0.5)",
              "rgba(0,250,0,0.5)",
              "rgba(250,0,0,0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        lagend: { display: false },
        title: { display: true, text: `Current Stats in ${country}` },
      }}
    />
  ) : null;

  return (
    <div style={{paddingLeft: '10%',width: '80%',justifyContent: 'center', display: 'flex'}} className={classes.container}>
      {country ? barChart : lineChart}
    </div>
  );
};

export default Chart;
