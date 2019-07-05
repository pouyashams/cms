import React, {Component} from 'react';
import DatePicker from "../SimpleDatePicker";

class SearchCriteria extends Component {

    constructor(props) {
        super(props);
        const {searchCriteriaArray} = this.props;
        let parameters = {};
        searchCriteriaArray.forEach((searchCriteria) => {
            let value = (searchCriteria.defaultValue !== null && searchCriteria.defaultValue !== undefined) ? searchCriteria.defaultValue : "";
            parameters = Object.assign({}, {[searchCriteria.name]: value}, parameters);
        });
        this.state = parameters;
        this.fillParameterValue = this.fillParameterValue.bind(this);
        this.search = this.search.bind(this);
    }


    fillParameterValue = (value, name) => {
        this.setState({[name]: value});
    };

    search = () => {
        this.props.onSearch(this.state);
    };

    render() {

        const {searchCriteriaArray} = this.props;
        let index = 1;
        return (
            <div className="col-12 justify-content-center align-items-center text-center">
                <form className="rtl border m-0 bg-light shadow float-right row w-100 justify-content-start my-3 pb-3">
                    {searchCriteriaArray.map((searchCriteria) => {
                            if (searchCriteria.element === 'input') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                                        <label>{searchCriteria.label} :</label>
                                        <input className="form-control text-center"
                                               type={searchCriteria.type}
                                               placeholder={searchCriteria.placeholder}
                                               value={this.state[searchCriteria.name]}
                                               name={searchCriteria.name}
                                               onChange={(e) => this.fillParameterValue(e.target.value, searchCriteria.name)}
                                        />
                                    </div>
                                );
                            } else if (searchCriteria.element === 'number') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                                        <label>{searchCriteria.label} :</label>
                                        <input className="form-control text-center"
                                               type={searchCriteria.type}
                                               placeholder={searchCriteria.placeholder}
                                               value={this.state[searchCriteria.name]}
                                               name={searchCriteria.name}
                                               onChange={(e) => this.fillParameterValue(e.target.value, searchCriteria.name)}
                                        />
                                    </div>
                                );
                            } else if (searchCriteria.element === 'select') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                                        <label>{searchCriteria.label} :</label>
                                        <select
                                            className="form-control text-center"
                                            onChange={(e) => this.fillParameterValue(e.target.value, searchCriteria.name)}
                                        >
                                            {searchCriteria.options.map(
                                                (option) => {
                                                    return (<option value={option.value}>{option.title}</option>);
                                                }
                                            )}
                                        </select>
                                    </div>
                                );
                            } else if (searchCriteria.element === 'date') {
                                return (
                                    <div className="form-group col-12 col-sm-6 col-md-3 float-right" key={index++}>
                                        <label>{searchCriteria.label} :</label>
                                        <DatePicker
                                            placeholder={searchCriteria.placeholder}
                                            onChange={this.fillParameterValue}
                                            name={searchCriteria.name}
                                        />
                                    </div>
                                );
                            } else {
                                return null;
                            }
                        }
                    )}
                    <div className="col-12 text-center justify-content-center">
                        <input type="button" className="btn btn-primary" value="جستجو" onClick={this.search}/>
                    </div>
                </form>
            </div>
        );
    }

}

export default SearchCriteria;
