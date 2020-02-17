import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {persistMerchant, fetchAllAuthorities, fetchAllMerchants} from "../../services/userService"
import Pagination from "../search/pagination";
import {paginate} from "../../utils/paginate";


class RegisterMerchant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorities: [],
            merchants: [],
            name: '',
            username: '',
            realPassword: '',
            clientId: '',
            clientSecret: '',
            appName: '',
            iban: '',
            email: '',
            nationalCode: '',
            accessTokenValidity: 900,
            refreshTokenValidity: 2592000,
            parent: '',
            currentPage: 1,
            pageSize: 5
        };
        this.getValue = this.getValue.bind(this);
        this.registerMerchant = this.registerMerchant.bind(this);
    }


    async componentDidMount() {
        await this.fillAuthorities();
        await this.fillMerchants();
    }

    async fillMerchants() {
        const resultForFetchMerchants = await fetchAllMerchants();
        if (resultForFetchMerchants.status === 200) {
            this.setState({
                merchants: resultForFetchMerchants.data.data
            });
            document.getElementById("loading").style.display = "none";
        }
    }

    async fillAuthorities() {
        const result = await fetchAllAuthorities();
        if (result.status === 200) {
            let allAuthorities = result.data.data;
            allAuthorities = this.addCheckedProperty(allAuthorities);
            this.setState({
                authorities: allAuthorities
            });
            document.getElementById("loading").style.display = "none";
        }
    }

    addCheckedProperty(authorities) {
        let allAuthorities = [];
        authorities.forEach((authority) => {
            const newAuthority = Object.assign({}, {checked: false}, authority);
            allAuthorities.push(newAuthority);
        });
        return allAuthorities;
    }

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    async registerMerchant() {
        const canRegister = this.canRegisterMerchant();
        if (canRegister) {
            try {
                const parameters = this.prepareRegisterMerchantParameter();
                console.log(parameters,1234)
                const result = await persistMerchant(parameters);
                if (result.status === 200) {
                    toast.success('ایجاد پذیرنده با موفقیت انجام شد.');
                    this.props.history.goBack();
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('لطفا کلیه موارد را پر کنید');
                }
            }
            document.getElementById("loading").style.display = "none";
        }
    };

    handlePageChange = page => {
        this.setState({currentPage: page});
    };


    getPageData = () => {
        const {authorities, pageSize, currentPage} = this.state;
        const authoritiesForThisPage = paginate(authorities, currentPage, pageSize);
        return authoritiesForThisPage;
    };

    prepareRegisterMerchantParameter() {
        const info = this.state;
        let merchantInfo = {};
        let authorities = this.prepareSelectedAuthorities();
        let merchantOAuthDetails = {};

        merchantInfo.name = info.name;
        merchantInfo.username = info.username;
        merchantInfo.realPassword = info.realPassword;
        merchantInfo.email = info.email;
        merchantInfo.nationalCode = info.nationalCode;
        merchantInfo.authorities = authorities;
        merchantInfo.appName = info.appName;
        merchantInfo.iban = info.iban;
        merchantOAuthDetails.clientId = info.clientId;
        merchantOAuthDetails.clientSecret = info.clientSecret;
        merchantOAuthDetails.accessTokenValidity = info.accessTokenValidity;
        merchantOAuthDetails.refreshTokenValidity = info.refreshTokenValidity;

        if (this.hasValue(info.parent)) {
            let parent = {};
            parent.identifier = info.parent;
            merchantInfo.parent = parent;
        }

        merchantInfo.merchantOAuthDetails = merchantOAuthDetails;

        return merchantInfo;
    }

    prepareSelectedAuthorities() {
        const authorities = this.state.authorities.filter(authority => authority.checked);
        let selectedAuthorities = [];
        authorities.forEach((selectedAuthority) => {
            let authority = {role: selectedAuthority};
            selectedAuthorities.push(authority);
        });
        return selectedAuthorities;
    }

    canRegisterMerchant() {
        let selectedAuthorities = this.prepareSelectedAuthorities();
        const {name, username, realPassword, clientId, clientSecret, appName, iban} = this.state;

        if (!this.hasValue(name)) {
            toast.error('نام پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(username)) {
            toast.error('نام کاربری پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(realPassword)) {
            toast.error('کلمه عبور پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(clientId)) {
            toast.error('شناسه کاربری پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(clientSecret)) {
            toast.error('کلمه عبور شناسه کاربری پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(selectedAuthorities) || selectedAuthorities.length === 0) {
            toast.error('حداقل یک دسترسی به پذیرنده تخصیص دهید');
            return false;
        }

        if (!this.hasValue(appName)) {
            toast.error('نام نرم افزار را وارد کنید');
            return false;
        }
        if (!this.hasValue(iban)) {
            toast.error('شماره شبا را وارد کنید');
            return false;
        }
        if (!this.isCorrect(iban)) {
            toast.error('شماره شبا را درست وارد کنید');
            return false;
        }

        return true;
    }

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    }

    isCorrect(field) {
        return field.length === 26 && field.charAt(0)==='I'&& field.charAt(1)==='R';
    }

    getValue(field) {
        if (this.hasValue(field)) {
            return field;
        } else {
            return "";
        }
    }

    handleAllAuthoritiesChange(checked) {
        const {authorities} = this.state;
        authorities.forEach((authority) => {
            authority.checked = checked;
        });
        this.setState(authorities);
    }

    changeAuthorityCheckedValue(changedAuthority, checked) {
        const {authorities} = this.state;
        authorities.forEach((authority) => {
            if (changedAuthority.code === authority.code) {
                authority.checked = checked;
            }
        });
        this.setState(authorities);
    }

    render() {

        const {merchants, authorities, pageSize, currentPage} = this.state;
        let index = 1;
        const authoritiesForThisPage = this.getPageData();
        let authorityCounter = (currentPage - 1) * pageSize;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">افزودن پذیرنده</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div className="rtl border m-0 bg-light shadow float-right w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="نام"
                                   value={this.state.name}
                                   name="name"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "name")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام کاربری :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="نام"
                                   value={this.state.username}
                                   name="username"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "username")}
                            />
                        </div>


                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>کلمه عبور:</label>
                            <input className="form-control text-center"
                                   type="password"
                                   autoComplete="off"
                                   placeholder="***"
                                   value={this.state.realPassword}
                                   name="realPassword"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "realPassword")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>پذیرنده پدر :</label>
                            <select
                                className="form-control text-center"
                                onChange={(e) => this.fillParameterValue(e.target.value, "parent")}
                            >
                                <option value="" key={index++}>---</option>
                                {merchants.map(
                                    (merchant) => {
                                        return (
                                            <option value={merchant.identifier} key={index++}>{merchant.name}</option>);
                                    }
                                )}
                            </select>
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>ایمیل :</label>
                            <input className="form-control text-center"
                                   type="email"
                                   autoComplete="off"
                                   placeholder="ایمیل"
                                   value={this.state.email}
                                   name="email"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "email")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شناسه ملی :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="شناسه ملی"
                                   value={this.state.nationalCode}
                                   name="nationalCode"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "nationalCode")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>Client Identifier :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="client Identifier"
                                   value={this.state.clientId}
                                   name="clientId"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "clientId")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>Client Secret :</label>
                            <input className="form-control text-center"
                                   type="password"
                                   autoComplete="off"
                                   placeholder="***"
                                   value={this.state.clientSecret}
                                   name="clientSecret"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "clientSecret")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام نرم افزار:</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder="نام نرم افزار"
                                   value={this.state.appName}
                                   name="name"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "appName")}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شماره شبا :</label>
                            <input className="form-control text-center"
                                   type="text"
                                   placeholder=" (24 رقم)IR "
                                   value={this.state.iban}
                                   name="name"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "iban")}
                            />
                        </div>
                    </div>
                    <div className="rtl border m-0 bg-light shadow float-right w-100 justify-content-start my-3 pb-3">
                        <div
                            className="col-12 justify-content-center align-items-center text-center table-responsive my-3 ">
                            <table className="table table-bordered table-striped ">
                                <thead>
                                <tr>
                                    <th className="table-checkbox">
                                        <input type="checkbox" id="checkAll"
                                               onChange={(e) => this.handleAllAuthoritiesChange(e.target.checked)}/>
                                    </th>
                                    <th className="hidden-xs table-counter"></th>
                                    <th className="text-center">دسترسی</th>
                                </tr>
                                </thead>
                                <tbody>
                                {authorities.length === 0 ?
                                    (
                                        <tr key={index++}>
                                            <td colSpan="3">
                                                موردی یافت نشد.
                                            </td>
                                        </tr>
                                    )
                                    : authoritiesForThisPage.map((authority) =>
                                        (
                                            <tr key={index++}>
                                                <td className="table-checkbox">
                                                    <input type="checkbox" className="check" checked={authority.checked}
                                                           onChange={(e) => this.changeAuthorityCheckedValue(authority, e.target.checked)}/>
                                                </td>
                                                <td className="hidden-xs table-counter">
                                                    {++authorityCounter}
                                                </td>
                                                <td key={index++}>{authority.name}</td>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </table>
                            {authorities.length !== 0 ? (
                                <Pagination
                                    itemCount={authorities.length}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={this.handlePageChange}
                                />
                            ) : null}
                        </div>
                        <hr/>
                        <div className="col-12 justify-content-center align-items-center text-center my-3 ">
                            <input type="button" className="btn btn-primary" value="ثبت پذیرنده"
                                   onClick={this.registerMerchant}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(RegisterMerchant);
