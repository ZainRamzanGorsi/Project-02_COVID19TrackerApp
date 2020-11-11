import React from "react";
import { fetchData } from "./Components/api";
//Import Components
import NavBar from "./Components/NavBar";
import Cards from "./Components/Cards";
import Chart from "./Components/Chart";
import CountryPicker from "./Components/CountryPicker";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div
        styles={{
          display: "flex",
          alighItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <NavBar />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}
export default App;
