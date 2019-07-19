import React, {Component} from 'react';
import SearchCriteria from "../search/search-criteria";
import SearchResult from "../search/search-result";
import {searchProduct} from "../../services/productService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';
import {loadDataOfProduct} from "../../services/productService";


class updateProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productCategory: [],
            pageSize: 5,
            searchResultList: []
        };
        this.onUpdate = this.onUpdate.bind(this);
        this.onAccept = this.onAccept.bind(this);
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
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
    }

    onUpdate(searchResult) {
        this.props.history.push({
            pathname: '/product-info-update',
            productInfo: Object.assign(searchResult,{checkUpdate: true})
        });
    }

    onAccept(searchResult) {
        this.props.history.push({
            pathname: '/product-info-update',
            productInfo: Object.assign(searchResult,{checkUpdate: false})
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
                {name: "supplierName", title: "فروشنده محصول"},
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
            const data = [];
            if (result.status === 200) {
                result.data.data.forEach((dataInfo) => {
                    console.log(dataInfo,1234)
                    data.push(
                        {
                            productItemSupplierValue: dataInfo.productItemInfo.productItemSupplier.identifier,
                            supplierName: dataInfo.productItemInfo.productItemSupplier.name,
                            name: dataInfo.name,
                            englishName: dataInfo.productItemInfo.englishName,
                            code: dataInfo.productItemInfo.code,
                            numberOfProduct: dataInfo.productItemInfo.numberOfProduct,
                            taxation: dataInfo.productItemInfo.taxation,
                            price: dataInfo.productItemInfo.price,
                            description: dataInfo.productItemInfo.description,
                            productAttributeItemList: dataInfo.productCategory,
                        }
                    )
                });
                this.setState({searchResultList: data})
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('لطفا کلیه موارد را پر کنید');
            }
        }
    };

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
