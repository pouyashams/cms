import React, {Component} from 'react';
import {loadDataOfProduct, sendProduct} from "../../services/productService";
import {toast} from "react-toastify";
import ProductInfo from "./product-info";

class addProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productCategoryList: "",
            productCategory: "",
            categoryValue: "",
            checked: false,
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
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    }

    handelChangeSelected = (identifier) => {
        const productCategory = {
            identifier: identifier
        };
        this.setState({productCategory});
    };
    madeData = async () => {
        const canUpdate = this.canAddProduct();
        if (canUpdate) {
            const data = this.refs.child.madeData();
            try {
                const result = await sendProduct(data);
                if (result.status === 200) {
                    toast.success('کالا با موفقیت ثبت شد');
                    this.setState({
                        categoryValue: ""
                    });
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('خطایی در ارسال اطلاعات رخ داده است.');
                }
            }
            document.getElementById("loading").style.display = "none";
        }
    };

    canAddProduct() {
        const data = this.refs.child.madeData();

        if (!this.hasValue(data.name)) {
            toast.error('نام کالا را وارد کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].englishName)) {
            toast.error('نام انگلیسی کالا را وارد کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].code)) {
            toast.error('شناسه کالا را وارد کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].numberOfProduct)) {
            toast.error('تعداد کالا را وارد کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].taxation)) {
            toast.error(' مالیات را وارد کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].price)) {
            toast.error(' قیمت را وارد کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].description)) {
            toast.error(' توضیحات را وارد کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].productAttributeItemList[0].productAttribute)) {
            toast.error(' حداقل یک ویژگی انتخاب کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].productAttributeItemList[0].productAttribute.identifier)) {
            toast.error(' حداقل یک ویژگی انتخاب کنید');
            return false;
        }
        if (!this.hasValue(data.productItemInfoList[0].productItemImageBase64List) || data.productItemInfoList[0].productItemImageBase64List.length === 0) {
            toast.error('حداقل یک عکس وارد کنید');
            return false;
        }

        return true;
    }

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    }

    isValid = () => {
        const {productCategory} = this.state;
        let checked = false;
        if (productCategory !== "" && productCategory.identifier !== "") {
            checked = true;
        }
        return checked;
    };

    render() {
        const {productCategoryList} = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">دسته ی کالا</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <form
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-6 float-right">
                            <label>دسته کالا :</label>
                            {
                                productCategoryList.length !== 0 ?
                                    <select className="form-control text-center w-50"
                                            onChange={(e) => this.handelChangeSelected(e.target.value)}
                                            defaultValue={this.state.categoryValue}
                                    >
                                        {productCategoryList.map(
                                            (productCategory) => {
                                                return (<option
                                                    value={productCategory.identifier}>{productCategory.productCategoryName}</option>);
                                            }
                                        )}
                                    </select> : null}
                        </div>
                    </form>
                </div>
                {this.isValid() ?
                    <div>
                        <div className="col-12 justify-content-center align-items-center text-center">
                            <form
                                className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                                <ProductInfo
                                    ref="child"
                                    productCategoryList={this.state.productCategoryList}
                                    productCategory={this.state.productCategory}
                                />

                                <div className="col-12 text-center">
                                    <input type="button" className="btn btn-primary mr-3" value="ثبت کالا "
                                           onClick={() => {
                                               this.madeData();
                                           }}/>
                                </div>
                            </form>
                        </div>

                    </div>
                    : null
                }
            </div>
        );
    };
}

export default addProduct;


