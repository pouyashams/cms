import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import {acceptProduct, cancelProduct} from "../../services/productService";
import {toast} from 'react-toastify';

class confirmProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productAttributeCategoryList: [],
            productItemSupplierList: [],
            productItemImageBase64List: [],
            productItemSupplier: "",
            name: "",
            englishName: "",
            code: "",
            numberOfProduct: "",
            taxation: "",
            price: "",
            description: "",
            checked: "",
            productAttributeItemList: [],
            identifier: "",
        }
    };

    componentDidMount() {
        if (this.props.productCategoryList !== undefined) {
            const productCategoryList = this.props.productCategoryList.filter(product => product.identifier !== "");
            productCategoryList.forEach((productCategory) => {
                if (productCategory.identifier === parseInt(this.props.productCategory.identifier)) {
                    this.setState({productAttributeCategoryList: productCategory.productAttributeCategoryList});
                }
            });
        }
        this.showProductDetails();
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

    acceptProductInfo = async () => {
        try {
            const result = await acceptProduct(this.state.identifier);
            if (result.status === 200) {
                toast.success('کالا با موفقیت تایید شد');
                this.setState({searchResultList: result.data.data});
                document.getElementById("loading").style.display = "none";
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
            }
        }
        document.getElementById("loading").style.display = "none";
    };
    cancelProductInfo = async () => {
        console.log(1234)
        try {
            const result = await cancelProduct(this.state.identifier);
            if (result.status === 200) {
                toast.success('کالا با موفقیت لغو شد');

                this.setState({searchResultList: result.data.data});
                document.getElementById("loading").style.display = "none";
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
            }
        }
        document.getElementById("loading").style.display = "none";
    };

    showProductDetails = () => {
        const {productInfo} = this.props.location;
        if (!productInfo) return this.props.history.push('/update-product');
        this.setState({
            name: this.getValue(productInfo.name),
            identifier: this.getValue(productInfo.identifier),
            englishName: this.getValue(productInfo.englishName),
            code: this.getValue(productInfo.code),
            numberOfProduct: this.getValue(productInfo.numberOfProduct),
            taxation: this.getValue(productInfo.taxation),
            price: this.getValue(productInfo.price),
            description: this.getValue(productInfo.description),
            productAttributeItemList: this.getValue(productInfo.productAttributeItemList),
            productItemImageBase64List: this.getValue(productInfo.productItemImageBase64List),
            productItemSupplier: this.getValue({
                identifier: productInfo.productItemSupplierValue,
                name: productInfo.supplierName
            }),
        });
    };

    render() {
        const productItem = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light">
                    <h4 className="py-2">اطلاعات تکمیلی کالا</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div className="rtl m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.name}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="انگلیسی"
                                   value={productItem.englishName}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شناسه کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.code}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>قیمت :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.price}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>مالیات :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.taxation}

                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تعداد کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.numberOfProduct}

                            />
                        </div>

                        <div className="form-group col-12 float-right">
                            <label>توضیحات :</label>
                            <textarea className="form-control text-center w-50 "
                                      value={productItem.description}
                            />
                        </div>
                        {this.state.productItemImageBase64List.length !== 0 ?
                            <div className="col-12 justify-content-center align-items-center text-center">
                                <div
                                    className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                                    <div className="form-group col-12 ">
                                        <label className="col-12 py-1 font-weight-bold">عکس کالا :</label>
                                        {this.state.productItemImageBase64List.map((productItemImage) =>
                                            (
                                                <img
                                                    className="p-2 rounded float-right" alt="Cinque Terre" width="180"
                                                    height="180"
                                                    src={"data:image/png;base64," + productItemImage}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 ">
                            <h4 className="py-3">تعریف ویژگی کالا :</h4>
                            {this.state.productAttributeItemList.map((productAttribute) =>
                                (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                        <label>{productAttribute.productAttributeCategory.categoryName}:</label>
                                        <select className="form-control text-center w-75">
                                            <option>{productAttribute.productAttribute.attributeValue}</option>
                                        </select>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {this.state.canConfirmOrRejectProduct ?
                    <div className="col-12 p-3 text-center">
                        <input type="button" className="btn btn-primary mr-3" value="تایید "
                               onClick={() => {
                                   this.acceptProductInfo()
                               }}/>
                        <input type="button" className="btn btn-primary mr-3" value="لغو"
                               onClick={() => {
                                   this.cancelProductInfo()
                               }}/>
                    </div> :
                    <div className="col-12 p-3 text-center justify-content-center">


                        <button className="btn btn-danger btn-sm">
                            <span className="fa fa-warning"/>
                        </button>
                        <h6 className="p-2 font-weight-bold">(قادر به تایید یا لغو نمی باشید)</h6>
                    </div>
                }

            </div>
        );
    };
}

export default withRouter(confirmProduct);


