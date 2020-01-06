import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {sendlimitation} from "../../services/saleLimitation";

class editLimitation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: "",
            chargeIranCellLimitation: "",
            chargeMCILimitation: "",
            chargeRightelLimitation: "",
            chargeSamantelLimitation: "",
            internetIranCellLimitation: "",
            internetMCILimitation: "",
            internetRightelLimitation: "",
            internetSamantelLimitation: "",
        };
        this.getValue = this.getValue.bind(this);
    }


    sendData = async () => {
        const data = [
            {
                chargeIranCellLimitation: this.state.chargeIranCellLimitation,
                chargeMCILimitation: this.state.chargeMCILimitation,
                chargeRightelLimitation: this.state.chargeRightelLimitation,
                chargeSamantelLimitation: this.state.chargeSamantelLimitation,
                internetIranCellLimitation: this.state.internetIranCellLimitation,
                internetMCILimitation: this.state.internetMCILimitation,
                internetRightelLimitation: this.state.internetRightelLimitation,
                internetSamantelLimitation: this.state.internetSamantelLimitation,
                mobileNumber: this.state.mobileNumber,
            },
        ];
        const result = await sendlimitation(data);
        try {
            if (result.status === 200) {
                toast.success('عملیات با موفقیت انجام شد.');
                this.props.history.push({
                    pathname: '/manage-limitation',
                });

            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
                this.props.history.push({
                    pathname: '/manage-limitation',
                });
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    componentDidMount() {
        let {limitation} = this.props.location;
        if (!limitation || limitation === undefined) return this.props.history.push('/manage-limitation');
        this.setState({
            mobileNumber: this.getValue(limitation.mobileNumber),
            chargeIranCellLimitation: this.getValue(limitation.chargeIranCellLimitation),
            chargeMCILimitation: this.getValue(limitation.chargeMCILimitation),
            chargeRightelLimitation: this.getValue(limitation.chargeRightelLimitation),
            chargeSamantelLimitation: this.getValue(limitation.chargeSamantelLimitation),
            internetIranCellLimitation: this.getValue(limitation.internetIranCellLimitation),
            internetMCILimitation:this.getValue(limitation.internetMCILimitation),
            internetRightelLimitation: this.getValue(limitation.internetRightelLimitation),
            internetSamantelLimitation: this.getValue(limitation.internetSamantelLimitation),
        });
    }

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };


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
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">اصلاح محدودیت مشتری</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>شماره موبایل :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder=""
                                   value={this.state.mobileNumber}
                                   name="mobileNumber"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>شارژ ایرانسل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder=""
                                   value={this.state.chargeIranCellLimitation}
                                   name="chargeIranCellLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>شارژ همراه اول (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.chargeMCILimitation}
                                   name="chargeMCILimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>شارژ رایتل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any" value={this.state.chargeRightelLimitation}
                                   name="chargeRightelLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>شارژ سامانتل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.chargeSamantelLimitation}
                                   name="chargeSamantelLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>اینترنت ایرانسل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder=""
                                   value={this.state.internetIranCellLimitation}
                                   name="internetIranCellLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>اینرنت همراه اول (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.internetMCILimitation}
                                   name="internetMCILimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>اینترنت رایتل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any" value={this.state.internetRightelLimitation}
                                   name="internetRightelLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>اینترنت سامانتل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.internetSamantelLimitation}
                                   name="internetSamantelLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="col-12 text-center justify-content-center">
                            <input type="button" className="btn btn-success" value="ویرایش"
                                   onClick={this.sendData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(editLimitation);
