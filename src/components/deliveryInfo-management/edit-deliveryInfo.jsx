import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {updateCustomerInfo} from "../../services/userService"
import SearchResult from "../search/search-result";


class editDeliveryInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            waitingDay: "",
            numberOfDate: "",
            numberOfProduct: "",
            deliveryAmount: "",
            timePeriodList: [],
        };
        this.updateCustomer = this.updateCustomer.bind(this);
        this.getValue = this.getValue.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }



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

    }

    componentDidMount() {
        let {deliveryInfo} = this.props.location;
        console.log(deliveryInfo)
        console.log(123245)
        if (!deliveryInfo || deliveryInfo === undefined) return this.props.history.push('/deliveryInfo-management');
        this.setState({
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

    async updateCustomer() {
        const canUpdateCustomer = this.canUpdateCustomerInfo();
        console.log(canUpdateCustomer);
        if (canUpdateCustomer) {
            try {
                const info = this.state;
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
        const {pageSize, timePeriodList} = this.state;
        const headerInfo = this.getResultTableHeader();
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">اصلاح اطلاعات ارسال</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <form
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
                            <button className="btn btn-success btn-xs" data-title="اضافه کردن" onClick={console.log(1221)}>
                                <span className="fa fa-user-plus" title="اضافه کردن"/>
                            </button>
                        </div>
                        <div
                            className="col-12  p-3 text-center justify-content-center ">
                            <SearchResult headerInfo={headerInfo} searchResultList={timePeriodList}
                                          pageSize={pageSize}/>

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

export default withRouter(editDeliveryInfo);
