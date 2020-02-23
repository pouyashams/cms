import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {editForceUpdate} from "../../services/forceUpdateService";
import {fetchAllChildOfCurrentMerchant} from "../../services/userService";



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
            merchants: "",
            merchant: "",
        };
    }

    async componentDidMount() {
        try {
            const resultForFetchMerchants = await fetchAllChildOfCurrentMerchant();
            if (resultForFetchMerchants.status === 200) {
                const merchantArray = this.prepareMerchantSelection(resultForFetchMerchants.data.data);
                this.setState({
                    merchants: merchantArray
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
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
        if(this.isValid()) {
            const data = {
                "iosVersion": this.state.iosVersion,
                "androidVersion": this.state.androidVersion,
                "androidURL": this.state.androidURL,
                "iosURL": this.state.iosURL,
                "isUpdateRequiredForAndroid": this.state.isUpdateRequiredForAndroid,
                "isUpdateRequiredForIOS": this.state.isUpdateRequiredForIOS,
                "merchantInfoDTO": {
                    "identifier": this.state.merchant
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
        if(!this.getValue(this.state.merchant)){
            toast.error('پذیرنده را انتخاب کنید');
            return false ;
        }
        else if(!this.getValue(this.state.iosVersion)){
            toast.error(' برنامه را بنویسید ios ورژن');
            return false ;
        }else if(!this.getValue(this.state.androidVersion)){
            toast.error(' برنامه را بنویسید android ورژن');
            return false ;
        }else if(!this.getValue(this.state.iosURL)){
            toast.error(' برنامه را بنویسید ios آدرس');
            return false ;
        }else if(!this.getValue(this.state.androidURL)){
            toast.error(' برنامه را بنویسید android آدرس');
            return false ;
        }else if(!this.getValue(this.state.isUpdateRequiredForIOS)){
            toast.error(' برنامه را انتخاب کنید ios آپدیت');
            return false ;
        }else if(!this.getValue(this.state.isUpdateRequiredForAndroid)){
            toast.error(' برنامه را انتخاب کنید android آپدیت');
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
        const {merchants} = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">اضافه کردن آپدیت</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>پذیرنده :</label>
                            <select
                                className="form-control text-center"
                                onChange={(e) => this.fillParameterValue(e.target.value, "merchant")}
                            >

                                {merchants !== null && merchants !== "" && merchants !== undefined ?
                                    merchants.map(
                                        (option) => {
                                            return (<option value={option.value}>{option.title}</option>);
                                        }
                                    ) : null}
                            </select>
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>ورژن ios :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="ورژن ios"
                                   value={this.state.iosVersion}
                                   onChange={(e) => this.fillParameterValue(e.target.value, "iosVersion")}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>ورژن android :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="ورژن android"
                                   value={this.state.androidVersion}
                                   onChange={(e) => this.fillParameterValue(e.target.value, "androidVersion")}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>آدرس ios :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.iosURL}
                                   placeholder="آدرس ios"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "iosURL")}
                            />
                        </div>
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>آدرس android :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="آدرس android"
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
                        </div> <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
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
                            <input type="button" className="btn btn-success" value="اضافه کردن"
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
