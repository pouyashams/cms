import React, {Component} from 'react';

class productCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfCategory: "",
            categoryName: "",
            productAttributeList: ""
        }
        this.handelChangeSelect = this.handelChangeSelect.bind(this);
        this.makeProductCategory = this.makeProductCategory.bind(this);
        this.sendListOfProduct = this.sendListOfProduct.bind(this);
        this.handelChangeCategoryName = this.handelChangeCategoryName.bind(this);
        this.handelChangeTypeOfCategory = this.handelChangeTypeOfCategory.bind(this);
    };

    handelChangeSelect = (numberOfCategory) => {
        this.setState({numberOfCategory});
    };

    // sendListOfProduct = () => {};

    handelChangeCategoryName = (categoryName) => {
        this.setState({categoryName});
    };

    handelChangeTypeOfCategory = (category , id) => {};

    makeProductCategory = () => {
        const input = [];
        let index = 1;
        for (let i = 0; i < this.state.numberOfCategory; i++) {
            input.push(
                <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                    <label> نوع ویژگی :</label>
                    <input className="form-control text-center"
                           type={"input"}
                           placeholder="---"
                           name={"numberOfCategory"}
                           onChange={(e) => this.handelChangeTypeOfCategory(e.target.value, (index + i))}
                    />
                </div>)
        };
        return input;
    };

    render() {
        const {numberOfCategory} = this.state;
        const options = [
            {
                value: null,
                title: "انتخاب کنید..."
            },
            {
                value: 1,
                title: "یک"
            },
            {
                value: 2,
                title: "دو"
            },
            {
                value: 3,
                title: "سه"
            },
            {
                value: 4,
                title: "چهار"
            },
            {
                value: 5,
                title: "پنج"
            },
            {
                value: 6,
                title: "شش"
            },
            {
                value: 7,
                title: "هفت"
            },
            {
                value: 8,
                title: "هشت"
            },
            {
                value: 9,
                title: "نه"
            },
            {
                value: 10,
                title: "ده"
            },
            {
                value: 11,
                title: "یازده"
            },
            {
                value: 12,
                title: "دوازده"
            },

        ];
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">تعریف ویژگی</h4>
                </div>
                <div className="col-12 justify-content-center align-items-center text-center">
                    <form
                        className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>نام ویژگی :</label>
                            <input className="form-control text-center"
                                   type={"input"}
                                   placeholder="---"
                                   value={this.state.categoryName}
                                   name={"categoryName"}
                                   onChange={(e) => this.handelChangeCategoryName(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                            <label>تعداد نوع ویژگی : </label>
                            <select
                                className="form-control text-center"
                                value={this.state.numberOfCategory}
                                onChange={(e) => this.handelChangeSelect(e.target.value)}>
                                {options.map(
                                    (option) => {
                                        return (<option value={option.value}>{option.title}</option>);
                                    }
                                )}
                            </select>
                        </div>
                    </form>
                </div>
                {numberOfCategory !== "" ?

                    <div className="col-12 justify-content-center align-items-center text-center">

                        <form
                            className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                            {this.makeProductCategory()}
                            <div className="col-12 text-center justify-content-center">
                                <input type="button" className="btn btn-primary" value="ثبت نهایی "
                                       onClick={this.sendListOfProduct()}
                                />
                            </div>
                        </form>
                    </div>
                    : console.log(numberOfCategory)
                }
            </div>
        );
    };
};

export default productCategory;


