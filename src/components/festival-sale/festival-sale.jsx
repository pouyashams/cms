import React, {Component} from 'react';
import SearchResult from "../search/search-result";
import {loadFestivalSale} from "../../services/festivalService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';

class festivalSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 6,
            data: [],
        };
        this.onUpdate = this.onUpdate.bind(this);
    }

    async componentDidMount() {
        try {
            const result = await loadFestivalSale();
            if (result.status === 200) {
                const data = [];
                result.data.data.forEach((dataInfo) => {
                    console.log(result.data.data)
                    let isForChargeShow = "";
                    let isForInternetPackageShow = "";
                    let isForShopShow = "";
                    let amountForCharge = "";
                    let amountForInternetPackage = "";
                    let amountForShop = "";
                    let percentForCharge = "";
                    let percentForInternetPackage = "";
                    let percentForShop = "";

                    if (dataInfo.isForCharge === true) {
                        isForChargeShow = "فعال"
                    } else {
                        isForChargeShow = "غیر فعال"
                    }
                    if (dataInfo.isForInternetPackage === true) {
                        isForInternetPackageShow = "فعال"
                    } else {
                        isForInternetPackageShow = "غیر فعال"
                    }
                    if (dataInfo.isForShop === true) {
                        isForShopShow = "فعال"
                    } else {
                        isForShopShow = "غیر فعال"
                    }
                    if (dataInfo.amountForCharge === null) {
                        amountForCharge = 0

                    } else {
                        amountForCharge = dataInfo.amountForCharge
                    }
                    if (dataInfo.amountForShop === null) {
                        amountForShop = 0
                    } else {
                        amountForShop = dataInfo.amountForShop
                    }
                    if (dataInfo.amountForInternetPackage === null) {
                        amountForInternetPackage = 0
                    } else {
                        amountForInternetPackage = dataInfo.amountForInternetPackage
                    }
                    if (dataInfo.percentForCharge === null) {
                        percentForCharge = 0
                    } else {
                        percentForCharge = dataInfo.percentForCharge
                    }
                    if (dataInfo.percentForInternetPackage === null) {
                        percentForInternetPackage = 0
                    } else {
                        percentForInternetPackage = dataInfo.percentForInternetPackage
                    }
                    if (dataInfo.percentForShop === null) {
                        percentForShop = 0
                    } else {
                        percentForShop = dataInfo.percentForShop
                    }

                    data.push(
                        {
                            identifier: dataInfo.merchantInfo.identifier,
                            id: dataInfo.identifier,
                            name: dataInfo.merchantInfo.name,
                            amountForCharge: amountForCharge,
                            amountForInternetPackage: amountForInternetPackage,
                            amountForShop: amountForShop,
                            fromDate: dataInfo.fromDate,
                            toDate: dataInfo.toDate,
                            isForCharge: dataInfo.isForCharge,
                            isForInternetPackage: dataInfo.isForInternetPackage,
                            isForShop: dataInfo.isForShop,
                            isForChargeShow: isForChargeShow,
                            isForInternetPackageShow: isForInternetPackageShow,
                            isForShopShow: isForShopShow,
                            percentForCharge: percentForCharge,
                            percentForInternetPackage: percentForInternetPackage,
                            percentForShop: percentForShop,
                            fileInfoList: dataInfo.fileInfoList
                            // statusCode:dataInfo.status.code,
                            // statusName:dataInfo.status.code,
                        }
                    );
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


    onUpdate(data) {
        this.props.history.push({
            pathname: '/edit-festival-sale',
            dataInfo: data
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
                    onclick: this.onUpdate
                }
            ],
            headerTitleInfos: [
                {name: "name", title: "نام پذیرنده"},
                {name: "fromDate", title: " تاریخ شروع تخفیف"},
                {name: "toDate", title: " تاریخ پایان تخفیف"},
                {name: "percentForCharge", title: "درصد شارژ"},
                {name: "amountForCharge", title: "مقدار شارژ"},
                {name: "percentForInternetPackage", title: "درصد اینترنت"},
                {name: "amountForInternetPackage", title: "مقدار اینترنت"},
                {name: "percentForShop", title: "درصد فروشگاه"},
                {name: "amountForShop", title: "مقدار فروشگاه"},
                {name: "isForChargeShow", title: "تخفیف شارژ"},
                {name: "isForInternetPackageShow", title: "تخفیف اینترنت"},
                {name: "isForShopShow", title: "تخفیف فروشگاه"},
            ]
        };
        return headerInfo;
    }

    render() {
        const headerInfo = this.getResultTableHeader();
        const {data, pageSize} = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">وضعیت تخفیف ها</h4>
                </div>
                <div
                    className="rtl border bg-light shadow row w-100 m-0 py-4 px-2">
                    <SearchResult headerInfo={headerInfo} searchResultList={data} pageSize={pageSize}/>
                </div>
            </div>
        );
    }
}

export default withRouter(festivalSale);
