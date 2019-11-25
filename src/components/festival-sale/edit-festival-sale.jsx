import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import DatePicker from "../SimpleDatePicker";
import Upload from "../choose-file"
import {sendFestival} from "../../services/festivalService";


class editFestivalSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: 1,
            managingDirectorInfo: {
                identifier: "",
                fullName: ""
            },
            officialADNewspaper: {
                identifier: "",
            },
            foundedAD: {
                identifier: "",
            },
            statute: {
                identifier: "",
            },
            imageItem: [],
            identifier: "",
            id: "",
            name: "",
            percentForShop: "",
            percentForInternetPackage: "",
            percentForCharge: "",
            amountForCharge: "",
            amountForShop: "",
            amountForInternetPackage: "",
            fromDate: "",
            toDate: "",
            isForCharge: "",
            isForInternetPackage: "",
            isForShop: "",
            fileInfoList: "",

        };
        this.onBack = this.onBack.bind(this);
        this.fillDateParameterValue = this.fillDateParameterValue.bind(this);
    }


    componentDidMount() {
        let {dataInfo} = this.props.location;

        if (!dataInfo || dataInfo === undefined) return this.props.history.push('/festival-sale');
        this.setState({
            identifier: dataInfo.identifier,
            id: dataInfo.id,
            name: dataInfo.name,
            percentForShop: dataInfo.percentForShop,
            percentForInternetPackage: dataInfo.percentForInternetPackage,
            percentForCharge: dataInfo.percentForCharge,
            amountForCharge: dataInfo.amountForCharge,
            amountForInternetPackage: dataInfo.amountForInternetPackage,
            amountForShop: dataInfo.amountForShop,
            fromDate: dataInfo.fromDate,
            toDate: dataInfo.toDate,
            isForCharge: dataInfo.isForCharge,
            isForInternetPackage: dataInfo.isForInternetPackage,
            isForShop: dataInfo.isForShop,
            fileInfoList: dataInfo.fileInfoList
        });
        const imageItem = [];
        if (dataInfo.fileInfoList !== null && dataInfo.fileInfoList !== "" && dataInfo.fileInfoList !== undefined) {
            dataInfo.fileInfoList.forEach((img) => {
                imageItem.push(
                    {
                        number: imageItem.length + 1,
                        identifier: img,
                    }
                );
                this.setState({imageItem});
            });

        }
    }

    onBack() {
        this.props.history.push({
            pathname: '/festival-sale',
        });
    }

    validate(id) {
        if (id !== "" && id !== null && id !== undefined) {
            return true;
        } else {
            return false;
        }
    }

    fillDateParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    fillParameterValue = (e) => {
        if (e.target.name === "amountForShop") {
            this.setState({percentForShop: 0});
        }
        if (e.target.name === "percentForShop") {
            this.setState({amountForShop: 0});
        }if (e.target.name === "amountForInternetPackage") {
            this.setState({percentForInternetPackage: 0});
        }
        if (e.target.name === "percentForInternetPackage") {
            this.setState({amountForInternetPackage: 0});
        }if (e.target.name === "amountForCharge") {
            this.setState({percentForCharge: 0});
        }
        if (e.target.name === "percentForCharge") {
            this.setState({amountForCharge: 0});
        }
        this.setState({[e.target.name]: e.target.value});
    };
    fillParameterItem = (value, name) => {
        this.setState({[name]: value});
    };

    deleteBoardOfDirectors = (number) => {
        this.setState({imageItem: this.state.imageItem.filter(dataInfo => dataInfo.number !== number)});
        // const list=[];
        // this.state.imageItem.forEach((item) => {
        //     if(item.number!==number){
        //         list.push(
        //             {
        //                 number:list.length+1,
        //                 identifier:item.identifier
        //             }
        //         )
        //         console.log(list,123)
        //         this.setState({imageItem: list});
        //
        //     }else{
        //         console.log(item,"pouya")
        //     }
        // });
    };

    addBoardOfDirectors = () => {
        const {imageItem} = this.state;
        imageItem.push({
            number: imageItem.length + 1,
            identifier: "",
            fullName: ""
        });
        this.setState({imageItem: imageItem});
    };

    registerFestival = async () => {
        let fileInfoList = [];
        this.state.imageItem.forEach((item) => {
            fileInfoList.push(item.identifier);
        });
        const data = {
            "identifier": this.state.id,
            "title": "تخقیفات",
            "fromDate": this.state.fromDate,
            "toDate": this.state.toDate,
            "amountForCharge": this.state.amountForCharge,
            "percentForCharge": this.state.percentForCharge,
            "amountForInternetPackage": this.state.amountForInternetPackage,
            "percentForInternetPackage": this.state.percentForInternetPackage,
            "amountForShop": this.state.amountForShop,
            "percentForShop": this.state.percentForShop,
            "status": {
                "code": "ACTIVE_FESTIVAL_SALE_STATUS"
            },
            "isForCharge": this.state.isForCharge,
            "isForInternetPackage": this.state.isForInternetPackage,
            "isForShop": this.state.isForShop,
            "fileInfoList": fileInfoList,
            "merchantInfo": {
                "identifier": this.state.identifier
            }
        };
        try {
            const result = await sendFestival(data);
            if (result.status === 200) {
                toast.success(' با موفقیت انجام شد');
                this.props.history.goBack();
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    render() {
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light panel-header">
                            <h4 className="py-2">وضعیت تخفیف</h4>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4 ">
                            <label>نام پذیرنده :</label>
                            <input className="form-control text-center"
                                   type="input"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.name}
                                   name="name"
                                   onChange={(e) => this.fillParameterValue(e)}
                            />
                        </div>


                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                            <label>درصد تخفیف شارژ:</label>
                            <input className="form-control text-center "
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.percentForCharge}
                                   name="percentForCharge"
                                   onChange={(e) => this.fillParameterValue(e)}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                            <label>مقدار تخفیف شارژ:</label>
                            <input className="form-control text-center "
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.amountForCharge}
                                   name="amountForCharge"
                                   onChange={(e) => this.fillParameterValue(e)}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                            <label>درصد تخفیف اینترنت :</label>
                            <input className="form-control text-center "
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.percentForInternetPackage}
                                   name="percentForInternetPackage"
                                   onChange={(e) => this.fillParameterValue(e)}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                            <label>مقدار تخفیف اینترنت:</label>
                            <input className="form-control text-center "
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.amountForInternetPackage}
                                   name="amountForInternetPackage"
                                   onChange={(e) => this.fillParameterValue(e)}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                            <label>درصد تخفیف فروشگاه:</label>
                            <input className="form-control text-center "
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.percentForShop}
                                   name="percentForShop"
                                   onChange={(e) => this.fillParameterValue(e)}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                            <label>مقدار تخفیف فروشگاه:</label>
                            <input className="form-control text-center "
                                   type="number"
                                   step="any"
                                   placeholder="---"
                                   value={this.state.amountForShop}
                                   name="amountForShop"
                                   onChange={(e) => this.fillParameterValue(e)}
                            />
                        </div>
                        {this.state.fromDate !== "" && this.state.fromDate !== null ?
                            <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                                <label>از تاریخ :</label>
                                <DatePicker
                                    name="fromDate"
                                    value={this.state.fromDate}
                                    preSelected={this.state.fromDate}
                                    placeholder="---"
                                    onChange={this.fillDateParameterValue}
                                />
                            </div>
                            :
                            <div className="form-group col-12 col-sm-6 col-md-3 float-right pt-4">
                                <label>از تاریخ :</label>
                                <DatePicker
                                    name="fromDate"
                                    value={this.state.fromDate}
                                    placeholder="---"
                                    onChange={this.fillDateParameterValue}
                                />
                            </div>
                        }{this.state.toDate !== "" && this.state.toDate !== null ?
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right py-2">
                            <label>تا تاریخ :</label>
                            <DatePicker
                                name="toDate"
                                preSelected={this.state.toDate}
                                placeholder="---"
                                onChange={this.fillDateParameterValue}
                            />
                        </div>
                        :
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right py-2">
                            <label>تا تاریخ :</label>
                            <DatePicker
                                name="toDate"
                                value={this.state.toDate}
                                placeholder="---"
                                onChange={this.fillDateParameterValue}
                            />
                        </div>
                    }


                        <div className="form-group col-12 col-sm-6 col-md-3 float-right py-2">
                            <label>تخفیف شارژ :</label>
                            <select
                                className="form-control  text-center"
                                style={{"text-align-last": "center", "padding-right": "29px"}}
                                onChange={(e) => this.fillParameterItem(e.target.value, "isForCharge")}
                            >
                                {[{value: true, title: "فعال", selected: true}, {
                                    value: false,
                                    title: "غیر فعال",
                                    selected: false
                                }].map(
                                    (option) => {
                                        return (<option value={option.value}
                                                        selected={option.value === this.state.isForCharge}>{option.title}</option>);
                                    }
                                )}
                            </select>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right py-2">
                            <label>تخفیف اینترنت :</label>
                            <select
                                className="form-control  text-center"
                                style={{"text-align-last": "center", "padding-right": "29px"}}
                                onChange={(e) => this.fillParameterItem(e.target.value, "isForInternetPackage")}
                            >
                                {[{value: true, title: "فعال", selected: true}, {
                                    value: false,
                                    title: " غیر فعال",
                                    selected: false
                                }].map(
                                    (option) => {

                                        return (<option value={option.value}
                                                        selected={option.value === this.state.isForInternetPackage}>{option.title}</option>);
                                    }
                                )}
                            </select>
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right py-2">
                            <label>تخفیف فروشگاه :</label>
                            <select
                                className="form-control  text-center"
                                style={{"text-align-last": "center", "padding-right": "29px"}}
                                onChange={(e) => this.fillParameterItem(e.target.value, "isForShop")}
                            >
                                {[{value: true, title: "فعال ", selected: true}, {
                                    value: false,
                                    title: " غیر فعال ",
                                    selected: false
                                }].map(
                                    (option) => {
                                        return (<option value={option.value}
                                                        selected={option.value === this.state.isForShop}>{option.title}</option>);
                                    }
                                )}
                            </select>
                        </div>

                    </div>
                    <div
                        className="rtl  border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light panel-header">
                            <h4 className="py-2"> تصاویر</h4>
                        </div>
                        {this.state.imageItem.map((dataInfo) =>
                            (
                                <div className="form-group col-12 col-sm-6 col-md-3 float-right ">
                                    <div
                                        className="border bg-light shadow row justify-content-center px-5  mx-2 mt-4 radius">
                                        <div className="col-12 text-light text-left card-wrap ">
                                            <i className="mt-4 fa fa-trash text-left close" aria-hidden="true"
                                               onClick={() => this.deleteBoardOfDirectors(dataInfo.number)}/>
                                        </div>

                                        <div className="pr-5 justify-content-center ">
                                            <Upload
                                                label=""
                                                ref="child"
                                                upOrDl={this.validate(dataInfo.identifier)}
                                                isImage={true}
                                                dataInfo={dataInfo}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                    <div>
                        <div className=" row w-100 m-0 text-center justify-content-center align-items-center my-3">
                            <div className="p-2">
                                <input type="button" className="btn btn-success" value="ثبت"
                                       onClick={() => {
                                           this.registerFestival();
                                       }}/>
                            </div>
                            <div className="p-2">
                                <input type="button" className="btn btn-warning" value="افزودن تصویر"
                                       onClick={this.addBoardOfDirectors}/>
                            </div>
                            <div className="p-2">
                                <input type="button" className="btn btn-danger" value="لغو"
                                       onClick={this.onBack}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(editFestivalSale);
