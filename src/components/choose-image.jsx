import React, {Component} from 'react';
import FileBase64 from 'react-file-base64';

class chooseImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productItemImageBase64List: [],
        };
        this.getFiles = this.getFiles.bind(this);
        this.deleteModal = this.deleteModal.bind(this);
    };

    componentDidMount() {
        const {base64Image} = this.props;
        console.log(base64Image)
        if (base64Image !== "" && base64Image !== null && base64Image !== undefined) {
            this.setState({productItemImageBase64List: base64Image})

        }
    };

    getFiles(files) {
        const productItemImageBase64List = this.state.productItemImageBase64List;
        files.forEach((file) => {
            productItemImageBase64List.push(
                file.base64
            )
        });
        this.setState({productItemImageBase64List})
    }

    deleteModal = (productItemImage) => {
        console.log(1)
        const productItemImageBase64List = this.state.productItemImageBase64List.filter(productImage => productImage !== productItemImage);
        this.setState({productItemImageBase64List})
    };

    returnFile = () => {
        const productItemImageBase64List = this.state.productItemImageBase64List;
        return productItemImageBase64List;
    };

    render() {
        const {productItemImageBase64List} = this.state;
        return (
            <div className="rtl border bg-light shadow m-0 float-right row w-100 justify-content-start my-3 pb-3">

                <label className="col-12 py-1 font-weight-bold">عکس کالا :</label>
                <img
                    className="p-2 rounded" alt="Cinque Terre" width="150" height="150"
                    src="data:image/png;base64,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"
                />
                {productItemImageBase64List.length !== 0 ?
                    <div className="px-5 ">
                        {productItemImageBase64List.map((productItemImage) =>
                            (
                                <img
                                    className="p-2 rounded float-left" alt="Cinque Terre" width="150" height="150"
                                    src={productItemImage}
                                    onClick={() => {
                                        this.deleteModal(productItemImage);
                                    }}/>
                            ))
                        }
                    </div> : null
                }
                <div className="px-3 custom-file"
                    // style={{display: 'none'}}
                >
                    <FileBase64
                        onDone={this.getFiles}
                        multiple={true}
                    />
                </div>
            </div>
        );
    };
}

export default chooseImage;


