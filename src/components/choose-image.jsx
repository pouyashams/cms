import React, {Component} from 'react';


class productInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    };

    chooseImageFile = (i) => {
        console.log(i, 123456)
    };

    render() {
        return (
            <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                <label>عکس کالا :</label>
                <div className="custom-file" style={{display: 'none'}}>
                    <input type="file" className="custom-file-input" id="customFile"
                           onChange={(e) => this.chooseImageFile(e.target.value)}

                    />
                    <label className="custom-file-label" htmlFor="customFile">انتخاب کنید</label>
                </div>
            </div>
        );
    };
}
export default productInfo;


