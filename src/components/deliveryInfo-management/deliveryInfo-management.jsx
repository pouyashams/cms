import React, {Component} from 'react';
import SearchResult from "../search/search-result";
import {loadDataOfCity} from "../../services/deliveryService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';

class deliveryInfoManagement extends Component {

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
            const result = await loadDataOfCity();
            if (result.status === 200) {
                const data = [];
                result.data.data.forEach((dataInfo) => {
                    data.push(
                        {
                            identifier: dataInfo.provinceInfo.identifier,
                            name: dataInfo.provinceInfo.name,
                            numberOfProduct: dataInfo.numberOfProduct,
                            waitingDay: dataInfo.waitingDay,
                            numberOfDate: dataInfo.numberOfDate,
                            deliveryAmount: dataInfo.deliveryAmount,
                            timePeriodList: dataInfo.timePeriodList
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
    }



    onUpdate(data) {
        this.props.history.push({
            pathname: '/edit-deliveryInfo',
            deliveryInfo: data
        });
    }
    getResultTableHeader() {
        let headerInfo = {
            showCheckBox: false,
            actions: [
                {
                    name: 'update',
                    title: 'ویرایش',
                    icon: 'fa fa-th-list',
                    style: 'btn btn-success btn-xs',
                    onclick: this.onUpdate
                }
            ],
            headerTitleInfos: [
                {name: "name", title: "نام استان"},
                {name: "numberOfProduct", title: "سقف تعداد سفارش"},
                {name: "waitingDay", title: "تعداد روز انتظار"},
                {name: "numberOfDate", title: "تعداد روز پیشنهادی"},
                {name: "deliveryAmount", title: "هزینه ارسال"},
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
                    <h4 className="py-2">اطلاعات تحویل سفارش</h4>
                </div>
                <div
                    className="rtl border bg-light shadow row w-100 m-0 py-4 px-2">
                    <SearchResult headerInfo={headerInfo} searchResultList={data} pageSize={pageSize}/>
                </div>
            </div>
        );
    }
}

export default withRouter(deliveryInfoManagement);
