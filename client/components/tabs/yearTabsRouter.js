import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class YearTabsRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                'fontSize': '16px'
            }
        };
    }

    render() {
        return (
            <Link to={{ pathname: '/', search: '?year=' + this.props.year }}>
                <p style={this.state.style}>{this.props.year}</p>
            </Link>
        );
    }
}