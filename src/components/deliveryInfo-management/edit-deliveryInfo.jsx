import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import SearchResult from "../search/search-result";
import {sendDataOfDelivery} from "../../services/deliveryService";

class editDeliveryInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            identifier:"",
            checked: false,
            waitingDay: "",
            numberOfDate: "",
            numberOfProduct: "",
            deliveryAmount: "",
            fromTime: "",
            toTime: "",
            timePeriodList: [],
        };
        this.getValue = this.getValue.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }


    addTime = () => {
        const timePeriodList = this.state.timePeriodList.concat([{
            fromTime: this.state.fromTime,
            toTime: this.state.toTime,
            dateTime: this.state.fromTime + "-" + this.state.toTime
        }]);
        this.setState({timePeriodList, checked: false});
    };

    sendDataOfDeliveryInfo = async() => {
        let canSentProduct = this.state.timePeriodList.length > 0;
        const data = [
            {
                "canSentProduct": canSentProduct,
                "waitingDay": this.state.waitingDay,
                "numberOfDate": this.state.numberOfDate,
                "numberOfProduct": this.state.numberOfProduct,
                "deliveryAmount": this.state.deliveryAmount,
                "provinceInfo": {
                    "identifier": this.state.identifier
                },
                "timePeriodList": this.state.timePeriodList,
            }
        ];
        console.log(data)
        const result = await sendDataOfDelivery(data);
        try {
            if (result.status === 200) {
                toast.success('عملیات با موفقیت انجام شد.');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'delete',
                    title: 'حذف',
                    icon: 'fa fa-remove',
                    style: 'btn btn-danger btn-sm',
                    onclick: this.onDelete
                }
            ],
            headerTitleInfos: [
                {name: "fromTime", title: "از ساعت"},
                {name: "toTime", title: "تا ساعت"},
            ]
        };
        return headerInfo;
    }

    onDelete(data) {
        const dataInfo = this.state.timePeriodList.filter(dataInfos => dataInfos.dateTime !== data.dateTime);
        this.setState({timePeriodList: dataInfo});
        console.log(this.state.timePeriodList)
    }

    componentDidMount() {
        let {deliveryInfo} = this.props.location;
        if (!deliveryInfo || deliveryInfo === undefined) return this.props.history.push('/deliveryInfo-management');
        this.setState({
            identifier: this.getValue(deliveryInfo.identifier),
            deliveryAmount: this.getValue(deliveryInfo.deliveryAmount),
            numberOfProduct: this.getValue(deliveryInfo.numberOfProduct),
            numberOfDate: this.getValue(deliveryInfo.numberOfDate),
            waitingDay: this.getValue(deliveryInfo.waitingDay),
            timePeriodList: this.getValue(deliveryInfo.timePeriodList),
        });
    }

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    onCheckd = () => {
        this.setState({checked: true});
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
        const {pageSize, timePeriodList, checked} = this.state;
        const headerInfo = this.getResultTableHeader();
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">اصلاح اطلاعات ارسال</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تعداد روز انتظار :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.waitingDay}
                                   name="waitingDay"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تعداد روز پیشنهادی :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.numberOfDate}
                                   name="numberOfDate"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>سقف تعداد سفارش :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.numberOfProduct}
                                   name="numberOfProduct"
                                   onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>هزینه ارسال :</label>
                            <input className="form-control text-center"
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.deliveryAmount}
                                   name="deliveryAmount"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "nationalCode")}
                            />
                        </div>
                        <div className="col-12 py-2 text-center justify-content-center">
                            {checked === false ?
                                <button className="btn btn-success btn-xs" data-title="اضافه کردن"
                                        onClick={this.onCheckd}>
                                    <span className="fa fa-user-plus" title="اضافه کردن"/>
                                </button> :
                                <div className="col-12 justify-content-center align-items-center text-center">
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right py-3">
                                        <label>از ساعت :</label>
                                        <input className="form-control text-center"
                                               type="text"
                                               step="any"
                                               placeholder="hh:mm"
                                               value={this.state.fromTime}
                                               name="fromTime"
                                               onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                        />
                                    </div>
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right py-3 ">
                                        <label>تا ساعت :</label>
                                        <input className="form-control text-center"
                                               type="text"
                                               step="any"
                                               placeholder="hh:mm"
                                               value={this.state.toTime}
                                               name="toTime"
                                               onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                        />
                                    </div>
                                    <div className="form-group col-12 col-sm-6 col-md-2 w-25 float-right py-5">
                                        <input type="button" className="btn btn-success" value="افزودن زمان"
                                               onClick={this.addTime}
                                        />
                                    </div>
                                </div>
                            }

                        </div>
                        <div
                            className="col-12  p-3 text-center justify-content-center ">
                            <SearchResult headerInfo={headerInfo} searchResultList={timePeriodList}
                                          pageSize={pageSize}/>

                        </div>
                        <div className="col-12 text-center justify-content-center">
                            <input type="button" className="btn btn-primary" value="ویرایش"
                                   onClick={this.sendDataOfDeliveryInfo}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(editDeliveryInfo);
