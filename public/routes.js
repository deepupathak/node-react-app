'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import InvoicePage from './components/invoices/InvoicePage';
import CreateInvoicePage from './components/invoices/CreateInvoicePage';
import InvoiceInfoPage from './components/invoices/InvoiceInfoPage';
import ProductPage from './components/products/ProductPage';
import AddProductPage from './components/products/AddProductPage';
import ProductInfoPage from './components/products/ProductInfoPage';

const routes = (
  <Route path="/" component={ Layout }>
    <IndexRoute component={ InvoicePage }/>
    <Route path="/invoices" component={ InvoicePage }/>
    <Route path="/create-invoice" component={ CreateInvoicePage }/>
    <Route path="/invoices/:invoice_id" component={ InvoiceInfoPage }/>
    <Route path="/products" component={ ProductPage }/>
    <Route path="/add-product" component={ AddProductPage }/>
    <Route path="/products/:product_id" component={ ProductInfoPage }/>
  </Route>  
);

export default routes;