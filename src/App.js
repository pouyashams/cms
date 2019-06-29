import React, {Component} from 'react';
import {Switch, Redirect, Router, withRouter} from 'react-router-dom';
import Navbar from './components/common/navbar';
import Sidebar from './components/common/sidebar';
import Footer from './components/common/footer';
import CustomerManagement from "./components/customer-management";
import {PrivateRoute} from "./components/privateroute";
import {ToastContainer} from "react-toastify";
import EditCustomer from "./components/edit-customer";

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
                                <PrivateRoute path="/edit-customer" exact={false} component={EditCustomer}/>
                                <PrivateRoute path="/customer-management" exact={false} component={CustomerManagement}/>
                                <PrivateRoute path="/" exact={true} component={CustomerManagement}/>
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
