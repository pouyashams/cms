import React, {Component} from 'react';

class definitionProductCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productAttributeCategoryList: [],
        }
    };

    componentDidMount() {
        const productCategoryList = this.props.productCategoryList.filter(product => product.identifier !== "");
        productCategoryList.forEach((productCategory) => {
            if (productCategory.identifier === parseInt(this.props.productCategory.identifier)) {
                this.setState({productAttributeCategoryList: productCategory.productAttributeCategoryList});
            }
        })
    }

    handelChangeInput = (value, name) => {
    };

    handelChangeSelected = (identifier) => {
    };

    render() {
        const productItem = this.props;
        const oldAttribute = [{identifier: "", attributeValue: "انتخاب کنید..."}];

        return (
            <div className="rtl row w-100 m-0 text-center justify-content-center align-items-center my-3">
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
                                   value={productItem.productItem}
                                   name={"productItem"}
                                   onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>فروشنده محصول :</label>
                            <select className="form-control text-center w-50"
                                    onChange={(e) => this.handelChangeSelected(e.target.value)}
                            >
                                {productItem.productItemSupplierList.map(
                                    (productCategory) => {
                                        return (<option
                                            value={productCategory.identifier}>{productCategory.name}</option>);
                                    }
                                )}
                            </select>
                        </div>

                        <div className="form-group col-12 float-right">
                            <label>توضیحات :</label>
                            <textarea className="form-control text-center w-50"
                                      value={this.props.description}
                                      name={"description"}
                                      onChange={(e) => this.handelChangeInput(e.target.value, e.target.name)}
                            />
                        </div>

                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>عکس کالا :</label>
                            <div className="custom-file">
                                <input type="file" className="custom-file-input" id="customFile"/>
                                <label className="custom-file-label" for="customFile">Choose file</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <div
                        className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 ">
                            <h4 className="py-3">تعریف ویژگی کالا :</h4>
                            {this.state.productAttributeCategoryList.map((productAttribute) =>
                                (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                                        <label>{productAttribute.categoryName}:</label>
                                        <select className="form-control text-center w-75"
                                            // onChange={(e) => this.handelChangeSelected(e.target.value)}
                                        >
                                            {oldAttribute.concat(productAttribute.productAttributeList).map(
                                            (productCategory) => {
                                            return (<option
                                            value={productCategory.identifier}>{productCategory.attributeValue}</option>);
                                            }
                                            )}
                                        </select>
                                    </div>
                                ))

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default definitionProductCategory;


