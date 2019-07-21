import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {toast} from 'react-toastify';
import {updateMerchant, fetchAllAuthorities} from "../../services/userService"
import Pagination from "../search/pagination";
import {paginate} from "../../utils/paginate";


class EditMerchant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            authorities: [],
            name: '',
            username: '',
            password: '',
            clientId: '',
            clientSecret: '',
            nationalCode: '',
            accessTokenValidity: 900,
            refreshTokenValidity: 2592000,
            parent: null,
            currentPage: 1,
            pageSize: 5
        };
        this.getValue = this.getValue.bind(this);
        this.updateMerchant = this.updateMerchant.bind(this);
    }


    async componentDidMount() {
        const {merchantInfo} = this.props.location;
        if (!merchantInfo) return this.props.history.push('/merchant-management');

        this.setState({
            identifier: merchantInfo.identifier,
            name: this.getValue(merchantInfo.name),
            username: this.getValue(merchantInfo.username),
            clientId: this.getValue(merchantInfo.merchantOAuthDetails.clientId),
            parent: this.getValue(merchantInfo.parent),
            nationalCode: this.getValue(merchantInfo.nationalCode)
        });

        await this.fillAuthorities(merchantInfo);
    }

    async fillAuthorities(merchantInfo) {
        const result = await fetchAllAuthorities();
        if (result.status === 200) {
            let allAuthorities = result.data.data;
            allAuthorities = this.addCheckedProperty(allAuthorities, merchantInfo);
            this.setState({
                authorities: allAuthorities
            });
        }
        document.getElementById("loading").style.display = "none";
    }

    addCheckedProperty(authorities, merchantInfo) {
        const selectedAuthorities = merchantInfo.authorities;
        let allAuthorities = [];
        authorities.forEach((authority) => {
            let checked = false;
            selectedAuthorities.forEach((selectedAuthority) => {
                if (selectedAuthority.role.code === authority.code) {
                    checked = true;
                }
            });
            const newAuthority = Object.assign({}, {checked: checked}, authority);
            allAuthorities.push(newAuthority);
        });
        return allAuthorities;
    }

    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    async updateMerchant() {
        const canUpdate = this.canUpdateMerchant();
        if (canUpdate) {
            try {
                const parameters = this.prepareUpdateMerchantParameter();
                const result = await updateMerchant(parameters);
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

    prepareUpdateMerchantParameter() {
        const info = this.state;
        let merchantInfo = {};
        let authorities = this.prepareSelectedAuthorities();
        let merchantOAuthDetails = {};

        merchantInfo.identifier = info.identifier;
        merchantInfo.name = info.name;
        merchantInfo.username = info.username;
        merchantInfo.password = info.password;
        merchantInfo.email = info.email;
        merchantInfo.nationalCode = info.nationalCode;
        merchantInfo.authorities = authorities;
        merchantOAuthDetails.clientId = info.clientId;
        merchantOAuthDetails.clientSecret = info.clientSecret;
        merchantOAuthDetails.accessTokenValidity = info.accessTokenValidity;
        merchantOAuthDetails.refreshTokenValidity = info.refreshTokenValidity;

        if (this.hasValue(info.parent)) {
            merchantInfo.parent = info.parent;
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

    canUpdateMerchant() {
        let selectedAuthorities = this.prepareSelectedAuthorities();
        const {name, username, clientId} = this.state;

        if (!this.hasValue(name)) {
            toast.error('نام پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(username)) {
            toast.error('نام کاربری پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(clientId)) {
            toast.error('شناسه کاربری پذیرنده را وارد کنید');
            return false;
        }

        if (!this.hasValue(selectedAuthorities) || selectedAuthorities.length === 0) {
            toast.error('حداقل یک دسترسی به پذیرنده تخصیص دهید');
            return false;
        }

        return true;
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

        const {authorities, pageSize, currentPage} = this.state;
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
                                   value={this.state.password}
                                   name="password"
                                   onChange={(e) => this.fillParameterValue(e.target.value, "password")}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>پذیرنده پدر :</label>
                            <select className="form-control text-center disabled" disabled>
                                {this.state.parent ? (<option>{this.state.parent.name}</option>) : (<option>---</option>)}
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
                            <input type="button" className="btn btn-primary" value="ویرایش پذیرنده"
                                   onClick={this.updateMerchant}/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(EditMerchant);
