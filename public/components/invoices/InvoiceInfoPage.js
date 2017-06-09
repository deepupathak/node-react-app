'use strict';

import React from 'react';
import { browserHistory } from 'react-router'
import axios from 'axios';

export default class InvoiceInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    	id:0,
      customer_id: 0,
      discount:0,
      total: 0,
      disabled: true,
    };
    this.editInvoice = this.editInvoice.bind(this);
    this.saveInvoice = this.saveInvoice.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
  }

  componentWillMount() { 
    let that = this;
    axios.get(`/api/invoices/${this.props.params.invoice_id}`)
    .then(function (response) {
      let data = response.data;
      if(!data){
        browserHistory.push('/invoices');
      } else {
        that.setState({customer_id:data.customer_id, discount: data.discount, total: data.total});
      }
    })
    .catch(function (error) {
      alert(error);
    });
  }

   editInvoice(e){
      e.preventDefault();
      this.setState({disabled:false});
   }

   deleteInvoice(e){
     e.preventDefault();
     axios.delete(`/api/invoices/${this.props.params.invoice_id}`)
      .then(function (response) {
        browserHistory.push(`invoices`)
      })
      .catch(function (error) {
        alert(error);
      });
   }

   saveInvoice(e){
     e.preventDefault();
     let that = this;
     axios.put(`/api/invoices/${this.props.params.invoice_id}`, {customer_id:this.state.customer_id, discount:this.state.discount, total:this.state.total})
      .then(function (response) {
        let data = response.data;
        that.setState({customer_id: data.customer_id, discount: data.discount.toFixed(2), total: data.total});
      })
      .catch(function (error) {
        alert(error);
      });
    this.setState({disabled:true});
  }

  render() {
    return <div id="layout-content" className="layout-content-wrapper container">
      <div className="page-header">
        <h3 className="sub-header">Invoice Info</h3>
      </div>
      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-2" for="customer_id">Customer ID:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="customer_id" value={this.state.customer_id} onChange={(e) => this.setState({customer_id:e.target.value})} placeholder="Enter customer id"  disabled={this.state. disabled} />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="discount">Invoice Discount:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="discount" value={this.state.discount} onChange={(e) => this.setState({discount:e.target.value})} placeholder="Enter discount" disabled={this.state. disabled}/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="total">Invoice Total:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="total" value={this.state.total} onChange={(e) => this.setState({total:e.target.value})} placeholder="Enter total" disabled={this.state. disabled}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">              
            &nbsp;
            <button type="submit" className="btn btn-danger" onClick={this.deleteInvoice}><span className="glyphicon glyphicon-trash"></span> Delete</button>
          </div>
        </div>
      </form>
    </div>
  }
}
