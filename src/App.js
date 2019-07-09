import React, {Component} from 'react';
import {Switch, Redirect, Router, withRouter} from 'react-router-dom';
import Navbar from './components/common/navbar';
import Sidebar from './components/common/sidebar';
import Footer from './components/common/footer';
import CustomerManagement from "./components/customer-management/customer-management";
import definitionProductCategory from "./components/definition-product-category"
import productCategory from "./components/product-category"
import {PrivateRoute} from "./components/privateroute";
import {ToastContainer} from "react-toastify";
import EditCustomer from "./components/customer-management/edit-customer";
import reportOfCharge from "./components/report/report-of-charge";
import reportOfBill from "./components/report/report-of-bill";
import reportOfInternetPack from "./components/report/report-of-internet-pack";
import addProductFirstPage from "./components/add-product/add-product";
import RegisterMerchant from "./components/register-merchant";
import EditMerchant from "./components/edit-merchant";
import MerchantManagement from "./components/merchant-management";

class App extends Component {
    render() {
        return (
            <div className="container-fluid rtl">
                <Navbar/>
                <ToastContainer/>
                <div className="row">
                    <Sidebar/>
                    <main
                        role="main"
                        className="col-12 col-md-10 offset-md-2 text-center justify-content-center align-items-center"
                    >
                        <Router history={this.props.history}>
                            <Switch>
                                <PrivateRoute path="/product-category" exact={false} component={productCategory}/>
                                <PrivateRoute path="/definition-product-category" exact={false} component={definitionProductCategory}/>

                                <PrivateRoute path="/edit-customer" exact={false} component={EditCustomer}/>
                                <PrivateRoute path="/edit-merchant" exact={false} component={EditMerchant}/>
                                <PrivateRoute path="/register-merchant" exact={false} component={RegisterMerchant}/>
                                <PrivateRoute path="/customer-management" exact={false} component={CustomerManagement}/>
                                <PrivateRoute path="/merchant-management" exact={false} component={MerchantManagement}/>

                                <PrivateRoute path="/report-of-charge" exact={false} component={reportOfCharge}/>
                                <PrivateRoute path="/report-of-bill" exact={false} component={reportOfBill}/>
                                <PrivateRoute path="/report-of-internet-pack" exact={false} component={reportOfInternetPack}/>

                                <PrivateRoute path="/add-product" exact={false} component={addProductFirstPage}/>

                                <PrivateRoute path="/" exact={true} component={productCategory}/>
                                <Redirect to="/not-found"/>
                            </Switch>
                        </Router>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default withRouter(App);
