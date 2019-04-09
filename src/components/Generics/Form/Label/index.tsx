import * as React from 'react';

export interface ILabelProps {
    id: string;
    text: string;
    forId?: string;
    classList?: string;
}

export const Label: React.FunctionComponent<ILabelProps> = ({
    id,
    text,
    forId,
    classList,
}) => (
        <label id={id} className={classList} htmlFor={forId}>{text}</label >
    );
