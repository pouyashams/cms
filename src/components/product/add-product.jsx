import React, {Component} from 'react';
import {loadDataOfProduct} from "../../services/productService";
import {toast} from "react-toastify";
import ProductInfo from "./product-info";
class addProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productCategoryList: "",
            productCategory: "",
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
    madeData = () => {
        this.refs.child.madeData();
    };

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


