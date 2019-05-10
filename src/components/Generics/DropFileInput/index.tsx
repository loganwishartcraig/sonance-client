import { FormikProps } from 'formik';
import * as React from 'react';
import DropZone, { IDropZoneProps } from '../DropZone';
import { Omit } from '../../../utilities';

interface IDropFileInputProps<Values> extends Omit<IDropZoneProps, 'onDrop' | 'children'> {
    readonly name: keyof Values & string;
    readonly required?: boolean;
    readonly formik: FormikProps<Values>;
    readonly children?: (config: {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        ref: React.MutableRefObject<HTMLInputElement | null>;
        name: string;
    }) => React.ReactNode;
}

const DropFileInput: React.FunctionComponent<IDropFileInputProps<any>> = <Values extends {}>({
    name,
    required,
    formik,
    children,
    ...dropZoneProps
}: IDropFileInputProps<Values>) => {

    const _inputRef = React.useRef<HTMLInputElement>(null);

    const _handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        console.warn('handling input change');
        formik.setFieldTouched(name, true);
        formik.setFieldValue(name, files, true);
    };

    const _handleDrop = (fileList: FileList) => {
        if (_inputRef.current) {
            _inputRef.current.files = fileList;
        }
    };

    return (
        <DropZone onDrop={_handleDrop} {...dropZoneProps}>
            {(typeof children === 'function') && children({
                name,
                onChange: _handleInputChange,
                ref: _inputRef,
            })}
        </DropZone>
    );
};

export default DropFileInput;
