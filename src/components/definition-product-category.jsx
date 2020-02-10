import React, {Component} from 'react';
import {loadData, loadSuperCategories, sendListOfDefinitionProduct} from "../services/productService";
import {toast} from "react-toastify";
import Tree from 'react-tree-graph';

class definitionProductCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            parentProductCategory: {
                identifier: ""
            },
            oldProductCategoryArray: [
                {
                    identifier: "",
                    productCategoryName: "انتخاب کنید..."
                }
            ],
            productCategoryName: "",
            productCategoryList: "",
            productAttributeCategoryList: "",
            data: [],
        };
    };

    async componentDidMount() {
        try {
            const {oldProductCategoryArray} = this.state;
            const result = await await loadData();
            if (result.status === 200) {
                const CategoryList = [];
                const productCategoryList = oldProductCategoryArray.concat(result.data.productCategoryList);
                const productAttributeCategoryList = result.data.productAttributeCategoryList;
                productAttributeCategoryList.forEach((productCategory) => {
                    CategoryList.push(
                        {
                            identifier: productCategory.identifier,
                            categoryName: productCategory.categoryName,
                            checked: false
                        }
                    )
                });
                this.setState({productCategoryList, productAttributeCategoryList: CategoryList});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        try {
            const result = await loadSuperCategories();
            if (result.status === 200) {
                this.fillTreeCategories(result.data.data);
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    }

    fillTreeCategories = (superCategories) => {
        let superCategory = {name: ""};
        let childList = [];
        superCategories.forEach((category) => {
            childList.push(category)
        });
        superCategory.childList = childList;
        let data = this.getCategoryInfo(superCategory);
        this.setState({
            data
        });
    };


    getCategoryInfo = (category) => {
        let categoryInfo = {
            name : category.name
        };
        if (category.childList.length !== 0) {
            let children = [];
            category.childList.forEach((child) => {
                children.push(this.getCategoryInfo(child))
            });
            categoryInfo.children = children;
        } else {
            categoryInfo.children = [];
        }
        return categoryInfo;
    };
    sendProduct = async () => {
        const {productCategoryName, parentProductCategory,productAttributeCategoryList} = this.state;
        const categoryList=[];
        productAttributeCategoryList.forEach((productCategory) => {
            if(productCategory.checked===true){
                categoryList.push(
                    {identifier: productCategory.identifier}
                )
            }
        });
        const data = {
            productCategoryName: productCategoryName,
            productAttributeCategoryList: categoryList,
            parentProductCategory: parentProductCategory
        };
        try {
            const result = await await sendListOfDefinitionProduct(data);
            if (result.status === 200) {
                toast.success('عملیات با موفقیت انجام شد');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    };
    handelChangeProductCategoryName = (productCategoryName) => {
        this.setState({productCategoryName});
    };
    handelChangeCheckBox = (id, checked) => {
        const productAttributeCategoryList = [];
        this.state.productAttributeCategoryList.forEach((productCategory) => {
            if (productCategory.identifier === parseInt(id)) {
                productAttributeCategoryList.push(
                    {
                        identifier: productCategory.identifier,
                        checked: checked,
                        categoryName: productCategory.categoryName
                    }
                )
            }
            else {
                productAttributeCategoryList.push(
                    {
                        identifier: productCategory.identifier,
                        checked: productCategory.checked,
                        categoryName: productCategory.categoryName

                    }
                )
            }
        });
        this.setState({productAttributeCategoryList});
    };

    handelChangeSelected = (identifier) => {
        const parentProductCategory = {
            identifier: identifier
        };
        this.setState({parentProductCategory});

    };

    render() {
        const {productCategoryList, productAttributeCategoryList} = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">تعریف ویژگی نوع کالا</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <form
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-6 float-right">
                            <label>نام نوع کالا:</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="---"
                                   value={this.state.productCategoryName}
                                   name={"productCategoryName"}
                                   onChange={(e) => this.handelChangeProductCategoryName(e.target.value)}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-6 float-right">
                            <label>دسته پدر:</label>
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
                {productAttributeCategoryList.length !== 0 ? (
                    <div className="col-12 justify-content-center align-items-center text-center">
                        <form
                            className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                            <div className="form-group col-12 ">
                                <h4 className="py-3"> ویژگی ها:</h4>
                            </div>
                            {productAttributeCategoryList.map((productAttribute) =>
                                (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                        <div className="input-group">
                                            <div className="input-group addon">
                                                <div className="py-2 custom-control custom-checkbox">
                                                    <input type="checkbox" className=" custom-control-input"
                                                           checked={productAttribute.checked}
                                                           id={productAttribute.identifier}
                                                           onChange={(e) => this.handelChangeCheckBox(e.target.id, e.target.checked)}
                                                    />
                                                    <label className="px-4 custom-control-label"
                                                           htmlFor={productAttribute.identifier}>{productAttribute.categoryName}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )}
                            <div className="col-12 text-center justify-content-center">
                                <input type="button" className="btn btn-primary mr-3" value="ثبت نهایی "
                                       onClick={() => {
                                           this.sendProduct();
                                       }}/>
                            </div>
                        </form>
                    </div>
                ) : null}
                <div className="col-11 border shadow my-5 ">
                    <div
                        className="col-12 justify-content-center align-items-center text-center header-box text-light border-left">
                        <h4 className="py-2">نمایش دسته ها</h4>
                    </div>
                    <Tree
                        data={this.state.data}
                        height={500}
                        width={1100}
                        svgProps={{
                            className: 'custom'
                        }}
                    />
                </div>
            </div>
        );
    };
};

export default definitionProductCategory;


