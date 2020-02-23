import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {editForceUpdate} from "../../services/forceUpdateService";


class editSharing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            iosVersion: "",
            androidVersion: "",
            androidURL: "",
            iosURL: "",
            isUpdateRequiredForAndroid: "",
            isUpdateRequiredForIOS: "",
            name: "",
            identifier: "",
        };
    }

    componentDidMount() {
        const {updateInfo} = this.props.location;
        if (!updateInfo) return this.props.history.goBack();
        this.setState({
            iosVersion: this.getValue(updateInfo.iosVersion),
            androidVersion: this.getValue(updateInfo.androidVersion),
            androidURL: this.getValue(updateInfo.androidURL),
            iosURL: this.getValue(updateInfo.iosURL),
            isUpdateRequiredForAndroid: this.getValue(updateInfo.isUpdateRequiredForAndroid),
            isUpdateRequiredForIOS: this.getValue(updateInfo.isUpdateRequiredForIOS),
            name: this.getValue(updateInfo.name),
            identifier: this.getValue(updateInfo.identifier),
        });
    }

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    prepareMerchantSelection(merchants) {
        let merchantArray = [{
            value: "",
            title: "انتخاب کنید..."
        }];
        merchants.forEach((merchant) => {
            let data = {
                value: merchant.identifier,
                title: merchant.name
            };
            merchantArray.push(data);
        });
        return merchantArray;
    }

    sendData = async () => {
        if(this.isValid()){
            const data = {
                "iosVersion": this.state.iosVersion,
                "androidVersion": this.state.androidVersion,
                "androidURL": this.state.androidURL,
                "iosURL": this.state.iosURL,
                "isUpdateRequiredForAndroid": this.state.isUpdateRequiredForAndroid,
                "isUpdateRequiredForIOS": this.state.isUpdateRequiredForIOS,
                "merchantInfoDTO": {
                    "identifier": this.state.identifier
                }
            };
            try {
                const result = await editForceUpdate(data);
                if (result.status === 200) {
                    toast.success('عملیات با موفقیت انجام شد.');
                    this.props.history.goBack();
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('خطایی در دریافت اطلاعات رخ داده است.');
                }
            }
            document.getElementById("loading").style.display = "none";
        }
    };

    getBack = () => {
        this.props.history.goBack();
    };

    isValid = () => {
        if(!this.getValue(this.state.iosVersion)){
            toast.error('ورژن ios برنامه بنویسید');
            return false ;
        }else if(!this.getValue(this.state.androidVersion)){
            toast.error('ورژن android برنامه بنویسید');
            return false ;
        }else if(!this.getValue(this.state.iosURL)){
            toast.error('آدرس ios برنامه بنویسید');
            return false ;
        }else if(!this.getValue(this.state.androidURL)){
            toast.error('آدرس android برنامه بنویسید');
            return false ;
        }else if(!this.getValue(this.state.isUpdateRequiredForIOS)){
            toast.error('آپدیت ios برنامه انتخاب کنید');
            return false ;
        }else if(!this.getValue(this.state.isUpdateRequiredForAndroid)){
            toast.error('آپدیت android برنامه انتخاب کنید');
            return false ;
        }else{
            return true
        }
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
        const option = [{value: "", name: "انتخاب کنید..."},
            {value: true, name: "اجباری"},
            {value: false, name: "غیر اجباری"},
        ];
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">ویرایش آپدیت</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>پذیرنده :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.name}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>ورژن ios :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.iosVersion}
                                   onChange={(e) => this.fillParameterValue(e.target.value, "iosVersion")}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>ورژن android :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.androidVersion}
                                   onChange={(e) => this.fillParameterValue(e.target.value, "androidVersion")}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>آدرس ios :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.iosURL}
                                   onChange={(e) => this.fillParameterValue(e.target.value, "iosURL")}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>آدرس android :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.androidURL}
                                   onChange={(e) => this.fillParameterValue(e.target.value, "androidURL")}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>آپدیت ios :</label>
                            <select
                                className="form-control text-center"
                                onChange={(e) => this.fillParameterValue(e.target.value, "isUpdateRequiredForIOS")}>
                                {option.map(
                                    (info) => {
                                        return (
                                            <option selected={info.value === this.state.isUpdateRequiredForIOS}
                                                    value={info.value}>{info.name}</option>);
                                    })}
                            </select>
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>آپدیت android :</label>
                            <select
                                className="form-control text-center"
                                onChange={(e) => this.fillParameterValue(e.target.value, "isUpdateRequiredForAndroid")}>
                                {option.map(
                                    (info) => {
                                        return (
                                            <option selected={info.value === this.state.isUpdateRequiredForAndroid}
                                                    value={info.value}>{info.name}</option>);
                                    })}
                            </select>
                        </div>
                    </div>

                    <div className="col-12 row py-4 justify-content-center">
                        <div className=" px-2 text-center justify-content-center">
                            <input type="button" className="btn btn-success" value="ویرایش"
                                   onClick={this.sendData}
                            />
                        </div>
                        <div className="px-2 text-center justify-content-center">
                            <input type="button" className="btn btn-danger" value="بازگشت"
                                   onClick={this.getBack}
                            />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default withRouter(editSharing);
