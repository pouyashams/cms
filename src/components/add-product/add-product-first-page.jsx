import React, {Component} from 'react';
import {loadDataOfProduct} from "../../services/productService";
import {toast} from "react-toastify";
import ProductPanel from "./add-product-panel";

class addProductFirstPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            numberOfProductList: [
                {
                    identifier: "",
                    productCategoryName: "انتخاب کنید..."
                },
                {
                    identifier: "1",
                    productCategoryName: "یک"
                },
                {
                    identifier: "2",
                    productCategoryName: "دو"
                },
                {
                    identifier: "3",
                    productCategoryName: "سه"
                },
                {
                    identifier: "4",
                    productCategoryName: "چهار"
                },
                {
                    identifier: "5",
                    productCategoryName: "پنج"
                },
                {
                    identifier: "6",
                    productCategoryName: "شش"
                },
                {
                    identifier: "other",
                    productCategoryName: "موارد دیگر..."
                },
            ],
            numberOfProduct: "",
            productCategoryList: "",
            productCategory: "",
            productItemSupplierList: "",
            // productItemInfoList: [
            //     {
            //         taxation: '',
            //         name: '',
            //         englishName: '',
            //         code: '',
            //         price: '',
            //         numberOfProduct: '',
            //         description: '',
            //         productItemImageBase64List: [],
            //         productItemImageList: [],
            //         productItemSupplier: {
            //             identifier: '',
            //             label: ''
            //         },
            //         productAttributeItemList: [],
            //     }
            // ]
        };
    };

    async componentDidMount() {
        try {
            const oldProductCategoryArray = [{identifier: "", productCategoryName: "انتخاب کنید..."}];
            const oldProductItemSupplierList = [{identifier: "", name: "انتخاب کنید..."}];
            const result = await await loadDataOfProduct();
            if (result.status === 200) {
                const productCategoryList = oldProductCategoryArray.concat(result.data.productCategoryList);
                const productItemSupplierList = oldProductItemSupplierList.concat(result.data.productItemSupplierList);

                this.setState({productCategoryList, productItemSupplierList});
                console.log(this.state.productCategoryList)
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
    }

    showProductLabel = () => {
        let list = [];
        const times = x => f => {
            if (x > 0) {
                f();
                times(x - 1)(f)
            }
        };
        times(this.state.numberOfProduct)(() => list.push({}));
        return list;
    };
    handelChangeNumberOfProduct = (numberOfProduct) => {
        if (numberOfProduct === "other") {
            this.setState({checked: true});
        }
        this.setState({numberOfProduct});
    };
    handelChangeSelected = (identifier) => {
        const productCategory = {
            identifier: identifier
        };
        this.setState({productCategory});
    };

    isValid = () => {
        const {productCategory, numberOfProduct} = this.state;
        let checked = false;
        if (productCategory !== "" && productCategory.identifier !== "" && numberOfProduct !== "other" && numberOfProduct !== "" && numberOfProduct !== "0") {
            checked = true;
        }
        return checked;
    };

    render() {
        const {productCategoryList, numberOfProductList, checked} = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">اطلاعات اولیه کالا</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <form
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-6 float-right">
                            <label>تعداد کالا :</label>
                            {checked ?
                                <input className="form-control text-center w-50"
                                       type={"number"}
                                       placeholder="---"
                                       name={"numberOfProduct"}
                                       onChange={(e) => this.handelChangeNumberOfProduct(e.target.value)}
                                />
                                : <select className="form-control text-center w-50"
                                          onChange={(e) => this.handelChangeNumberOfProduct(e.target.value)}
                                >
                                    {numberOfProductList.map(
                                        (productCategory) => {
                                            return (<option
                                                value={productCategory.identifier}>{productCategory.productCategoryName}</option>);
                                        }
                                    )}
                                </select>
                            }
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-6 float-right">
                            <label>دسته کالا :</label>
                            {
                                productCategoryList.length !== 0 ?
                                    <select className="form-control text-center w-50"
                                            onChange={(e) => this.handelChangeSelected(e.target.value)}
                                    >
                                        {productCategoryList.map(
                                            (productCategory) => {
                                                return (<option
                                                    value={productCategory.identifier}>{productCategory.productCategoryName}</option>);
                                            }
                                        )}
                                    </select>
                                    : null
                            }
                        </div>
                    </form>
                </div>

                {this.isValid() ?
                    <div>
                        <div className="col-12 justify-content-center align-items-center text-center">
                            <form
                                className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                                {this.showProductLabel().map(
                                    () => (
                                        <ProductPanel
                                            productItemSupplierList={this.state.productItemSupplierList}
                                            productCategoryList={this.state.productCategoryList}
                                            productCategory={this.state.productCategory}
                                        />
                                    ))}
                            </form>
                        </div>
                    </div>
                    : null
                }
            </div>
        );
    };
};

export default addProductFirstPage;


