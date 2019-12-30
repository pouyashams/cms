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
import updateProduct from "./components/product/update-product";
import addProduct from "./components/product/add-product";
import RegisterMerchant from "./components/merchant-management/register-merchant";
import EditMerchant from "./components/merchant-management/edit-merchant";
import MerchantManagement from "./components/merchant-management/merchant-management";
import productInfo from "./components/product/product-info";
import acceptProduct from "./components/product/accept-product";
import productInfoUpdate from "./components/product/product-info-update";
import deliveryInfoManagement from "./components/deliveryInfo-management/deliveryInfo-management";
import editDeliveryInfo from "./components/deliveryInfo-management/edit-deliveryInfo";
import hardwareInfo from "./components/hardwareInfo";
import Confirmation from "./components/confirmation/confirmation";
import acceptConfirmation from "./components/confirmation/accept-confirmation";
import acceptReturnConfirmation from "./components/confirmation/accept-return-confirmation";
import simcardManagement from "./components/simcard-management/simcard-management";
import acceptSimcard from "./components/simcard-management/accept-simcard";
import menuProductInfoManagement from "./components/menu-product-info-management/menu-product-info-management";
import returnConfirmation from "./components/confirmation/return-confirmation";
import festivalSale from "./components/festival-sale/festival-sale";
import editFestivalSale from "./components/festival-sale/edit-festival-sale";
import rejectProduct from "./components/rejectProduct-management/rejectProduct";
import editRejectProduct from "./components/rejectProduct-management/edit-reject-product";
import requirementsAudit from "./components/requirements-audit/requirements-audit";
import acceptRequirementsAudit from "./components/requirements-audit/accept-requirements-audit";
import manageLimitation from "./components/manage-limitation/manage-limitation";
import editManageLimitation from "./components/manage-limitation/edit-limitation";
import addManageLimitation from "./components/manage-limitation/add-limitation";

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
                                <PrivateRoute path="/add-product" exact={false} component={addProduct}/>
                                <PrivateRoute path="/product-info" exact={false} component={productInfo}/>
                                <PrivateRoute path="/product-management" exact={false} component={updateProduct}/>
                                <PrivateRoute path="/simcard-management" exact={false} component={simcardManagement}/>
                                <PrivateRoute path="/accept-simcard" exact={false} component={acceptSimcard}/>
                                <PrivateRoute path="/product-info-update" exact={false} component={productInfoUpdate}/>
                                <PrivateRoute path="/accept-product" exact={false} component={acceptProduct}/>
                                <PrivateRoute path="/deliveryInfo-management" exact={false} component={deliveryInfoManagement}/>
                                <PrivateRoute path="/edit-deliveryInfo" exact={false} component={editDeliveryInfo}/>
                                <PrivateRoute path="/hardwareInfo" exact={false} component={hardwareInfo}/>
                                <PrivateRoute path="/confirmation" exact={false} component={Confirmation}/>
                                <PrivateRoute path="/accept-confirmation" exact={false} component={acceptConfirmation}/>
                                <PrivateRoute path="/accept-return-confirmation" exact={false} component={acceptReturnConfirmation}/>
                                <PrivateRoute path="/return-confirmation" exact={false} component={returnConfirmation}/>
                                <PrivateRoute path="/menu-product-info-management" exact={false} component={menuProductInfoManagement}/>
                                <PrivateRoute path="/product-reject" exact={false} component={rejectProduct}/>
                                <PrivateRoute path="/edit-product-reject" exact={false} component={editRejectProduct}/>
                                <PrivateRoute path="/festival-sale" exact={false} component={festivalSale}/>
                                <PrivateRoute path="/edit-festival-sale" exact={false} component={editFestivalSale}/>
                                <PrivateRoute path="/requirements-audit" exact={false} component={requirementsAudit}/>
                                <PrivateRoute path="/accept-requirements-audit" exact={false} component={acceptRequirementsAudit}/>
                                <PrivateRoute path="/manage-limitation" exact={false} component={manageLimitation}/>
                                <PrivateRoute path="/edit-limitation" exact={false} component={editManageLimitation}/>
                                <PrivateRoute path="/add-limitation" exact={false} component={addManageLimitation}/>
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
