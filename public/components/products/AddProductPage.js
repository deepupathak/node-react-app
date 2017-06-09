'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class AddProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      name:'',
      price:0,
    };
    this.addProduct = this.addProduct.bind(this);
  }

  addProduct(e) {
    e.preventDefault();
    axios.post('/api/products', this.state)
      .then(function (response) {
        browserHistory.push('/products');
      })
      .catch(function (error) {
        alert(error);
      });
  }

  render() {
   return <div id="layout-content" className="layout-content-wrapper container">
          <div className="page-header">
            <h3 className="sub-header">Add Products</h3>
          </div>
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-sm-2" for="name">Product Name:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" onChange={(e) => this.setState({name:e.target.value})} placeholder="Enter product name" />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="price">Product Price:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="price" onChange={(e) => this.setState({price:e.target.value})} placeholder="Enter product price" />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-default" onClick={this.addProduct}>Submit</button>
              </div>
            </div>
          </form>
      </div>
  }
}