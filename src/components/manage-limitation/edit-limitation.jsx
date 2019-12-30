import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {sendlimitation} from "../../services/saleLimitation";

class editLimitation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileNumber: "",
            iranCellLimitation: "",
            mciLimitation: "",
            rightelLimitation: "",
            samantelLimitation: "",
        };
        this.getValue = this.getValue.bind(this);
    }


    sendData = async () => {
        const data = [
            {
                "mobileNumber": this.state.mobileNumber,
                "iranCellLimitation": this.state.iranCellLimitation,
                "mciLimitation": this.state.mciLimitation,
                "rightelLimitation": this.state.rightelLimitation,
                "samantelLimitation": this.state.samantelLimitation
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
            iranCellLimitation: this.getValue(limitation.iranCellLimitation),
            mciLimitation: this.getValue(limitation.mciLimitation),
            rightelLimitation: this.getValue(limitation.rightelLimitation),
            samantelLimitation: this.getValue(limitation.samantelLimitation),
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
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شماره موبایل  :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.mobileNumber}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>ایرانسل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.iranCellLimitation}
                                   name="iranCellLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>همراه اول (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.mciLimitation}
                                   name="mciLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>رایتل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.rightelLimitation}
                                   name="rightelLimitation"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>سامانتل (ریال) :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   value={this.state.samantelLimitation}
                                   name="samantelLimitation"
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
