import React, {Component} from 'react';
import {loadAllProductAttributeCategory} from "../services/productService";
import {toast} from "react-toastify";

class productCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastIndex: 0,
            numberOfCategory: "",
            categoryName: "",
            productAttributeList: [],
            selectedOldProductAttributeCategory: null,
            oldProductAttributeCategoryArray: [
                {
                    identifier: "",
                    categoryName: '---'
                }
            ]
        };
        this.handelChangeOldProductAttributeCategory = this.handelChangeOldProductAttributeCategory.bind(this);
    };

    hasValue(field) {
        return field !== null && field !== undefined && field !== "";
    }

    async componentDidMount() {
        try {
            const result = await await loadAllProductAttributeCategory();
            if (result.status === 200) {
                const {oldProductAttributeCategoryArray} = this.state;
                const loadedOldProductAttributeCategory = oldProductAttributeCategoryArray.concat(result.data.data);
                this.setState({oldProductAttributeCategoryArray: loadedOldProductAttributeCategory});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
    }


    handelChangeOldProductAttributeCategory = (identifier) => {
        if (this.hasValue(identifier)) {
            const {oldProductAttributeCategoryArray} = this.state;
            oldProductAttributeCategoryArray.forEach((oldProductAttributeCategory) => {
                if (oldProductAttributeCategory.identifier != null) {
                    if (parseInt(oldProductAttributeCategory.identifier, 10) === parseInt(identifier, 10)) {
                        let newProductAttributeList = [];
                        let lastIndex = this.state.lastIndex;
                        oldProductAttributeCategory.productAttributeList.forEach((productAttribute, index) => {
                            newProductAttributeList.push({
                                index: lastIndex,
                                identifier: productAttribute.identifier,
                                attributeValue: productAttribute.attributeValue,
                                canBeDelete: false,
                            })
                        });
                        this.setState({
                            productAttributeList: newProductAttributeList,
                            selectedOldProductAttributeCategory: identifier,
                            lastIndex : ++lastIndex
                        });
                    }
                }
            });
        } else {
            this.setState({
                productAttributeList: [],
                selectedOldProductAttributeCategory: null
            });
        }
    };


    handelChangeProductAttribute = (newValue, attributeInfo) => {
        const {productAttributeList} = this.state;
        productAttributeList.forEach((productAttribute) => {
            if (productAttribute.index === attributeInfo.index) {
                productAttribute.attributeValue = newValue;
                this.setState({productAttributeList});
            }
        });
    };

    handelChangeNewCategoryName = (categoryName) => {
        const {selectedOldProductAttributeCategory, productAttributeList} = this.state;
        const rawAttribute = this.getRawAttributeInfo();
        if (this.hasValue(selectedOldProductAttributeCategory)) {
            this.setState({
                categoryName,
                selectedOldProductAttributeCategory: null,
                productAttributeList: [rawAttribute]
            });
        } else {
            if (productAttributeList.length === 0) {
                this.setState({
                    categoryName,
                    productAttributeList: [rawAttribute]
                });
            } else {
                this.setState({categoryName});
            }
        }
    };

    addNewAttribute = () => {
        const {productAttributeList} = this.state;
        const rawAttribute = this.getRawAttributeInfo();
        let newProductAttributeList = productAttributeList;
        newProductAttributeList.push(rawAttribute);
        this.setState({productAttributeList: newProductAttributeList});
    };


    removeProductAttribute = (productAttribute) => {
        if(productAttribute.canBeDelete) {
            const productAttributeList = this.state.productAttributeList.filter(attribute => productAttribute.index !== attribute.index);
            this.setState({productAttributeList});
        }
    };


    getRawAttributeInfo = () => {
        let lastIndex = this.state.lastIndex;
        this.setState({lastIndex: ++lastIndex});
        return {
            index: lastIndex,
            identifier: "",
            attributeValue: "",
            canBeDelete: true,
            lastIndex: ++lastIndex
        }
    };

    render() {
        const {oldProductAttributeCategoryArray, productAttributeList} = this.state;

        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div
                    className="col-6 justify-content-center align-items-center text-center header-box text-light border-left">
                    <h4 className="py-2">اصلاح ویژگی</h4>
                </div>
                <div className="col-6 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">تعریف ویژگی</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <form
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">

                        <div className="form-group col-6 float-right border-left">
                            <label>نوع ویژگی:</label>
                            <select className="form-control text-center"
                                    value={this.state.selectedOldProductAttributeCategory}
                                    onChange={(e) => this.handelChangeOldProductAttributeCategory(e.target.value)}
                            >
                                {oldProductAttributeCategoryArray.map(
                                    (productAttributeCategory) => {
                                        return (<option
                                            value={productAttributeCategory.identifier}>{productAttributeCategory.categoryName}</option>);
                                    }
                                )}
                            </select>
                        </div>
                        <div className="form-group col-6 float-right">
                            <label>نام ویژگی جدید:</label>
                            <input className="form-control text-center"
                                   type={"input"}
                                   placeholder="---"
                                   value={this.state.categoryName}
                                   name={"categoryName"}
                                   onChange={(e) => this.handelChangeNewCategoryName(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
                {productAttributeList.length !== 0 ? (
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <form
                            className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                            {productAttributeList.map((productAttribute) =>
                                (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                        <label> مقدار ویژگی :</label>
                                        <div className="input-group">
                                            <div className="input-group addon">
                                                <input className="form-control text-center"
                                                       type={"input"}
                                                       placeholder="---"
                                                       name="productAttribute"
                                                       value={productAttribute.attributeValue}
                                                       onChange={(e) => this.handelChangeProductAttribute(e.target.value, productAttribute)}
                                                />
                                                <span
                                                    className={
                                                      productAttribute.canBeDelete ? "fa fa-remove bg-danger text-light h-100 p-0 m-0  remove-attribute-icon" : "fa fa-remove bg-danger text-light h-100 p-0 m-0  disabled-remove-attribute-icon"
                                                    }
                                                    onClick={() => this.removeProductAttribute(productAttribute)}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            <div className="col-12 text-center justify-content-center">
                                <input type="button" className="btn btn-primary mr-3" value="ثبت نهایی "/>
                                <input type="button" className="btn btn-primary" value="اضافه کردن" onClick={()=>{this.addNewAttribute();}}/>
                            </div>
                        </form>
                    </div>
                ) : null}
            </div>
        );
    };
};

export default productCategory;


