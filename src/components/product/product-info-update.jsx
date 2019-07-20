import React, {Component} from 'react';
import "../../css/textArea.css"
// import {toast} from "react-toastify";
import Image from "../choose-image"
import {withRouter} from 'react-router-dom';

class productInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productAttributeCategoryList: [],
            productItemSupplierList: [],
            productItemImageBase64List:[],
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


    handelChangeAttribute = (productAttribute, productAttributeCategory) => {
            // const productAttributeItemList = [];
            // productAttributeItemList.push(
            //     {
            //         productAttribute: {
            //             identifier: productAttribute
            //         },
            //         productAttributeCategory: {
            //             identifier: productAttributeCategory
            //         },
            //     }
            // );
            //
            // this.setState({productAttributeItemList});
    };

    madeData = () => {
        let productCategory = {identifier: this.props.productCategory.identifier};
        let productItemInfoList = [{
            name: this.state.name,
            englishName: this.state.englishName,
            code: this.state.code,
            numberOfProduct: this.state.numberOfProduct,
            taxation: this.state.taxation,
            price: this.state.price,
            description: this.state.description,
            productAttributeItemList: this.state.productAttributeItemList,
            productItemSupplier: this.state.productItemSupplier,
            productItemImageBase64List: this.returnFile()
        }];
        const dataInfo = {
            productCategory: productCategory,
            productItemInfoList: productItemInfoList,
        };
        return dataInfo;
    };


    // onUpdate = () => {
    // console.log(1234)
    // };

    returnFile = () => {
        const data = this.refs.child.returnFile();
        return data;
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
                        {console.log(this.state.productItemImageBase64List,"poya")}
                        <Image
                            ref="child"
                            base64Image={this.state.productItemImageBase64List}
                        />
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
                                                onChange={(e) => this.handelChangeAttribute(e.target.value, productAttribute.identifier)}
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
                        <input type="button" className="btn btn-primary mr-3" value="به روز رسانی "
                               onClick={() => {
                                   ""
                               }}/>
                    </div>
            </div>
        );
    };
}

export default withRouter(productInfo);


