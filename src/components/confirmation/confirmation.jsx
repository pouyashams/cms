import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {searchDataOFConfirmation} from "../../services/confirmationServise"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';


class confirmation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            searchResultList: []
        };
        this.onUpdate = this.onUpdate.bind(this);
    }


    onUpdate(searchResult) {
        this.props.history.push({
            pathname: '/accept-confirmation',
            customerInfo: searchResult
        });
    }

    getSearchCriteriaArray() {
        return [
            {
                name: "identifier",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "شناسه سفارش",
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
                name: "orderStatusIdentifier",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "وضعیت پرداخت",
                options: [
                    {value: "", title: "انتخاب کنید..."},
                    {value: "REGISTERED_ORDER_STATUS", title: "ثبت شده"},
                    {value: "ACCEPTED_ORDER_STATUS", title: "تایید شده"},
                    {value: "CANCELED_ORDER_STATUS", title: "لغو شده"},
                    {value: "PAID_ORDER_STATUS", title: "پرداخت شده"},
                    {value: "REVERSED_ORDER_STATUS", title: "برگشت خورده"},
                ]
            },
            {
                name: "customerReferenceNumber",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "شناسه پرداخت",
                defaultValue: ""
            },
        ];
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'update',
                    title: 'تایید لغو',
                    icon: 'fa fa-th-list',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onUpdate
                }
            ],
            headerTitleInfos: [
                {name: "identifier", title: "شناسه سفارش"},
                {name: "customerReferenceNumber", title: "شناسه پرداخت"},
                {name: "mobileNumber", title: "شماره تلفن"},
                {name: "orderStatus", title: "وضعیت پرداخت"},
                {name: "sumOfAmount", title: "قیمت کل"},
                {name: "registerDate", title: "تاریخ ثبت"},
            ]
        };
        return headerInfo;
    }

    getExtraActions() {
        let extraActions = {
            rightActions: [],
            leftActions: []
        };
        return extraActions;
    }

    search = async (parameters) => {
        try {
            const result = await searchDataOFConfirmation(parameters);
            if (result.status === 200) {
                const searchResultList = [];
                result.data.data.forEach((dataInfo) => {
                    searchResultList.push(
                        {
                            name: dataInfo.orderStatus.name,
                            mobileNumber: dataInfo.mobileNumber,
                            identifier: dataInfo.identifier,
                            date: dataInfo.orderDeliveryInfo.date,
                            orderStatusIdentifier: dataInfo.orderStatus.name,
                            customerReferenceNumber: dataInfo.customerReferenceNumber,
                            time: dataInfo.orderDeliveryInfo.time,
                            registerDate: dataInfo.registerDate,
                            deliveryType: dataInfo.orderDeliveryInfo.deliveryType.name,
                            address: dataInfo.addressInfo.address,
                            productItemSellInfoList: dataInfo.productItemSellInfoList,
                            canAcceptOrReject: dataInfo.canAcceptOrReject,
                            sumOfAmount: dataInfo.sumOfAmount,
                        }
                    )
                });
                this.setState({searchResultList});
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
        const extraActions = this.getExtraActions();
        const {searchResultList, pageSize} = this.state;

        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">بررسی فروش</h4>
                </div>
                <SearchCriteria extraActions={extraActions} onSearch={this.search}
                                searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}/>
            </div>
        );
    }
}

export default withRouter(confirmation);
