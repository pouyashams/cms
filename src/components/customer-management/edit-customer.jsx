import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {updateCustomerInfo} from "../../services/userService"


class EditCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            limitOnOrderRegistration: '',
            email: '',
            mobileNumber: '',
            nationalCode: '',
        };
        this.updateCustomer = this.updateCustomer.bind(this);
        this.canUpdateCustomerInfo = this.canUpdateCustomerInfo.bind(this);
        this.getValue = this.getValue.bind(this);
    }



    componentDidMount() {
        const {customerInfo} = this.props.location;

        if (!customerInfo) return this.props.history.push('/customer-management');

        this.setState({
            identifier: customerInfo.identifier,
            firstName: this.getValue(customerInfo.firstName),
            lastName: this.getValue(customerInfo.lastName),
            username: this.getValue(customerInfo.username),
            limitOnOrderRegistration: this.getValue(customerInfo.limitOnOrderRegistration),
            email: this.getValue(customerInfo.email),
            mobileNumber: this.getValue(customerInfo.mobileNumber),
            nationalCode: this.getValue(customerInfo.nationalCode)
        });
    }

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    async updateCustomer() {
        const canUpdateCustomer = this.canUpdateCustomerInfo();
        console.log(canUpdateCustomer);
        if (canUpdateCustomer) {
            try {
                const info = this.state;
                console.log(info);
                const result = await updateCustomerInfo(info);
                if (result.status === 200) {
                    toast.success('اصلاح مشتری با موفقیت انجام شد.');
                    this.props.history.goBack();
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('لطفا کلیه موارد را پر کنید');
                }
            }
        }
    };

    canUpdateCustomerInfo() {
        const {nationalCode, mobileNumber} = this.state;

        if (!this.hasValue(nationalCode)) {
            toast.error('کد ملی مشتری را وارد کنید.');
            return false;
        }

        if (!this.hasValue(mobileNumber)) {
            toast.error('شماره موبایل مشتری را وارد کنید.');
            return false;
        }

        return true;
    }

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    }

    getValue(field) {
        if (this.hasValue(field)) {
            return field;
        } else {
            return "";
        }
    }

    render() {

        let index = 1;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">اصلاح مشتری</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <form
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>نام :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="نام"
                                   value={this.state.firstName}
                                   name="firstName"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "firstName")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>نام خانوادگی :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="نام"
                                   value={this.state.lastName}
                                   name="lastName"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "lastName")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>نام کاربری:</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="نام کاربری"
                                   value={this.state.username}
                                   name="username"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "username")}
                            />
                        </div>


                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>رمز عبور :</label>
                            <input className="form-control text-center"
                                   type="password"
                                   autoComplete="off"
                                   placeholder="***"
                                   value={this.state.password}
                                   name="password"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "password")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>حد مجاز خرید :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder="حد مجاز خرید"
                                   value={this.state.limitOnOrderRegistration}
                                   name="limitOnOrderRegistration"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "limitOnOrderRegistration")}
                            />
                        </div>


                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>ایمیل :</label>
                            <input className="form-control text-center"
                                   type="email"
                                   placeholder="ایمیل"
                                   value={this.state.email}
                                   name="email"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "email")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>شماره همراه :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder="حد مجاز خرید"
                                   value={this.state.mobileNumber}
                                   name="mobileNumber"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "mobileNumber")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                            <label>کد ملی :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder="کد ملی"
                                   value={this.state.nationalCode}
                                   name="nationalCode"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "nationalCode")}
                            />
                        </div>

                        <div className="col-12 text-center justify-content-center">
                            <input type="button" className="btn btn-primary" value="ویرایش"
                                   onClick={this.updateCustomer}/>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

export default withRouter(EditCustomer);
