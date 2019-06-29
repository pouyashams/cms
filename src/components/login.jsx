import React, {Component} from 'react';
import {login} from '../services/loginService';
import {toast, ToastContainer} from 'react-toastify';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    handleSubmit = async e => {
        e.preventDefault();

        try {
            const access_token = await login(this.state.username, this.state.password);
            if (access_token !== null) {
                sessionStorage.setItem('token', access_token);
                sessionStorage.removeItem("login-message");
                this.props.history.replace('/');
            } else {
                toast.error('نام کاربری یا کلمه عبور اشتباه هست');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400)
                toast.error('نام کاربری یا کلمه عبور اشتباه هست');
        }
    };

    render() {
        return (
            <form
                onSubmit={this.handleSubmit}
                className="rtl form-signin border rounded m-2 mx-auto bg-light shadow text-center"
            >
                <ToastContainer/>
                <h5 className="alert py-3 mb-3 font-weight-normal text-center bg-dark text-light">سیستم مدیریت محتوا آیسان</h5>
                {
                    sessionStorage.getItem("login-message") ? (<span className="alert alert-danger py-2 mb-3 font-weight-normal text-center">{sessionStorage.getItem("login-message")}</span>) : null

                }
                <label htmlFor="inputUsername" className="sr-only">
                    نام کاربری
                </label>
                <input
                    type="text"
                    id="inputUsername"
                    className="form-control my-3 rounded"
                    placeholder="نام کاربری"
                    value={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                    required
                    autoFocus
                />
                <label htmlFor="inputPassword" className="sr-only">
                    کلمه عبور
                </label>
                <input
                    type="password"
                    id="inputPassword"
                    autoComplete="off"
                    className="form-control rounded"
                    placeholder="کلمه عبور"
                    value={this.state.password}
                    onChange={e => this.setState({password: e.target.value})}
                    required
                />

                <button className="btn btn-lg btn-primary btn-block" type="submit">
                    ورود
                </button>
            </form>
        );
    }
}

export default Login;
