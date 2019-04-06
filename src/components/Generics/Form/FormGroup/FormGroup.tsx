import * as React from 'react';

export interface IFormGroupProps {
    id: string;
    className?: string;
}

const FormGroup: React.FunctionComponent<IFormGroupProps> = ({
    id,
    className,
}) => (

        <div id={id} className={className}>
            Form Group {id}
        </div>

    );

export default FormGroup;
