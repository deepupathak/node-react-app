'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router'
import axios from 'axios';

export default class InvoicePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    	invoiceList: []
    };
    this.invoices = this.invoices.bind(this);
  }

  componentDidMount() {
    this.UserList();
  }

  UserList() {
  	let that = this;
  	return axios.get('/api/invoices')
      .then(function (response) {
        that.setState({invoiceList:response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tableRowClick(id){
    browserHistory.push(`invoices/${id}`)
  }

  invoices() {
    return this.state.invoiceList.map(invoice => {
      return (
        <tr onClick={() => this.tableRowClick(invoice.id)}>
          <td>{invoice.id}</td>
          <td>{invoice.customer_id}</td>
          <td>${invoice.discount}</td>
          <td>${invoice.total}</td>
        </tr>
     	)
    });
  }
  render() {
    return <div id="layout-content" className="layout-content-wrapper container">
      <div className="page-header">
        <h3 className="sub-header">Invoice List</h3>
      </div>
      {
        this.state.invoiceList.length > 0 ?
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Customer No</th>
                <th>Customer ID</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
             {this.invoices()}
            </tbody>
          </table>
        : <div className="col-md-3 col-md-offset-5">No invoices</div>
      }
      <br/>
      <button className="btn btn-default pull-left">
        <Link to={`/create-invoice`}><span className="glyphicon glyphicon-plus"></span> Add Invoice</Link>
      </button>
    </div>
  }
}
