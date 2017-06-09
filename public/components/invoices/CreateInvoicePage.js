'use strict';

import React from 'react';
import { browserHistory } from 'react-router';
import axios from 'axios';

export default class CreateInvoicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_id:'',
      discount:0,
      customers:[],
      products:[],
      productsInCart:[]
    };
    this.props = {
      total:0,
      discountAmount:0,
      invoiceId:0,
    }
    this.renderCustomers = this.renderCustomers.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.renderProductsInCart = this.renderProductsInCart.bind(this);
    this.addToCart = this.addToCart.bind(this);    
    this.handleQuantity = this.handleQuantity.bind(this);
  }

  componentWillMount() {
    let that = this;
    axios.get('/api/customers')
    .then(function (response) {
      that.setState({customers: response.data});
    })
    .catch(function (error) {
      alert(error);
    });

    axios.get('/api/products')
    .then(function (response) {
      that.setState({products: response.data});
    })
    .catch(function (error) {
      alert(error);
    });
  }

  renderCustomers(){
    return this.state.customers.map(customer => {
      return (
        <option value={customer.id}>{customer.name}</option>
      )
    })
  }

  renderProducts(){
    return this.state.products.map(product => {
      return (
        <option value={product.id}>{product.name}</option>
      )
    })
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState != this.state){
      this.props.total = 0;
      this.props.discountAmount = 0;
      nextState.productsInCart.map(item => {
        let price = item.product_price * item.product_quantity;
        let discount = nextState.discount;
        let discountAmount = (price*discount)/100;
        let total = this.props.total+price-discountAmount;
        this.props.discountAmount= this.props.discountAmount + parseFloat(discountAmount.toFixed(2));
        this.props.total= parseFloat(total.toFixed(2));
      });
      if(!this.props.invoiceId && nextState.customer_id){
        let that = this;
        axios.post('/api/invoices', {
          customer_id: this.state.customer_id,
          discount: this.props.discountAmount,
          total: this.props.total
        }).then(function (response) {
          that.props.invoiceId = response.data.id;
        })
        .catch(function (error) {
          alert(error);
        });
      }else if(this.props.invoiceId && nextState.customer_id){
        axios.put(`/api/invoices/${this.props.invoiceId}`, {
          customer_id: this.state.customer_id,
          discount: this.props.discountAmount,
          total: this.props.total
        });
      }
    }
  }

  addToCart(product_id){
    this.state.products.map(product => {
      if(product.id == product_id){
       let productsInCart = this.state.productsInCart.slice();
       productsInCart.push({product_id:product.id, product_name: product.name, product_price: product.price, product_quantity:1});
       this.setState({ productsInCart: productsInCart });
      }
    })
  }

  handleQuantity(value, key) {
    const productsInCart = this.state.productsInCart;
    productsInCart[key].product_quantity = parseFloat(value?value:0);
    this.setState({
      productsInCart,
    });
  }

  renderProductsInCart() {
    return this.state.productsInCart.map( (productInCart, key) => {
      return (
        <li className="list-group-item">
          {productInCart.product_name}
          <input type="text" className="col-sm-2 pull-right" id="quantity" defaultValue={productInCart.product_quantity} onChange={(e) => this.handleQuantity(e.target.value, key)}/>
          <label className="control-label col-sm-2  pull-right" for="quantity">Quantity:</label>
        </li>
      )
    })
  }

  render() {
    return <div id="layout-content" className="layout-content-wrapper container">
      <div className="page-header">
        <h3 className="sub-header">Create Invoice</h3>
      </div>
      <form className="form-horizontal" >
        <div className="form-group">
          <label className="control-label col-sm-2" for="customer_id">Customer Name:</label>
          <div className="col-sm-10">                
            <select className="form-control" id="customer_id" onChange={(e) => this.setState({customer_id:e.target.value})} required>
               <option value="">Select</option>
               {this.renderCustomers()}
             </select>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="product_id">Product Name:</label>
          <div className="col-sm-10">                
            <select className="form-control" id="product_id" onChange={(e) => this.addToCart(e.target.value)} required>
               <option value="">Select</option>
               {this.renderProducts()}
             </select>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="productInCart">Products in cart:</label>
          <div className="col-sm-10">
            {
              this.state.productsInCart.length ?
                <span>
                  <ul className="list-group">
                    {this.renderProductsInCart()}
                  </ul>
                </span>
              :
                <span>
                  Add product to cart
                </span>
            }
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="discount">Discount(%):</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="discount" defaultValue={this.state.discount} onChange={(e) => this.setState({discount:e.target.value})} placeholder="Enter discount" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" for="total">Total:</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="total" value={this.props.total} disabled />
          </div>
        </div>
      </form>
    </div>
  }
}