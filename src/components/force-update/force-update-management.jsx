import React, {Component} from 'react';
import SearchResult from "../search/search-result";
import {loadAllForceUpdate} from "../../services/forceUpdateService"
import {toast} from 'react-toastify';
import {withRouter} from 'react-router-dom';

class forceMpdateManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pageSize: 7,
            data: [],
        };
        this.onUpdate = this.onUpdate.bind(this);
        this.onAdd = this.onAdd.bind(this);

    }

    async componentDidMount() {
        try {
            const result = await loadAllForceUpdate();
            if (result.status === 200) {
                const data = [];
                console.log(result.data.data);
                result.data.data.forEach((dataInfo) => {
                    let updateIOS = "";
                    let updateAndroid = "";
                    if (dataInfo.isUpdateRequiredForAndroid) {
                        updateAndroid = "اجباری"
                    } else {
                        updateAndroid = "غیر اجباری"
                    }
                    if (dataInfo.isUpdateRequiredForIOS) {
                        updateIOS = "اجباری"
                    } else {
                        updateIOS = "غیر اجباری"
                    }
                    data.push(
                        {
                            iosVersion: dataInfo.iosVersion,
                            androidVersion: dataInfo.androidVersion,
                            androidURL: dataInfo.androidURL,
                            iosURL: dataInfo.iosURL,
                            isUpdateRequiredForAndroid: dataInfo.isUpdateRequiredForAndroid,
                            isUpdateRequiredForIOS: dataInfo.isUpdateRequiredForIOS,
                            updateIOS: updateIOS,
                            updateAndroid: updateAndroid,
                            name: dataInfo.merchantInfoDTO.name,
                            identifier: dataInfo.merchantInfoDTO.identifier,
                        }
                    )
                });
                this.setState({data});
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error('خطایی در دریافت اطلاعات رخ داده است.');
            }
        }
        document.getElementById("loading").style.display = "none";
    }

    onAdd() {
        this.props.history.push({
            pathname: '/add-force-update',
        });
    }

    onUpdate(data) {
        this.props.history.push({
            pathname: '/edit-force-update',
            updateInfo: data
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
                {name: "name", title: "نام پذیرنده"},
                {name: "iosVersion", title: "ورژن ios"},
                {name: "androidVersion", title: "ورژن android"},
                {name: "updateIOS", title: "اپدیت ios"},
                {name: "updateAndroid", title: "اپدیت android"},
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
                    <h4 className="py-2">مدیریت آپدیت</h4>
                </div>
                <div
                    className="rtl border bg-light justify-content-center align-items-center shadow row w-100 m-0 py-4 px-2">
                    <SearchResult headerInfo={headerInfo} searchResultList={data} pageSize={pageSize}/>
                    <div className="form-group float-right pt-3 px-4 ">
                        <input type="button" className="btn btn-warning" value="اضافه کردن"
                               onClick={this.onAdd}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(forceMpdateManagement);
