import React, {Component} from 'react';
import SearchResult from '../search/search-result';
import {toast} from 'react-toastify';
import {
    loadAllSaleLimitation,
    sendlimitation,
    loadOperatorLimitation,
    sendOperatorslimitation,
    removeOperatorslimitation
} from "../../services/saleLimitation";
import {withRouter} from "react-router-dom";

class manageConstraints extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            data: [],
            mobileNumber: "",
            chargeIranCellLimitation: "",
            chargeMCILimitation: "",
            chargeRightelLimitation: "",
            chargeSamantelLimitation: "",
            internetIranCellLimitation: "",
            internetMCILimitation: "",
            internetRightelLimitation: "",
            internetSamantelLimitation: "",
            isActiveIranCell: "",
            isActiveMCI: "",
            isActiveRightel: "",
            isActiveSamantel: ""
        };
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);

    };

    async componentDidMount() {
        try {
            const result = await loadOperatorLimitation();
            if (result.status === 200) {
                const data = result.data.data;
                this.setState({
                    isActiveIranCell: data.isActiveIranCell,
                    isActiveMCI: data.isActiveMCI,
                    isActiveRightel: data.isActiveRightel,
                    isActiveSamantel: data.isActiveSamantel
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        try {
            const result = await loadAllSaleLimitation();
            if (result.status === 200) {
                const data = [];
                result.data.data.forEach((dataInfo) => {
                    if (dataInfo.mobileNumber === "" || dataInfo.mobileNumber === undefined || dataInfo.mobileNumber === null) {
                        this.setState({
                            chargeIranCellLimitation: dataInfo.chargeIranCellLimitation,
                            chargeMCILimitation: dataInfo.chargeMCILimitation,
                            chargeRightelLimitation: dataInfo.chargeRightelLimitation,
                            chargeSamantelLimitation: dataInfo.chargeSamantelLimitation,
                            internetIranCellLimitation: dataInfo.internetIranCellLimitation,
                            internetMCILimitation: dataInfo.internetMCILimitation,
                            internetRightelLimitation: dataInfo.internetRightelLimitation,
                            internetSamantelLimitation: dataInfo.internetSamantelLimitation
                        });
                    } else {
                        data.push(dataInfo)
                    }
                });
                this.setState({data});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    }

    removeLimition = async () => {
        const result = await removeOperatorslimitation({});
        try {
            if (result.status === 200) {
                this.setState({
                    chargeIranCellLimitation: "",
                    chargeMCILimitation: "",
                    chargeRightelLimitation: "",
                    chargeSamantelLimitation: "",
                    internetIranCellLimitation: "",
                    internetMCILimitation: "",
                    internetRightelLimitation: "",
                    internetSamantelLimitation: "",
                });
                toast.success('عملیات با موفقیت انجام شد.');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    sendAllLimitedData = async () => {
        const data = [{
            chargeIranCellLimitation: this.state.chargeIranCellLimitation,
            chargeMCILimitation: this.state.chargeMCILimitation,
            chargeRightelLimitation: this.state.chargeRightelLimitation,
            chargeSamantelLimitation: this.state.chargeSamantelLimitation,
            internetIranCellLimitation: this.state.internetIranCellLimitation,
            internetMCILimitation: this.state.internetMCILimitation,
            internetRightelLimitation: this.state.internetRightelLimitation,
            internetSamantelLimitation: this.state.internetSamantelLimitation
        }];
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
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    sendOperatorsLimitation = async () => {
        const data = {
            isActiveIranCell: this.state.isActiveIranCell,
            isActiveMCI: this.state.isActiveMCI,
            isActiveRightel: this.state.isActiveRightel,
            isActiveSamantel: this.state.isActiveSamantel
        };
        console.log(data)
        const result = await sendOperatorslimitation(data);
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
            }
        }
        document.getElementById("loading").style.display = "none";
    };


    async onDelete(data) {
        const dataInfo = this.state.data.filter(dataInfos => dataInfos.mobileNumber !== data.mobileNumber);
        this.setState({data: dataInfo});
        const dataId = {
            mobileNumber: data.mobileNumber
        };
        const result = await removeOperatorslimitation(dataId);
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

    }

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };


    onEdit(data) {
        this.props.history.push({
            pathname: '/edit-limitation',
            limitation: data
        });
    }

    onAdd() {
        this.props.history.push({
            pathname: '/add-limitation',
        });
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'update',
                    title: 'ویرایش',
                    icon: 'fa fa-th-list',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onEdit
                }, {
                    name: 'delete',
                    title: 'حذف',
                    icon: 'fa fa-remove',
                    style: 'btn btn-danger btn-sm',
                    onclick: this.onDelete
                }
            ],
            headerTitleInfos: [
                {name: "mobileNumber", title: "شماره تلفن همراه"},
                {name: "chargeIranCellLimitation", title: "شارژ ایرانسل"},
                {name: "chargeMCILimitation", title: "شارژ همراه اول"},
                {name: "chargeRightelLimitation", title: "شارژ رایتل"},
                {name: "chargeSamantelLimitation", title: "شارژ سامانتل"},
                {name: "internetIranCellLimitation", title: "اینترنت ایرانسل"},
                {name: "internetMCILimitation", title: "اینترنت همراه اول"},
                {name: "internetRightelLimitation", title: "اینترنت رایتل"},
                {name: "internetSamantelLimitation", title: "اینترنت سامانتل"},
            ]
        };
        return headerInfo;
    }

    render() {
        const {data, pageSize} = this.state;
        const headerInfo = this.getResultTableHeader();
        const option = [{value: "true", title: "فعال", selected: true},
            {value: "false", title: "غیر فعال", selected: false}];
        return (
            <div
                className="rtl border bg-light shadow row  m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">مدیریت محدودیت ها</h4>
                </div>
                <div className="mt-3 col-11">
                    <div
                        className=" border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light">
                            <h6 className="col-12 py-2 font-weight-bold">خدمات اپراتور ها</h6>
                        </div>
                    </div>
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <div className="rtl border m-0 bg-light shadow row w-100 justify-content-center my-3 pb-3">


                            <div className=" pt-1 mt-2 form-group col-3 float-right">
                                <label>ایرانسل :</label>
                                <select className="form-control"
                                        onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                        value={this.state.isActiveIranCell}
                                        name={"isActiveIranCell"}
                                >
                                    {option.map(
                                        (option) => {
                                            return (<option value={option.value}
                                                            selected={option.value === this.state.time}>{option.title}</option>)
                                        }
                                    )
                                    }
                                </select>
                            </div>
                            <div className="pt-1 mt-2 form-group col-3 float-right">
                                <label>همراه اول :</label>
                                <select className="form-control"
                                        onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                        value={this.state.isActiveMCI}
                                        name={"isActiveMCI"}
                                >
                                    {option.map(
                                        (option) => {
                                            return (<option value={option.value}
                                                            selected={option.value === this.state.time}>{option.title}</option>)
                                        }
                                    )
                                    }
                                </select>
                            </div>
                            <div className="pt-1 mt-2 form-group col-3 float-right">
                                <label>رایتل :</label>
                                <select className="form-control"
                                        onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                        value={this.state.isActiveRightel}
                                        name={"isActiveRightel"}
                                >
                                    {option.map(
                                        (option) => {
                                            return (<option value={option.value}
                                                            selected={option.value === this.state.time}>{option.title}</option>)
                                        }
                                    )
                                    }
                                </select>
                            </div>
                            <div className="pt-1 mt-2 form-group col-3 float-right">
                                <label>سامانتل :</label>
                                <select className="form-control"
                                        onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                        value={this.state.isActiveSamantel}
                                        name={"isActiveSamantel"}
                                >
                                    {option.map(
                                        (option) => {
                                            return (<option value={option.value}
                                                            selected={option.value === this.state.time}>{option.title}</option>)
                                        }
                                    )
                                    }
                                </select>
                            </div>
                            <div className="form-group float-right pt-3 ">
                                <input type="button" className="btn btn-success" value="اعمال تغییرات"
                                       onClick={this.sendOperatorsLimitation}
                                />
                            </div>
                        </div>

                    </div>

                </div>
                <div className="mt-3 col-11">
                    <div
                        className=" border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light">
                            <h6 className="col-12 py-2 font-weight-bold">محدودیت کلی مشتریان</h6>
                        </div>
                    </div>
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <div className="rtl border m-0 bg-light shadow row w-100 justify-content-center my-3 pb-3">

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>شارژ ایرانسل :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any"
                                       placeholder=""
                                       value={this.state.chargeIranCellLimitation}
                                       name="chargeIranCellLimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>شارژ همراه اول :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any"
                                       value={this.state.chargeMCILimitation}
                                       name="chargeMCILimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>شارژ رایتل :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any" value={this.state.chargeRightelLimitation}
                                       name="chargeRightelLimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>شارژ سامانتل :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any"
                                       value={this.state.chargeSamantelLimitation}
                                       name="chargeSamantelLimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>اینترنت ایرانسل :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any"
                                       placeholder=""
                                       value={this.state.internetIranCellLimitation}
                                       name="internetIranCellLimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>اینرنت همراه اول :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any"
                                       value={this.state.internetMCILimitation}
                                       name="internetMCILimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>اینترنت رایتل :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any" value={this.state.internetRightelLimitation}
                                       name="internetRightelLimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>

                            <div className="form-group mt-3 col-sm-6 col-md-3 float-right">
                                <label>اینترنت سامانتل :</label>
                                <input className="form-control text-center"
                                       type="number"
                                       step="any"
                                       value={this.state.internetSamantelLimitation}
                                       name="internetSamantelLimitation"
                                       onChange={(e) => this.fillParameterValue(e.target.value, e.target.name)}
                                />
                            </div>


                            <div className="form-group float-right pt-3 ">
                                <input type="button" className="btn btn-success" value="اعمال تغییرات"
                                       onClick={this.sendAllLimitedData}
                                />
                            </div>
                            <div className="form-group float-right pt-3 px-4 ">
                                <input type="button" className="btn btn-danger" value="حذف محدودیت ها"
                                       onClick={this.removeLimition}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="mt-3 col-11">
                    <div
                        className=" border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center header-box text-light">
                            <h6 className="col-12 py-2 font-weight-bold">محدود کردن مشتری</h6>
                        </div>
                    </div>
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <div className="rtl border m-0 bg-light shadow row w-100 justify-content-center my-3 pb-3">

                            <SearchResult headerInfo={headerInfo} searchResultList={data} pageSize={pageSize}/>

                            <div className="form-group float-right pt-3 px-4 ">
                                <input type="button" className="btn btn-warning" value="اضافه کردن"
                                       onClick={this.onAdd}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
            ;
    };
}

export default withRouter(manageConstraints);


