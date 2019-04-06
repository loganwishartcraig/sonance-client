import * as React from 'react';

export interface IFormGroupLabelProps {
    readonly label: string;
    readonly id?: string;
    readonly className?: string;
}

const FormGroupLabel: React.FunctionComponent<IFormGroupLabelProps> = ({
    label,
    id,
    className,
}) => (

        <span className={className} id={id}>{label}</span>

    );

export default FormGroupLabel;
