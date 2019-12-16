import React, {Component} from 'react';
import "../../css/textArea.css"
import {withRouter} from 'react-router-dom';
import {reportProduct} from "../../services/productService";
import {toast} from 'react-toastify';

class editRejectProduct extends Component {

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
            identifier: "",
            canConfirmOrRejectProduct: ""

        }
    };

    componentDidMount() {
        const {rejectProduct} = this.props.location;
        if (!rejectProduct) return this.props.history.push('/product-reject');
        console.log(rejectProduct)
        this.setState({
            identifier: rejectProduct.data.identifier,
            productId: rejectProduct.data.productInfo.identifier,
            productStatus: rejectProduct.data.productInfo.status.name,
            productCategoryName: rejectProduct.data.productInfo.productCategory.productCategoryName,
            productAttributeItemList: rejectProduct.data.productInfo.productItemInfoList[0].productAttributeItemList,
            productItemImageBase64List: rejectProduct.data.productInfo.productItemInfoList[0].productItemImageBase64List,
            productDescription: rejectProduct.data.productInfo.productItemInfoList[0].description,
            price: rejectProduct.data.productInfo.productItemInfoList[0].price,
            numberOfProduct: rejectProduct.data.productInfo.productItemInfoList[0].numberOfProduct,
            name: rejectProduct.name,
            status: rejectProduct.status,
            description: rejectProduct.description,
        });
    }


    cancelProductInfo = async () => {
        try {
            let data = {identifier: this.state.identifier};
            console.log(data)
            const result = await reportProduct(data);
            if (result.status === 200) {
                toast.success('با موفقیت لغو شد');
                document.getElementById("loading").style.display = "none";
                return this.props.history.push('/product-reject');
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('ارتباط با سرور برقرار نشد');
            }
        }
        document.getElementById("loading").style.display = "none";
    };


    render() {
        const productItem = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div
                    className=" col-12 justify-content-center align-items-center text-center header-box  text-light">
                    <h4 className="py-2"> لغو سیمکارت</h4>
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
                            <label>وضعیت :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   value={productItem.status}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>وضعیت کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   value={productItem.productStatus}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>دسته کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   value={productItem.productCategoryName}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>شناسه کالا :</label>
                            <input className="form-control text-center w-50"
                                   type={"input"}
                                   placeholder="---"
                                   value={productItem.productId}
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

                        <div className="form-group col-6 float-right">
                            <label>توضیحات :</label>
                            <textarea className="form-control text-center w-75 "
                                      value={productItem.description}
                            />
                        </div>
                        <div className="form-group col-6 float-right">
                            <label>توضیحات کالا :</label>
                            <textarea className="form-control text-center w-75 "
                                      value={productItem.productDescription}
                            />
                        </div>

                        <div className="col-12 justify-content-center align-items-center text-center">
                            <div
                                className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">
                                <div className="form-group col-12 ">
                                    <h4 className="py-3">مشخصات سیمکارت :</h4>
                                    {this.state.productAttributeItemList.map((productAttribute) =>
                                        (
                                            <div>
                                                {productAttribute.value !== null ?
                                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">

                                                        <label>{productAttribute.productAttributeCategory.categoryName}:</label>
                                                        <input className="form-control text-center w-75"
                                                               type={"input"}
                                                               placeholder="---"
                                                               value={productAttribute.value}
                                                        />
                                                    </div> :
                                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right">

                                                        <label>{productAttribute.productAttributeCategory.categoryName}:</label>
                                                        <input className="form-control text-center w-75"
                                                               type={"input"}
                                                               placeholder="---"
                                                               value={productAttribute.productAttribute.attributeValue}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
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
                                            ))}
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
                <div className="col-12 p-3 text-center">
                    <input type="button" className="btn btn-danger mr-3" value="لغو"
                           onClick={() => {
                               this.cancelProductInfo()
                           }}/>
                </div>
            </div>
        );
    };
}

export default withRouter(editRejectProduct);


