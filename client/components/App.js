import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
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
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    this.getData(this, this.state.selectedYear);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.history.location.search) {
      let search = nextProps.history.location.search.substring(1);
      let searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"')
        .replace(/&/g, '","').replace(/=/g, '":"') + '"}');
      this.setState({ selectedYear: searchObj.year });
      this.getData(this, searchObj.year);
    }
  }

  getData(ev, year) {
    axios.get('/getAll?month=All&year='+year)
      .then((response) => {
        ev.setState({ data: response.data });
        ev.setState({ selectedYear: parseInt(year) });
      });
  }

  handleSelect(tab) {
    this.setState({ selectedYear: tab });
  }

  render() {
    return (
      <div>
        <Tabs id="yearTabs" activeKey={this.state.selectedYear} onSelect={this.handleSelect}>
          <Tab eventKey={2018} title={<YearTabsRouter year='2018'/>}></Tab>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}></Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}></Tab>
          <Tab eventKey={2021} title={<YearTabsRouter year='2021'/>}></Tab>
          <Tab eventKey={2022} title={<YearTabsRouter year='2022'/>}></Tab>
        </Tabs>
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="desc-col">Description</th>
              <th className="button-col">Amount</th>
              <th className="button-col">Month</th>
              <th className="button-col">Year</th>
              <th className="button-col">Update</th>
              <th className="button-col">Delete</th>
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
                  <td className="button-col"><Update id={exp._id} desc={exp.description} amt={exp.amount} month={exp.month} year={exp.year}/></td>
                  <td className="button-col"><Delete id={exp._id}/></td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <Add year={this.state.selectedYear}/>
      </div>
    );
  }
}
