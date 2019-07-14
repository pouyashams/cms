import React from 'react';
const chooseImage = () => {
    return (
        <React.Fragment>
            <div className="form-group col-12 col-sm-6 col-md-3 float-right">
                <label>عکس کالا :</label>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile"/>
                    <label className="custom-file-label" for="customFile">Choose file</label>
                </div>
            </div>
        </React.Fragment>
    );
};

export default chooseImage;
