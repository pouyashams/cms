import React, {Component} from 'react';
import SearchCriteria from "./search/search-criteria";
import SearchResult from "./search/search-result";
import {searchMerchant} from "./../services/userService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';


class MerchantManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            searchResultList: []
        };
        this.onUpdate = this.onUpdate.bind(this);
        this.onRegisterMerchant = this.onRegisterMerchant.bind(this);
    }


    onUpdate(searchResult) {
        this.props.history.push({
            pathname: '/edit-merchant',
            merchantInfo: searchResult
        });
    }

    onRegisterMerchant() {
        this.props.history.push({
            pathname: '/register-merchant'
        });
    }

    getSearchCriteriaArray() {
        return [
            {
                name: "name",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "نام",
                defaultValue: ""
            },
            {
                name: "code",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "کد پذیرنده",
                defaultValue: ""
            },
            {
                name: "username",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "نام کاربری",
                defaultValue: ""
            },
            {
                name: "email",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "ایمیل",
                defaultValue: ""
            }
        ];
    }

    getExtraActions() {
        let extraActions = {
            rightActions: [],
            leftActions: [
                {
                    name: 'update',
                    title: 'اضافه کردن',
                    icon: 'fa fa-user-plus',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onRegisterMerchant
                }
            ]
        };
        return extraActions;
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            rightActions : [],
            leftActions : [],
            actions: [
                {
                    name: 'update',
                    title: 'ویرایش',
                    icon: 'fa fa-th-list',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onUpdate
                }
            ],
            headerTitleInfos: [
                {name: "name", title: "نام"},
                {name: "code", title: "کد پذیرنده"},
                {name: "username", title: "نام کاربری"},
                {name: "email", title: "ایمیل"}
            ]
        };
        return headerInfo;
    }

    search = async (parameters) => {
        try {
            const result = await searchMerchant(parameters);
            if (result.status === 200) {
                this.setState({searchResultList: result.data.data})
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('لطفا کلیه موارد را پر کنید');
            }
        }
    };

    render() {
        const searchCriteriaArray = this.getSearchCriteriaArray();
        const headerInfo = this.getResultTableHeader();
        const {searchResultList, pageSize} = this.state;
        const extraActions = this.getExtraActions();

        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">مدیریت پذیرندگان</h4>
                </div>
                <SearchCriteria extraActions={extraActions} onSearch={this.search} searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}/>
            </div>
        );
    }
}

export default withRouter(MerchantManagement);
