import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import {acceptProduct, cancelProduct, getIban} from "../../services/productService";
import {toast} from 'react-toastify';

class confirmProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productAttributeCategoryList: [],
            productItemImageBase64List: [],
            name: "",
            englishName: "",
            rejectionReason: "",
            code: "",
            numberOfProduct: "",
            taxation: "",
            price: "",
            description: "",
            checked: "",
            productAttributeItemList: [],
            identifier: "",
            canConfirmOrRejectProduct: "",
            ibanMerchant: "",
            amount: "",
            iban: "",
            percent: "",
            multiplexedSaleInfoList: [],
            paymentTypes: "",
            type: "",
            checkbox: []
        }
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

    handelChangeCheckBox = (id, checked) => {
        const checkbox = [];
        this.state.checkbox.forEach((merchant) => {
            if (merchant.id === parseInt(id)) {
                checkbox.push(
                    {
                        id: merchant.id,
                        checked: checked,
                        name: merchant.name
                    }
                )
            }
            else {
                checkbox.push(
                    {
                        id: merchant.id,
                        checked: merchant.checked,
                        name: merchant.name

                    }
                )
            }
        });
        this.setState({checkbox});
    };

    fillParameterValue = (value, name) => {
        if (value === "onlinePay") {
            this.setState({[name]: [{code: 'ONLINE_ORDER_PAYMENT_TYPE'}]});
        } else if (value === "hardPay") {
            this.setState({[name]: [{code: 'AT_THE_PLACE_ORDER_PAYMENT_TYPE'}]});
        } else if (value === "bothPay") {
            this.setState({[name]: [{code: 'ONLINE_ORDER_PAYMENT_TYPE'}, {code: 'AT_THE_PLACE_ORDER_PAYMENT_TYPE'}]});
        }
    };

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

    componentDidMount() {


        if (this.props.productCategoryList !== undefined) {
            const productCategoryList = this.props.productCategoryList.filter(product => product.identifier !== "");
            productCategoryList.forEach((productCategory) => {
                if (productCategory.identifier === parseInt(this.props.productCategory.identifier)) {
                    this.setState({productAttributeCategoryList: productCategory.productAttributeCategoryList});
                }
            });
        }
        this.makeCheckBox();
        this.getIbanInfo();
        this.showProductDetails();
    }

    getIbanInfo = async () => {
        const {productInfo} = this.props.location;
        if (!productInfo) return this.props.history.goBack();
        const id = {
            "identifier": productInfo.identifier
        };
        try {
            const result = await getIban(id);
            if (result.status === 200) {
                const ibanMerchant = result.data.data;
                this.setState({ibanMerchant});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    }

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

    getValue(field) {
        if (this.hasValue(field)) {
            return field;
        } else {
            return "";
        }
    }

    acceptProductInfo = async () => {
        const allowedMerchants = [];
        this.state.checkbox.forEach((merchant) => {
            if (merchant.checked === true) {
                allowedMerchants.push(merchant.id);
            }
        });
        if (this.isValid()) {

            try {
                let data = {
                    identifier: this.state.identifier,
                    allowedMerchants: allowedMerchants,
                    multiplexedSaleInfos: this.state.multiplexedSaleInfoList,
                    paymentTypes: this.state.paymentTypes,
                };
                console.log(data, 1234)
                const result = await acceptProduct(data);
                if (result.status === 200) {
                    toast.success('کالا با موفقیت تایید شد');
                    document.getElementById("loading").style.display = "none";
                    return this.props.history.goBack();
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                }
            }
        }

        document.getElementById("loading").style.display = "none";
    };

    cancelProductInfo = async () => {
        if(this.hasValue(this.state.rejectionReason)){
            try {
                let data = {
                    identifier: this.state.identifier,
                    rejectionReason: this.state.rejectionReason
                };
                const result = await cancelProduct(data);
                if (result.status === 200) {
                    toast.success('کالا با موفقیت لغو شد');
                    document.getElementById("loading").style.display = "none";
                    return this.props.history.goBack();
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('ارتباط با سرور برقرار نشد');
                }
            }
            document.getElementById("loading").style.display = "none";
        }else{
            toast.error('علت لغو کالا پر کنید');
        }

    };

    showProductDetails = () => {
        const {productInfo} = this.props.location;
        if (!productInfo) return this.props.history.goBack();
        console.log(productInfo, 1234);
        const multiplexedSaleInfoList = [];
        productInfo.multiplexedSaleInfoList.forEach((info) => {
            const data = {
                "iban": info.iban,
                "percent": info.percent,
                "amount": info.amount,
                "id": productInfo.multiplexedSaleInfoList.indexOf(info),
            };
            multiplexedSaleInfoList.push(data);
        });
        let paymentTypes = "";
        if (productInfo.paymentTypes.length === 0) {
            this.setState({type: ""});
        } else if (productInfo.paymentTypes.length === 2) {
            this.setState({type: "bothPay"});
            paymentTypes = [{code: 'ONLINE_ORDER_PAYMENT_TYPE'}, {code: 'AT_THE_PLACE_ORDER_PAYMENT_TYPE'}]

        }
        else if (productInfo.paymentTypes.length === 1) {
            if (productInfo.paymentTypes[0].code === "ONLINE_ORDER_PAYMENT_TYPE") {
                paymentTypes = [{code: 'ONLINE_ORDER_PAYMENT_TYPE'}]
                this.setState({type: "onlinePay"})
            } else {
                paymentTypes = [{code: 'AT_THE_PLACE_ORDER_PAYMENT_TYPE'}]
                this.setState({type: "hardPay"})
            }
        }
        this.setState({
            canConfirmOrRejectProduct: this.getValue(productInfo.canConfirmOrRejectProduct),
            name: this.getValue(productInfo.name),
            rejectionReason: this.getValue(productInfo.rejectionReason),
            paymentTypes: paymentTypes,
            multiplexedSaleInfoList: multiplexedSaleInfoList,
            identifier: this.getValue(productInfo.identifier),
            englishName: this.getValue(productInfo.englishName),
            code: this.getValue(productInfo.code),
            numberOfProduct: this.getValue(productInfo.numberOfProduct),
            taxation: this.getValue(productInfo.taxation),
            price: this.getValue(productInfo.price),
            description: this.getValue(productInfo.description),
            productAttributeItemList: this.getValue(productInfo.productAttributeItemList),
            productItemImageBase64List: this.getValue(productInfo.productItemImageBase64List)
        });
    };
    handelChangeInput = (value, name) => {
        this.setState({[name]: value});
    };
    makeCheckBox = () => {
        const {productInfo} = this.props.location;
        if (!productInfo) return this.props.history.push('/product-management');
        const merchants = [];
        const allowedMerchants = [];
        const allowed = this.getValue(productInfo.allowedMerchants);
        allowed.forEach((allow) => {
            let data = {
                id: allow.identifier,
                checked: true,
                name: allow.name
            };
            allowedMerchants.push(data);
        });
        const merchantArray = this.getValue(productInfo.merchants.filter(merchant => merchant.value !== ""));
        merchantArray.forEach((merchant) => {
            let data = {
                id: merchant.value,
                checked: false,
                name: merchant.title
            };
            merchants.push(data);
        });
        let s = new Set();
        const data = [...allowedMerchants, ...merchants].filter(d => {
                let avail = s.has(d.id);
                !avail && s.add(d.id);
                return !avail
            }
        );
        this.setState({
            checkbox: data
        });
    };

    render() {
        const option = [{value: "", name: "انتخاب کنید..."},
            {value: "onlinePay", name: "پرداخت انلاین"},
            {value: "hardPay", name: "پرداخت در محل"},
            {value: "bothPay", name: "انلاین و در محل"}];
        const productItem = this.state;
        const {multiplexedSaleInfoList} = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light">
                    <h4 className="py-2">تایید و لغو کالا</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.name}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="انگلیسی"
                                   value={productItem.englishName}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شناسه کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.code}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>قیمت :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.price}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>مالیات :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.taxation}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تعداد کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.numberOfProduct}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نوع پرداخت :</label>
                            <select
                                className="form-control text-center w-75"
                                onChange={(e) => this.fillParameterValue(e.target.value, "paymentTypes")}
                            >
                                {option.map(
                                    (info) => {
                                        return (
                                            <option selected={info.value === this.state.type}
                                                    value={info.value}>{info.name}</option>);
                                    }
                                )}
                            </select>
                        </div>
                        <div className="form-group col-12  float-right">
                            <label>شماره شبا پذیرنده :</label>
                            <input className=" col-3 form-control text-center w-100"
                                   placeholder="---"
                                   value={this.state.ibanMerchant}
                            />
                        </div>
                        <div className="form-group col-12 float-right">
                            <label>توضیحات :</label>
                            <textarea className="form-control text-center w-50 "
                                      value={productItem.description}
                            />
                        </div>

                        {this.state.productItemImageBase64List.length !== 0 ?
                            <div className="col-12 justify-content-center align-items-center text-center">
                                <div
                                    className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                                    <div className="form-group col-12 ">
                                        <h4 className="py-3 col-12 ">عکس کالا :</h4>
                                        {this.state.productItemImageBase64List.map((productItemImage) =>
                                            (
                                                <img
                                                    className="p-2 rounded float-right" alt="Cinque Terre" width="180"
                                                    height="180"
                                                    src={"data:image/png;base64," + productItemImage}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    </div>

                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 ">
                            <h4 className="py-3">تعریف ویژگی کالا :</h4>
                            {this.state.productAttributeItemList.map((productAttribute) =>
                                (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                        <label>{productAttribute.productAttributeCategory.categoryName}:</label>
                                        <select className="form-control text-center w-75">
                                            <option>{productAttribute.productAttribute.attributeValue}</option>
                                        </select>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <h4 className="py-3 col-12">علت لغو کالا :</h4>
                        <div className="form-group col-6 float-right">
                            <textarea className="form-control text-center textarea-style"
                                      value={this.state.rejectionReason}
                                      name={"rejectionReason"}
                                      onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3 bg-color border">
                        <h4 className="py-3 col-12 ">تسهیم کالا :</h4>
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
                                       value={this.state.iban}
                                       name="iban"
                                       onChange={(e) => this.addIban(e.target.value, e.target.name)}
                                />
                            </div>
                            <div className="form-group col-12 col-sm-6 col-md-2 float-right">
                                <label> درصد :</label>
                                <input className="form-control text-center w-100"
                                       type={"number"}
                                       placeholder="---"
                                       value={this.state.percent}
                                       name="percent"
                                       onChange={(e) => this.addIban(e.target.value, e.target.name)}
                                />
                            </div>
                            <div className="form-group col-12 col-sm-6 col-md-2 float-right">
                                <label>مبلغ(ریال) :</label>
                                <input className="form-control text-center w-100"
                                       type={"number"}
                                       placeholder="---"
                                       value={this.state.amount}
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
                {this.state.checkbox.length !== 0 ? (
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <div
                            className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                            <div className="form-group col-12 ">
                                <h4 className="py-3"> پذیرنده ها:</h4>
                            </div>
                            {this.state.checkbox.map((merchant) =>
                                (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                        <div className="input-group">
                                            <div className="input-group addon">
                                                <div className="py-2 custom-control custom-checkbox">
                                                    <input type="checkbox" className=" custom-control-input"
                                                           checked={merchant.checked}
                                                           id={merchant.id}
                                                           onChange={(e) => this.handelChangeCheckBox(e.target.id, e.target.checked)}
                                                    />
                                                    <label className="px-4 custom-control-label"
                                                           htmlFor={merchant.id}>{merchant.name}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                ) : null}
                {this.state.canConfirmOrRejectProduct ?
                    <div className="col-12 p-3 text-center">
                        <input type="button" className="btn btn-success mr-3" value="تایید "
                               onClick={() => {
                                   this.acceptProductInfo()
                               }}/>
                        <input type="button" className="btn btn-danger mr-3" value="لغو"
                               onClick={() => {
                                   this.cancelProductInfo()
                               }}/>
                    </div> :
                    <div className="col-12 p-3 text-center justify-content-center">


                        <button className="btn btn-danger btn-sm">
                            <span className="fa fa-warning"/>
                        </button>
                        <h6 className="p-2 font-weight-bold">(قادر به تایید یا لغو نمی باشید)</h6>
                    </div>
                }

            </div>
        );
    };
}

export default withRouter(confirmProduct);


