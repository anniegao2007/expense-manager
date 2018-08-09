import React from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import { Link } from 'react-router-dom';
const querystring = require('querystring');

export default class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            messageFromServer: '',
            modalIsOpen: false,
            year: ''
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.onClick = this.onClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            year: this.props.year,
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            id: '',
            messageFromServer: ''
        });
    }

    onClick(e) {
        this.deleteItem(this);
    }

    deleteItem(e) {
        axios.get('/delete?id=' + e.state.id).then((response) => {
            e.setState({
                messageFromServer: response.data,
                modalIsOpen: true
            });
        });
    }

    render() {
        if(this.state.messageFromServer === '') {
            return (
              <div>
                  <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
                    <span className="glyphicon glyphicon-remove"></span>
                  </Button>
              </div>  
            );
        } else {
            return (
                <div>
                    <Button bsStyle="danger" bsSize="small">
                        <span className="glyphicon glyphicon-remove"></span>
                    </Button>
                    <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Delete Expense" className="Modal">
                        <div className="button-center">
                            <h3>{this.state.messageFromServer}</h3>
                            <Link to={{pathname: '/', search: '?year=' + this.state.year}} style={{textDecoration: 'none'}}>
                                <Button bsStyle="success" bsSize="xsmall" onClick={this.closeModal}>Close the Dialog</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}