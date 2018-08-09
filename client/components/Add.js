import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
const querystring = require('querystring');

export default class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            amount: '',
            month: 'Jan',
            year: '',
            messageFromServer: '',
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    componentWillReceiveProps(props) {
        this.setState({ year: props.year });
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            description: '',
            amount: '',
            month: 'Jan',
            year: '',
            messageFromServer: ''
        });
    }

    handleTextChange(e) {
        if(e.target.name === 'description') {
            this.setState({ description: e.target.value });
        } else if(e.target.name === 'amount') {
            this.setState({ amount: e.target.value });
        }
    }

    handleSelectChange(e) {
        if(e.target.name === 'month') {
            this.setState({ month: e.target.value });
        } else if(e.target.name === 'year') {
            this.setState({ year: e.target.value });
        }
    }

    onClick(e) {
        this.insertNewExpense(this);
    }

    insertNewExpense(e) {
        axios.post('/insert',
            querystring.stringify({
                description: e.state.description,
                amount: e.state.amount,
                month: e.state.month,
                year: e.state.year
            }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
        }).then((response) => {
            e.setState({
                messageFromServer: response.data
            });
        });
    }

    render() {
        if(this.state.messageFromServer === '') {
            return (
              <div>
                  <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
                    <span className="glyphicon glyphicon-plus"></span>
                  </Button>
                  <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Expense" className="Modal">
                    <Link to={{pathname: '/', search: ''}} style={{textDecoration: 'none'}}>
                        <Button bsStyle="danger" bsSize="xsmall" onClick={this.closeModal}>
                            <span className="closebtn glyphicon glyphicon-remove"></span>
                        </Button>
                    </Link> <br />

                    <fieldset>
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" name="description" onBlur={this.handleTextChange}></input>
                        <label htmlFor="amount">Amount:</label>
                        <input type="number" id="amount" name="amount" onBlur={this.handleTextChange}></input>
                        <label htmlFor="month">Month:</label>
                        <select id="month" name="month" onBlur={this.handleSelectChange} defaultValue="Jan">
                            <option value="Jan" id="Jan">Jan</option>
                            <option value="Feb" id="Feb">Feb</option>
                            <option value="Mar" id="Mar">Mar</option>
                            <option value="Apr" id="Apr">Apr</option>
                            <option value="May" id="May">May</option>
                            <option value="Jun" id="Jun">Jun</option>
                            <option value="Jul" id="Jul">Jul</option>
                            <option value="Aug" id="Aug">Aug</option>
                            <option value="Sep" id="Sep">Sep</option>
                            <option value="Oct" id="Oct">Oct</option>
                            <option value="Nov" id="Nov">Nov</option>
                            <option value="Dec" id="Dec">Dec</option>
                        </select>
                        <label htmlFor="year">Year:</label>
                        <select id="year" name="year" onBlur={this.handleSelectChange} defaultValue={this.state.year}>
                            <option value="2018" id="19">2018</option>
                            <option value="2019" id="19">2019</option>
                            <option value="2020" id="20">2020</option>
                            <option value="2021" id="21">2021</option>
                            <option value="2022" id="22">2022</option>
                        </select>
                    </fieldset>
                    <div className="buttonCenter">
                        <br />
                        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Expense</Button>
                    </div>
                  </Modal>
              </div>  
            );
        } else {
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </Button>
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Expense" className="Modal">
                        <div className="button-center">
                            <h3>{this.state.messageFromServer}</h3>
                            <Link to={{pathname: '/', search: ''}} style={{textDecoration: 'none'}}>
                                <Button bsStyle="success" bsSize="xsmall" onClick={this.closeModal}>Close the Dialog</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}