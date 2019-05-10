import { ErrorMessage, Form, Formik } from 'formik';
import * as React from 'react';
import { appLogger } from '../../../services/Logger';
import DropFileInput from '../../Generics/DropFileInput';

interface IReceiptCaptureFormData {
    receiptPicture: FileList | null;
}

export default class ReceiptCapture extends React.Component {

    private _handleSubmit = (formData: IReceiptCaptureFormData) => {
        appLogger.warn({ message: 'submitted!', meta: { formData } });
    }

    private _validateReceiptPicture = (value: FileList | null) => {
        return (
            value
            && value.length === 1
            && !!value[0].type.match(/^image\//)
        );
    }

    public render() {
        return (
            <Formik<IReceiptCaptureFormData>
                initialValues={{ receiptPicture: null }}
                validateOnChange={true}
                validate={(values) => {
                    if (!this._validateReceiptPicture(values.receiptPicture)) {
                        return { receiptPicture: 'Invalid file uploaded. Make sure to upload a single image.' };
                    }
                }}
                onSubmit={this._handleSubmit}
            >
                {formikConf => (
                    <Form>
                        <label htmlFor="receiptPicture">Upload a file</label>
                        <DropFileInput
                            name="receiptPicture"
                            formik={formikConf}
                            required={true}
                            style={{
                                height: '200px',
                                width: '500px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            {inputProps => (
                                <input type="file" accept="image/*" {...inputProps} />
                            )}
                        </DropFileInput>
                        <ErrorMessage name="receiptPicture" />
                        <button type="submit" disabled={!formikConf.isValid}>Submit</button>
                    </Form>
                )}
            </Formik>
        );
    }

}
