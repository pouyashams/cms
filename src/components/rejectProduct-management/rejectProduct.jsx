import React, {Component} from 'react';
import SearchResult from "../search/search-result";
import {loadAllProductReport} from "../../services/productService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';

class rejectProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 5,
            data: [],
        };
        this.onUpdate = this.onUpdate.bind(this);
    }

    async componentDidMount() {
        try {
            const result = await loadAllProductReport();
            if (result.status === 200) {
                const data = [];
                result.data.data.forEach((dataInfo) => {
                    data.push(
                        {
                            data: dataInfo,
                            status: dataInfo.status.name,
                            name: dataInfo.productInfo.name,
                            description: dataInfo.description,
                        }
                    )
                });
                this.setState({data, dataInfo: result.data.data});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    }


    onUpdate(data) {
        this.props.history.push({
            pathname: '/edit-product-reject',
            rejectProduct: data
        });
    }

    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'update',
                    title: 'لغو',
                    icon: 'fa fa-th-list',
                    style: 'btn btn-danger btn-xs',
                    onclick: this.onUpdate
                }
            ],
            headerTitleInfos: [
                {name: "name", title: "نام کالا"},
                {name: "status", title: "سقف تعداد سفارش"},
                {name: "description", title: "توضیحات"},
            ]
        };
        return headerInfo;
    }

    render() {
        const headerInfo = this.getResultTableHeader();
        const {data, pageSize} = this.state;
        return (
            <div
                className="rtl border bg-light shadow row w-100 m-0 text-center justify-content-center align-items-center my-3">
                <div className="col-12 justify-content-center align-items-center text-center header-box text-light">
                    <h4 className="py-2">گزارش تخلف سیم کارت</h4>
                </div>
                <div
                    className="rtl border bg-light shadow row w-100 m-0 py-4 px-2">
                    <SearchResult headerInfo={headerInfo} searchResultList={data} pageSize={pageSize}/>
                </div>
            </div>
        );
    }
}

export default withRouter(rejectProduct);
