import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {acceptConfirmation,cancelConfirmation} from "../../services/confirmationServise"
import SearchResult from "../search/search-result";

class acceptConfirmations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            deliveryType: "",
            registerDate: "",
            date: "",
            time: "",
            mobileNumber: "",
            identifier: "",
            orderStatus: "",
            customerReferenceNumber: "",
            productInfoList: "",
            canAcceptOrReject: "",
            sumOfAmount: "",
        };

        this.getValue = this.getValue.bind(this);
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [],
            headerTitleInfos: [
                {name: "name", title: "نام کالا"},
                {name: "name", title: "تعداد"},
                {name: "count", title: "مجموع مبالغ"},
            ]
        };
        return headerInfo;
    }

    cancelConfirmationInfo = async() => {

        const result = await cancelConfirmation();
        try {
            if (result.status === 200) {
                toast.success('عملیات با موفقیت انجام شد.');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
    };

    acceptConfirmationInfo = async() => {

        const result = await acceptConfirmation();
        try {
            if (result.status === 200) {
                toast.success('عملیات با موفقیت انجام شد.');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
    };


    componentDidMount() {
        const {dataInfo} = this.props.location;


        if (!dataInfo) return this.props.history.push('/confirmation');

        this.setState({
            name: this.getValue(dataInfo.name),
            mobileNumber: this.getValue(dataInfo.mobileNumber),
            identifier: this.getValue(dataInfo.identifier),
            date: this.getValue(dataInfo.date),
            orderStatus: this.getValue(dataInfo.orderStatus),
            customerReferenceNumber: this.getValue(dataInfo.customerReferenceNumber),
            time: this.getValue(dataInfo.time),
            registerDate: this.getValue(dataInfo.registerDate),
            deliveryType: this.getValue(dataInfo.deliveryType),
            address: this.getValue(dataInfo.address),
            productInfoList: this.getValue(dataInfo.productInfoList),
            canAcceptOrReject: this.getValue(dataInfo.canAcceptOrReject),
            sumOfAmount: this.getValue(dataInfo.sumOfAmount),

        });
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
        const headerInfo = this.getResultTableHeader();
        const pageSize = 5;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">تایید سفارش</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام خریدار :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.name}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شماره تلفن :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.mobileNumber}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شناسه سفارش :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.identifier}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تاریخ دریافت :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.date}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>وضعیت سفارش :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.orderStatus}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شناسه پرداخت :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.customerReferenceNumber}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>زمان دریافت :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.time}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تاریخ ثبت کالا :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.registerDate}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نوع پست کالا :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.deliveryType}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-6 float-right">
                            <label>ادرس :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.address}
                            />
                        </div>
                        <div className="col-12  p-5 text-center justify-content-center ">
                            <SearchResult headerInfo={headerInfo} searchResultList={this.state.productInfoList}
                                          pageSize={pageSize}/>

                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>قیمت کل سفارش (ریال):</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.sumOfAmount}
                            />
                        </div>
                        {this.state.canAcceptOrReject === true ?
                            <div className="col-12 text-center justify-content-center row align-items-center my-3">
                                <div className="px-3">

                                    <input type="button" className="btn btn-primary" value="تایید"
                                           onClick={this.acceptConfirmationInfo}/>
                                </div>
                                <div className="px-3">
                                    <input type="button" className="btn btn-primary" value="لغو"
                                           onClick={this.cancelConfirmationInfo}/>
                                </div>
                            </div>
                            :
                            <div className="col-12 text-center justify-content-center">


                                <button className="btn btn-danger btn-sm">
                                    <span className="fa fa-warning"/>
                                </button>
                                <h6 className="p-2 font-weight-bold">(قادر به تایید یا لغو نمی باشید)</h6>
                            </div>
                        }

                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(acceptConfirmations);
