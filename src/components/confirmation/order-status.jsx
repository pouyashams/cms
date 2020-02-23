import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {
    changeStatus,
    productDetails
} from "../../services/confirmationServise"
import SearchResult from "../search/search-result";

class orderStatus extends Component {

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
            status: "",
            customerReferenceNumber: "",
            productItemSellInfoList: "",
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
                {name: "count", title: "تعداد"},
                {name: "sumPrice", title: "مجموع مبالغ"},
            ]
        };
        return headerInfo;
    }

    cancelConfirmationInfo = async () => {
        this.props.history.goBack();
    };

    acceptConfirmationInfo = async () => {
        if(this.hasValue(this.state.status)){
            const data = {
                identifier : this.state.identifier,
                orderStatus:{
                    code:this.state.status
                }
            };
            console.log(data)
            const result = await changeStatus(data);
            try {
                if (result.status === 200) {
                    toast.success('عملیات با موفقیت انجام شد');
                    this.props.history.push({
                        pathname: '/confirmation',
                    });
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('خطایی در دریافت اطلاعات رخ داده است');
                }
            }
            document.getElementById("loading").style.display = "none";
        }else{
            toast.error("لطفا وضعیت سفارش را تغییر دهید");
        }
    };

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    async componentDidMount() {
        const {dataInfo} = this.props.location;
        if (!dataInfo) return this.props.history.push('/confirmation');
        try {
            const result = await productDetails(this.getValue({identifier : dataInfo.identifier}));
            if (result.status === 200) {
                const productItemSellInfoList = [];
                let resultInfo = result.data.data[0];
                console.log(resultInfo,12345)
                resultInfo.productItemSellInfoList.map(productItem => (
                    productItemSellInfoList.push(
                        {
                            "name": productItem.name,
                            "sumPrice": productItem.sumPrice,
                            "count": productItem.count,
                        }
                    )
                ));
                this.setState({
                    name: this.getValue(resultInfo.name),
                    mobileNumber: this.getValue(resultInfo.mobileNumber),
                    identifier: this.getValue(resultInfo.identifier),
                    date: this.getValue(resultInfo.orderDeliveryInfo.date),
                    orderStatus: this.getValue(resultInfo.orderStatus.name),
                    customerReferenceNumber: this.getValue(resultInfo.customerReferenceNumber),
                    time: this.getValue(resultInfo.orderDeliveryInfo.time),
                    registerDate: this.getValue(resultInfo.registerDate),
                    deliveryType: this.getValue(resultInfo.orderDeliveryInfo.deliveryType.name),
                    address: this.getValue(resultInfo.addressInfo.address),
                    canAcceptOrReject: this.getValue(resultInfo.canAcceptOrReject),
                    sumOfAmount: this.getValue(resultInfo.sumOfAmount),
                    productItemSellInfoList: productItemSellInfoList
                });
                document.getElementById("loading").style.display = "none";
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('مشکلی در ارتباط با سرور به وجود امده');
            }
        }
        document.getElementById("loading").style.display = "none";
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
        const option = [{value: "", name: "انتخاب کنید..."},
            {value: "READY_TO_SEND", name: "آماده ارسال"},
            {value: "DELIVERED_TO_CUSTOMER", name: "تحویل داده شده"}];
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">تغییر وضعیت سفارش</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        {/*<div className="form-group col-12 col-sm-6 col-md-3 float-right">*/}
                            {/*<label>نام خریدار :</label>*/}
                            {/*<input className="form-control text-center"*/}
                                   {/*type="text"*/}
                                   {/*value={this.state.name}*/}
                            {/*/>*/}
                        {/*</div>*/}
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
                            <label>وضعیت سابق سفارش :</label>
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
                            <SearchResult headerInfo={headerInfo} searchResultList={this.state.productItemSellInfoList}
                                          pageSize={pageSize}/>

                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>قیمت کل سفارش (ریال):</label>
                            <input className="form-control text-center w-75"
                                   type="text"
                                   value={this.state.sumOfAmount}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pb-3">
                            <label>تغییر وضعیت سفارش :</label>
                            <select
                                className="form-control text-center w-75"
                                onChange={(e) => this.fillParameterValue(e.target.value, "status")}
                            >
                                {option.map(
                                    (info) => {
                                        return (
                                            <option value={info.value}>{info.name}</option>);
                                    }
                                )}
                            </select>
                        </div>
                        <div className="col-12 text-center justify-content-center row align-items-center my-3">
                            <div className="px-3">

                                <input type="button" className="btn btn-success" value="تایید"
                                       onClick={this.acceptConfirmationInfo}/>
                            </div>
                            <div className="px-3">
                                <input type="button" className="btn btn-danger" value="بازگشت"
                                       onClick={this.cancelConfirmationInfo}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(orderStatus);
