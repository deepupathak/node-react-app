'use strict';

import React from 'react';
import { browserHistory } from 'react-router'
import axios from 'axios';

export default class ProductInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      id: 0,
      name:'',
      price: 0,
      disabled: true,
    };
    this.editProduct = this.editProduct.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentWillMount() { 
    let that = this;
      axios.get(`/api/products/${this.props.params.product_id}`)
      .then(function (response) {
        let data = response.data;
        that.setState({id:data.id, name: data.name, price: data.price});
      })
      .catch(function (error) {
        alert(error);
      });
  }

   editProduct(e){
      e.preventDefault();
      this.setState({disabled:false});
   }

   deleteProduct(e){
     e.preventDefault();
     axios.delete(`/api/products/${this.props.params.product_id}`)
      .then(function (response) {
        browserHistory.push(`products`)
      })
      .catch(function (error) {
        alert(error);
      });
   }

   saveProduct(e){
     e.preventDefault();
     let that = this;
     axios.put(`/api/products/${this.props.params.product_id}`, {name:this.state.name, price:this.state.price})
      .then(function (response) {
        let data = response.data;
        that.setState({name: data.name, price: data.price});
      })
      .catch(function (error) {
        alert(error);
      });
    this.setState({disabled:true});
  }

  render() {
    return <div id="layout-content" className="layout-content-wrapper container">
      <div className="page-header">
        <h3 className="sub-header">Product Info</h3>
      </div>
      <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-sm-2" for="name">Product Name:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" value={this.state.name} onChange={(e) => this.setState({name:e.target.value})} placeholder="Enter product name"  disabled={this.state. disabled} />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" for="price">Product Price:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="price" value={this.state.price} onChange={(e) => this.setState({price:e.target.value})} placeholder="Enter product price" disabled={this.state. disabled}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
              {this.state.disabled ?
                <button type="submit" className="btn btn-default" onClick={this.editProduct}><span className="glyphicon glyphicon-edit"></span> Edit</button>
              :
                <button type="submit" className="btn btn-success" onClick={this.saveProduct}><span className="glyphicon glyphicon-floppy-disk"></span> Save</button>
              }&nbsp;&nbsp;
              <button type="submit" className="btn btn-danger" onClick={this.deleteProduct}><span className="glyphicon glyphicon-trash"></span> Delete</button>
              </div>
            </div>
          </form>
    </div>
  }
}
