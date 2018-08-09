import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import '../css/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: 'Jan',
      selectedYear: 2018,
      data: []
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData(this, '2018');
  }

  componentWillReceiveProps() {
    this.getData(this, '2018');
  }

  getData(ev, year) {
    axios.get('/getAll?month=All&year='+year)
      .then((response) => {
        ev.setState({ data: response.data });
        ev.setState({ selectedYear: parseInt(year) });
      });
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="desc-col">Description</th>
              <th className="button-col">Amount</th>
              <th className="button-col">Month</th>
              <th className="button-col">Year</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((exp) => (
                <tr key={exp._id}>
                  <td className="counterCell"></td>
                  <td className="desc-col">{exp.description}</td>
                  <td className="button-col">{exp.amount}</td>
                  <td className="button-col">{exp.month}</td>
                  <td className="button-col">{exp.year}</td>
                  <td><Update id={exp._id} desc={exp.description} amt={exp.amount} month={exp.month} year={exp.year}/></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Add />
      </div>
    );
  }
}
