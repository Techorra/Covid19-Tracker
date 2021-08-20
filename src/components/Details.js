import React from "react";
import axios from "axios";
import Summary from "./Summary";
import Countries from "./Countries";

class Details extends React.Component {
  state = {
    countries: [],
    global: [],
    currentDate: null,
    loading: true,
  };

  async componentDidMount() {
    const res = await axios.get("https://api.covid19api.com/summary");
    console.log(res);
    this.setState({ countries: res.data.Countries });
    this.setState({ global: res.data.Global });
    this.setState({ currentDate: res.data.Date });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      );
    }
    return (
      <div>
        <Summary
          summary={this.state.global}
          currentDate={this.state.currentDate}
        />
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>New Confirmed</th>
              <th>Total Recovered</th>
              <th>Total Deaths</th>
            </tr>
          </thead>
          <tbody>
            {this.state.countries.map((country) => (
              <Countries countries={country} key={country.Country} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Details;
