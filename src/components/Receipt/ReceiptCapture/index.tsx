import * as React from 'react';
import { appLogger } from '../../../services/Logger';
import Form from '../../Generics/Form';
import DropZone from '../../Generics/DropZone';

interface ReceiptCaptureFormData {
    receiptPicture: FileList;
}

export default class ReceiptCapture extends React.Component {

    private _fileInputRef: React.RefObject<HTMLInputElement>;

    constructor(props: {}) {
        super(props);
        this._fileInputRef = React.createRef();
    }

    private _handleSubmit = (formData: ReceiptCaptureFormData) => {
        appLogger.warn({ message: 'submitted!', meta: { formData } });
    }

    private _handleFileDrop = (droppedFiles: FileList) => {
        appLogger.warn({ message: 'Dropped!', meta: { droppedFiles } });

        if (this._fileInputRef.current) {
            this._fileInputRef.current.files = droppedFiles;
        }
    }

    private _validateReceiptPicture = (value: FileList) => {
        return (
            value
            && value.length === 1
            && !!value[0].type.match(/^image\//)
        );
    }

    public render() {
        return (
            <Form<ReceiptCaptureFormData>
                onSubmit={this._handleSubmit}
                initialValues={{
                    receiptPicture: null,
                }}
                validators={{
                    receiptPicture: this._validateReceiptPicture,
                }}
            >
                {({
                    onChange,
                    controls,
                }) => (
                        <div>
                            {console.warn(controls)}
                            <label htmlFor="uploadFile">Upload a file</label>
                            <DropZone
                                dropEffect={'move'}
                                onDrop={this._handleFileDrop}
                                style={{
                                    height: '200px',
                                    width: '500px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                multiple={false}
                                matchMime={/^image\//}
                            >
                                <input
                                    ref={this._fileInputRef}
                                    id="uploadFile"
                                    type="file"
                                    name="receiptPicture"
                                    accept="image/*"
                                    onChange={onChange}
                                    multiple={false}
                                    required
                                />
                            </DropZone>
                            <button type="submit">Submit</button>
                        </div>
                    )}
            </Form>
        );
    }

}
