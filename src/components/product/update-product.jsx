import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {searchProduct} from "../../services/productService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';
import {loadDataOfProduct} from "../../services/productService";
import {fetchAllChildOfCurrentMerchant} from "../../services/userService";


class updateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productCategory: [],
            pageSize: 5,
            searchResultList: [],
            merchants: []
        };
            this.onUpdate = this.onUpdate.bind(this);
            this.onAccept = this.onAccept.bind(this);
        this.search = this.search.bind(this);
    }

    async componentDidMount() {
        try {
            const oldProductCategory = [{identifier: "", title: "انتخاب کنید..."}];
            const productCategoryList = [];
            const result = await loadDataOfProduct();
            if (result.status === 200) {
                result.data.productCategoryList.forEach((productCategory) => {
                    productCategoryList.push(
                        {identifier: productCategory.identifier, title: productCategory.productCategoryName}
                    )
                });
                const productCategory = oldProductCategory.concat(productCategoryList);
                this.setState({productCategory});
            }

            const resultForFetchMerchants = await fetchAllChildOfCurrentMerchant();
            if (resultForFetchMerchants.status === 200) {
                const merchantArray = this.prepareMerchantSelection(resultForFetchMerchants.data.data);
                this.setState({
                    merchants: merchantArray
                });
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    }

        onUpdate(searchResult) {
            this.props.history.push({
                pathname: '/product-info-update',
                productInfo: searchResult
            });
        }

        onAccept(searchResult) {
            this.props.history.push({
                pathname: '/accept-product',
                productInfo:searchResult
                // Object.assign(searchResult,{checkUpdate: false})
            });
        }

    getSearchCriteriaArray() {
        return [
            {
                name: "name",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "نام کالا",
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
                name: "code",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "شناسه کالا ",
                defaultValue: ""
            },
            {
                name: "numberOfProduct",
                element: "input",
                type: "text",
                placeholder: "---",
                label: "تعداد کالا",
                defaultValue: ""
            },
            {
                name: "category",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "دسته کالا",
                options: this.state.productCategory
            },
            {
                name: "requesterUserId",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "پذیرنده",
                options: this.state.merchants
            },
            {
                name: "registrationStatusCode",
                element: "select",
                placeholder: "---",
                defaultValue: "",
                label: "وضعیت ثبت",
                options: [
                    {
                        value: "",
                        title: "---"
                    },
                    {
                        value: "CONFORMED_PRODUCT_REGISTRATION_STATUS",
                        title: "تایید شده"
                    },
                    {
                        value: "REJECTED_PRODUCT_REGISTRATION_STATUS",
                        title: "رد شده"
                    },
                    {
                        value: "WAITING_FOR_CONFORM_PRODUCT_REGISTRATION_STATUS",
                        title: "در انتظار تایید"
                    }
                ]
            }
        ];
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
                },
                {
                    name: 'accept',
                    title: 'تایید لغو',
                    icon: 'fa fa-check-square',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onAccept
                }
            ],
            headerTitleInfos: [
                {name: "name", title: "نام کالا"},
                {name: "code", title: "شناسه کالا"},
                {name: "numberOfProduct", title: "تعداد کالا"},
                {name: "status", title: "وضعیت"}
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
            const result = await searchProduct(parameters);
            let searchResultList = [];
            if (result.status === 200) {
                result.data.data.forEach((dataInfo) => {
                    searchResultList.push(
                        {
                            identifier: dataInfo.identifier,
                            productItemInfoIdentifier: dataInfo.productItemInfo.identifier,
                            canConfirmOrRejectProduct: dataInfo.canConfirmOrRejectProduct,
                            status: dataInfo.status,
                            name: dataInfo.name,
                            englishName: dataInfo.productItemInfo.englishName,
                            code: dataInfo.productItemInfo.code,
                            numberOfProduct: dataInfo.productItemInfo.numberOfProduct,
                            taxation: dataInfo.productItemInfo.taxation,
                            price: dataInfo.productItemInfo.price,
                            description: dataInfo.productItemInfo.description,
                            productAttributeItemList: dataInfo.productItemInfo.productAttributeItemList,
                            productItemImageBase64List: dataInfo.productItemInfo.productItemImageBase64List
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

    render() {
        const {searchResultList, pageSize} = this.state;
        const searchCriteriaArray = this.getSearchCriteriaArray();
        const headerInfo = this.getResultTableHeader();
        const extraActions = this.getExtraActions();

        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">مدیریت کالا</h4>
                </div>
                <SearchCriteria extraActions={extraActions} onSearch={this.search}
                                searchCriteriaArray={searchCriteriaArray}/>
                <SearchResult headerInfo={headerInfo} searchResultList={searchResultList} pageSize={pageSize}/>
            </div>
        );
    }
}

export default withRouter(updateProduct);
