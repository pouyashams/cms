import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {searchCustomerBill} from "../../services/reportService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';


class reportOfBill extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 10,
            searchResultList: []
        };
    }

    getSearchCriteriaArray() {
        return [

            {
                name: "customerReferenceNumber",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "شماره پیگیری",
                defaultValue: ""
            }, {
                name: "paymentId",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "شناسه پرداخت",
                defaultValue: ""
            }, {
                name: "billId",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "شناسه قبض",
                defaultValue: ""
            },
            {
                name: "identifier",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "شناسه سفارش",
                defaultValue: ""
            },
            {
                name: "mobileNumber",
                element: "input",
                type: "number",
                placeholder: "---",
                label: "شماره موبایل",
                defaultValue: ""
            },
            {
                name: "registerDateFrom",
                element: "date",
                placeholder: "--- ",
                label: "از تاریخ"
            },
            {
                name: "registerDateTo",
                element: "date",
                placeholder: "---",
                label: "تا تاریخ"
            },
            {
                name: "paymentGatewayProviderCode",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "درگاه پرداخت",
                options: [
                    {value: "", title: "انتخاب کنید..."},
                    {value: "PARSIAN_PAYMENT_GATEWAY_PROVIDER", title: "پارسیان"},
                    {value: "FANAVA_PAYMENT_GATEWAY_PROVIDER", title: "فن آوا"}
                ]
            },
            {
                name: "billTypeCode",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "نوع قبض",
                options: [
                    {value: "", title: "انتخاب کنید..."},
                    {value: "WATER_BILL_TYPE", title: "قبض آب"},
                    {value: "ELECTRICITY_BILL_TYPE", title: "قبض برق"},
                    {value: "GAS_BILL_TYPE", title: "قبض گاز"},
                    {value: "PHONE_BILL_TYPE", title: "قبض تلفن ثابت"},
                    {value: "MOBILE_BILL_TYPE", title: "قبض تلفن همراه"},
                    {value: "MUNICIPALITY_BILL_TYPE", title: "قبض  شهرداری"},
                    {value: "TAX_BILL_TYPE", title: "قبض مالیات"},
                    {value: "DRIVING_BILL_TYPE", title: "قبض راهنمایی و رانندگی"},

                ]
            },
            {
                name: "orderStatusCode",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "وضعیت سفارش:",
                options: [
                    {value: "", title: "انتخاب کنید..."},
                    {value: "REGISTERED_ORDER_STATUS", title: "ثبت شده"},
                    {value: "PAID_ORDER_STATUS", title: "پرداخت شده"}
                ]
            },
        ];
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [],
            headerTitleInfos: [
                {name: "identifier", title: "شناسه سفارش"},
                {name: "billId", title: "شناسه قبض"},
                {name: "billType", title: "نوع قبض"},
                {name: "paymentId", title: "شناسه پرداخت"},
                {name: "orderStatus", title: "وضعیت سفارش"},
                {name: "mobileNumber", title: "شماره موبایل"},
                {name: "customerReferenceNumber", title: "شماره پیگیری"},
                {name: "paymentGatewayProvider", title: "درگاه پرداخت"},
                {name: "amount", title: "مبلغ"},
                {name: "registerDateTime", title: "تاریخ"},
            ]
        };
        return headerInfo;
    }

    search = async (parameters) => {
        try {
            const result = await searchCustomerBill(parameters);
            if (result.status === 200) {
                this.setState({searchResultList: result.data.data})
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('لطفا کلیه موارد را پر کنید');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    render() {
        const searchCriteriaArray = this.getSearchCriteriaArray();
        const headerInfo = this.getResultTableHeader();
        const {searchResultList, pageSize} = this.state;

        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">گزارشات قبض</h4>
                </div>
                <SearchCriteria onSearch={this.search} searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}/>
            </div>
        );
    }
}

export default withRouter(reportOfBill);
