import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import DatePicker from "../SimpleDatePicker";
import {toast} from 'react-toastify';
import {addSharingInfo} from "../../services/sharingService";


class editSharing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "",
            merchants: "",
            merchant: "",
            date: "",
            multiplexedSaleInfoList: [],
            amount: "",
            iban: "",
            percent: "",
        };
        this.fillDateParameterValue = this.fillDateParameterValue.bind(this);
    }

    componentDidMount() {
        const {shareInfo} = this.props.location;
        if (!shareInfo) return this.props.history.goBack();
        const multiplexedSaleInfoList = [];
        shareInfo.multiplexedSaleInfos.forEach((info) => {
            const data = {
                "iban": info.iban,
                "percent": info.percent,
                "amount": info.amount,
                "id": shareInfo.multiplexedSaleInfos.indexOf(info),
            };
            multiplexedSaleInfoList.push(data);
        });
        this.setState({
            name: this.getValue(shareInfo.name),
            id: this.getValue(shareInfo.id),
            identifier: this.getValue(shareInfo.identifier),
            date: this.getValue(shareInfo.date),
            multiplexedSaleInfoList: multiplexedSaleInfoList,
            type: this.getValue(shareInfo.typeCode),
            typeName: this.getValue(shareInfo.typeName),
        });
    }

    addIban = (value, name) => {
        if (name === "percent") {
            this.setState({[name]: value, amount: ""});

        } else if (name === "amount") {
            this.setState({[name]: value, percent: ""});
        } else {
            this.setState({[name]: value});
        }
    };

    updateIban = (value, id) => {
        const {multiplexedSaleInfoList} = this.state;
        multiplexedSaleInfoList[id].iban = value;
        this.setState({
            multiplexedSaleInfoList
        });
        console.log(multiplexedSaleInfoList, 123)
    };

    updateIbanPercent = (value, id) => {
        const {multiplexedSaleInfoList} = this.state;
        multiplexedSaleInfoList[id].percent = value;
        multiplexedSaleInfoList[id].amount = "";
        this.setState({
            multiplexedSaleInfoList
        });
        console.log(multiplexedSaleInfoList, 123)
    };

    updateIbanAmount = (value, id) => {
        const {multiplexedSaleInfoList} = this.state;
        multiplexedSaleInfoList[id].amount = value;
        multiplexedSaleInfoList[id].percent = "";
        this.setState({
            multiplexedSaleInfoList
        });
        console.log(multiplexedSaleInfoList, 123)
    };

    isValid = () => {
        const {multiplexedSaleInfoList} = this.state;
        let ibanValid = true;
        let sumOfPercent = 0;
        let sumOfAmount = 0;
        multiplexedSaleInfoList.forEach((info) => {
            if (!this.isCorrect(info.iban)) {
                ibanValid = false;
            }
            if (info.percent !== "") {
                sumOfPercent += parseInt(info.percent);
            }
            if (info.amount !== "") {
                sumOfAmount += parseInt(info.amount);
            }
        });
        if (ibanValid === false) {
            toast.error('شماره شبا وارد شده در قسمت تسهیم صحیح نمی باشد');
            return false;
        }
        else if (sumOfPercent === 100) {
            return true;
        }
        else if (sumOfAmount === parseInt(this.state.price)) {
            return true;
        }
        else if (sumOfPercent === 0 && sumOfAmount === 0) {
            toast.error('لطفا مبلغ یا درصد تسهیم را وارد کنید');
            return false;
        }
        else {
            toast.error('جمع مبلغ یا درصد تسهیم صحیح نمی باشد');
            return false;
        }
    };

    fillDateParameterValue = (value, name) => {
        console.log(value, name)
        this.setState({[name]: value});
    };

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    onCheckd = () => {
        const {multiplexedSaleInfoList, iban, amount, percent} = this.state;
        if (this.isCorrect(this.state.iban)) {
            multiplexedSaleInfoList.push(
                {
                    iban: iban,
                    amount: amount,
                    percent: percent,
                    id: multiplexedSaleInfoList.length,
                }
            );
            this.setState({
                multiplexedSaleInfoList,
                iban: "",
                amount: "",
                percent: "",
            });
        } else {
            toast.error('شماره شبا را درست وارد کنید');
        }
    };

    isCorrect(field) {
        return field.length === 26 && field.charAt(0) === 'I' && field.charAt(1) === 'R';
    }

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
        if (this.isValid()) {
            const data = {
                "identifier": this.state.id,
                "date": this.state.date,
                "type": {
                    code: this.state.type
                },
                "merchantInfo": {
                    "identifier": this.state.identifier
                },
                "multiplexedSaleInfos": this.state.multiplexedSaleInfoList
            };
            console.log(data)
            try {
                const result = await addSharingInfo(data);
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

    changeType = (value, name) => {
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
        const {multiplexedSaleInfoList, iban, amount, percent} = this.state;
        // const option = [
        //     {value: "", name: "انتخاب کنید"},
        //     {value: "CHARGE_ORDER_TYPE", name: "شارژ"},
        //     {value: "INTERNET_PACKAGE_ORDER_TYPE", name: "بسته اینترنت"},
        // ];
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">اضافه کردن تسهیم</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>پذیرنده :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="نام پذیرنده"
                                   value={this.state.name}
                                   name="name"
                            />
                        </div>

                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label>نوع عملیات :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   value={this.state.typeName}
                                   name="name"
                            />
                        </div>
                        {/*<div className="form-group mt-3 col-sm-6 col-md-3 float-right">*/}
                            {/*<label>نوع عملیات :</label>*/}
                            {/*<select*/}
                                {/*className="form-control text-center w-100"*/}
                                {/*onChange={(e) => this.changeType(e.target.value, "type")}*/}
                            {/*>*/}
                                {/*{option.map(*/}
                                    {/*(info) => {*/}
                                        {/*return (*/}
                                            {/*<option selected={info.value === this.state.type}*/}
                                                    {/*value={info.value}>{info.name}</option>);*/}
                                    {/*}*/}
                                {/*)}*/}
                            {/*</select>*/}
                        {/*</div>*/}
                        <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                            <label> تاریخ :</label>
                            <DatePicker
                                name="date"
                                value={this.state.date}
                                preSelected={this.state.date}
                                placeholder="تاریخ"
                                onChange={this.fillDateParameterValue}
                            />
                        </div>
                    </div>
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3 bg-color border">
                            <h4 className="py-3 col-12 ">اضافه کردن شبا :</h4>
                            {multiplexedSaleInfoList !== null && multiplexedSaleInfoList !== "" && multiplexedSaleInfoList !== undefined ?
                                multiplexedSaleInfoList.map((info) =>
                                    (
                                        <div className="col-12 border py-2 bg-light">
                                            <div className="form-group col-12 col-sm-6 col-md-4 float-right">
                                                <label>شماره شبا :</label>
                                                <input className="form-control text-center w-100"
                                                       placeholder=" (24 رقم)IR "
                                                       value={info.iban}
                                                       id={info.id}
                                                       onChange={(e) => this.updateIban(e.target.value, e.target.id)}

                                                />
                                            </div>
                                            <div className="form-group col-12 col-sm-6 col-md-2 float-right">
                                                <label> درصد :</label>
                                                <input className="form-control text-center w-100"
                                                       type={"number"}
                                                       placeholder="---"
                                                       value={info.percent}
                                                       id={info.id}
                                                       onChange={(e) => this.updateIbanPercent(e.target.value, e.target.id)}

                                                />
                                            </div>
                                            <div className="form-group col-12 col-sm-6 col-md-2 float-right">
                                                <label>مبلغ(ریال) :</label>
                                                <input className="form-control text-center w-100"
                                                       type={"number"}
                                                       placeholder="---"
                                                       value={info.amount}
                                                       id={info.id}
                                                       onChange={(e) => this.updateIbanAmount(e.target.value, e.target.id)}
                                                />
                                            </div>
                                        </div>
                                    )
                                ) : null
                            }
                            <div className="col-12 border bg-light my-4 py-2 px-2">
                                <h5 className="py-3 col-12">اضافه کردن شبا :</h5>

                                <div className="form-group col-12 col-sm-6 col-md-4 float-right">
                                    <label>شماره شبا :</label>
                                    <input className="form-control text-center w-100"
                                           placeholder=" (24 رقم)IR "
                                           value={iban}
                                           name="iban"
                                           onChange={(e) => this.addIban(e.target.value, e.target.name)}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6 col-md-2 float-right">
                                    <label> درصد :</label>
                                    <input className="form-control text-center w-100"
                                           type={"number"}
                                           placeholder="---"
                                           value={percent}
                                           name="percent"
                                           onChange={(e) => this.addIban(e.target.value, e.target.name)}
                                    />
                                </div>
                                <div className="form-group col-12 col-sm-6 col-md-2 float-right">
                                    <label>مبلغ(ریال) :</label>
                                    <input className="form-control text-center w-100"
                                           type={"number"}
                                           placeholder="---"
                                           value={amount}
                                           name="amount"
                                           onChange={(e) => this.addIban(e.target.value, e.target.name)}
                                    />
                                </div>

                                <button className="btn btn-success btn-m" data-title="اضافه کردن"
                                        onClick={this.onCheckd}>
                                    <span className="fa fa-plus" title="اضافه کردن"/>
                                </button>
                            </div>

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
