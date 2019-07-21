import React, {Component} from 'react';
import "../../css/textArea.css"
import {toast} from "react-toastify";
import Image from "../choose-image"
import {withRouter} from 'react-router-dom';
import {onUpdate} from "../../services/productService";

class productInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productAttributeCategoryList: [],
            productItemImageBase64List: [],
            name: "",
            englishName: "",
            code: "",
            numberOfProduct: "",
            taxation: "",
            price: "",
            description: "",
            checked: "",
            productAttributeItemList: [],
            productAttributeList: [],
            identifier: "",
        }
    };

    async componentDidMount() {
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

    handelChangeInput = (value, name) => {
        this.setState({[name]: value});
    };

    showProductDetails = () => {
        const {productInfo} = this.props.location;
        if (!productInfo) return this.props.history.push('/update-product');
        this.setState({
            name: this.getValue(productInfo.name),
            identifier: this.getValue(productInfo.productItemInfoIdentifier),
            englishName: this.getValue(productInfo.englishName),
            code: this.getValue(productInfo.code),
            numberOfProduct: this.getValue(productInfo.numberOfProduct),
            taxation: this.getValue(productInfo.taxation),
            price: this.getValue(productInfo.price),
            description: this.getValue(productInfo.description),
            productAttributeItemList: this.getValue(productInfo.productAttributeItemList),
            productItemImageBase64List: this.getValue(productInfo.productItemImageBase64List),
            productAttributeList: this.getSelectedAttribute(productInfo.productAttributeItemList)
        });
    };

    getSelectedAttribute = (productAttributeItemList) => {
        let productAttributeList= [];
        productAttributeItemList.forEach((productAttribute) => {
            productAttributeList.push(
                {
                    productAttribute: {
                        identifier: productAttribute.productAttribute.identifier
                    },
                    productAttributeCategory: {
                        identifier: productAttribute.productAttributeCategory.identifier
                    }
                }
            )
        });
        return productAttributeList;
    };

    handelChangeAttribute = (productAttribute, productAttributeCategory) => {
        const productAttributeList = [];
        productAttributeList.push(
            {
                productAttribute: {
                    identifier: productAttribute
                },
                productAttributeCategory: {
                    identifier: productAttributeCategory
                }
            }
        );

        this.setState({productAttributeList});
    };

    madeData = () => {
        const productItemImageBase64List = [];
        this.returnFile().forEach((file) => {
            productItemImageBase64List.push(file.substr(22))
        });
        let productItemInfoList = {
            name: this.state.name,
            englishName: this.state.englishName,
            code: this.state.code,
            numberOfProduct: this.state.numberOfProduct,
            taxation: this.state.taxation,
            price: this.state.price,
            description: this.state.description,
            productAttributeItemList: this.state.productAttributeList,
            identifier: this.state.identifier,
            productItemImageBase64List: productItemImageBase64List
        };
        return productItemInfoList;
    };

    canAddProduct() {
        const {name, englishName, code, numberOfProduct, taxation, price, description, productItemImageBase64List} = this.state;

        if (!this.hasValue(name)) {
            toast.error('نام کالا را وارد کنید');
            return false;
        }

        if (!this.hasValue(englishName)) {
            toast.error('نام انگلیسی کالا را وارد کنید');
            return false;
        }

        if (!this.hasValue(code)) {
            toast.error('شناسه کالا را وارد کنید');
            return false;
        }

        if (!this.hasValue(numberOfProduct)) {
            toast.error('تعداد کالا را وارد کنید');
            return false;
        }

        if (!this.hasValue(taxation)) {
            toast.error(' مالیات را وارد کنید');
            return false;
        }

        if (!this.hasValue(price)) {
            toast.error(' قیمت را وارد کنید');
            return false;
        }

        if (!this.hasValue(description)) {
            toast.error(' توضیحات را وارد کنید');
            return false;
        }

        if (!this.hasValue(productItemImageBase64List) || productItemImageBase64List.length === 0) {
            toast.error('حداقل یک عکس وارد کنید');
            return false;
        }

        return true;
    }


    async onUpdateInfo() {
        let canUpdate = this.canAddProduct();
        if (canUpdate) {
            try {
                const result = await onUpdate(this.madeData());
                if (result.status === 200) {
                    toast.success('کالا با موفقیت به روز رسانی شد');
                    document.getElementById("loading").style.display = "none";
                    return this.props.history.push('/update-product');
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    toast.error('مشکلی در ارتباط با سرور به وجود امده است');
                }
            }
            document.getElementById("loading").style.display = "none";
        }
    };

    returnFile = () => {
        const data = this.refs.child.returnFile();
        return data;
    };

    render() {
        const productItem = this.state;
        const base64Image = [];
        const productItemImageBase64List = this.state.productItemImageBase64List;
        productItemImageBase64List.forEach((file) => {
            base64Image.push(
                "data:image/png;base64," + file
            )
        });
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
                                   name={"name"}
                                   onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="انگلیسی"
                                   value={productItem.englishName}
                                   name={"englishName"}
                                   onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شناسه کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.code}
                                   name={"code"}
                                   onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>قیمت :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.price}
                                   name={"price"}
                                   onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>مالیات :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.taxation}
                                   name={"taxation"}
                                   onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تعداد کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"number"}
                                   placeholder="---"
                                   value={productItem.numberOfProduct}
                                   name={"numberOfProduct"}
                                   onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 float-right">
                            <label>توضیحات :</label>
                            <textarea className="form-control text-center w-50 "
                                      value={productItem.description}
                                      name={"description"}
                                      onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        {base64Image.length !== 0 ?
                            <Image ref="child" base64Image={base64Image}/> : null
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
                                        <select className="form-control text-center w-75"
                                                defaultValue={productAttribute.productAttribute.identifier}
                                                onChange={(e) => this.handelChangeAttribute(e.target.value, productAttribute.productAttributeCategory.identifier)}
                                        >
                                            {productAttribute.productAttributeCategory.productAttributeList.map(
                                                (productCategory) => {
                                                    return (<option
                                                        value={productCategory.identifier}>{productCategory.attributeValue}</option>);
                                                })}
                                        </select>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="col-12 p-3 text-center">
                    <input type="button" className="btn btn-primary mr-3" value="به روز رسانی " onClick={() => {this.onUpdateInfo()}}/>
                </div>
            </div>
        );
    };
}

export default withRouter(productInfo);


