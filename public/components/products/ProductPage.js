'use strict';

import React from 'react';
import { Link, browserHistory } from 'react-router'
import axios from 'axios';

export default class InvoicePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     productList:[],
    	id: 0,
      name:'',
      price: 0,
    };
    this.products = this.products.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.UserList();
  }

  UserList() {
  	let that = this;
  	return axios.get('/api/products')
      .then(function (response) {
        that.setState({productList:response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  tableRowClick(id){
    browserHistory.push(`products/${id}`)
  }

  	products() {
  		return this.state.productList.map(product => {
         return	(
            <tr onClick={() => this.tableRowClick(product.id)}>
              <td >{product.id}</td>
              <td >{product.name}</td>
              <td >{product.price}</td>              
            </tr>
         	)
      })
  }

  openModal(id, name, price){
    console.log(id, name, price);
    $.noConflict(); 
    this.setState({id: id, name:name, price:price})
    $("#myModal").modal("show")
  } 

  updateProduct(id) {
    axios.post(`/api/products/${id}`, this.state)
      .then(function (response) {
        $("#myModal").modal("hide");
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
    return <div id="layout-content" className="layout-content-wrapper container">
      <div className="page-header">
        <h3 className="sub-header">Product List</h3>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {this.products()}
        </tbody>
      </table>      
      <button className="btn btn-default pull-left">
        <Link to={'/add-product'}><span className="glyphicon glyphicon-plus"></span> Add Product</Link>
      </button>
    </div>
  }
}
