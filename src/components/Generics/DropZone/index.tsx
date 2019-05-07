import * as React from 'react';
import { appLogger } from '../../../services/Logger';

interface IDropZoneState {
    readonly activeDragover: boolean;
    readonly hasError: boolean;
}

type DropZoneRenderProp = ((state: {
    activeDragover: boolean,
    hasError: boolean,
}) => React.ReactNode);

export interface IDropZoneProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    dropEffect?: string;
    multiple?: boolean;
    matchMime?: string | RegExp;
    onDragEnter?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave?: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (event: FileList) => void;
    children?: React.ReactNode | DropZoneRenderProp;
}

export default class DropZone extends React.Component<IDropZoneProps, IDropZoneState> {

    public state: IDropZoneState = {
        activeDragover: false,
        hasError: false,
    };

    constructor(props: IDropZoneProps) {
        super(props);
    }

    private _handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {

        event.stopPropagation();
        event.preventDefault();

        if (typeof this.props.onDragEnter === 'function') {
            this.props.onDragEnter(event);
        }

        if (typeof event.dataTransfer.dropEffect === 'string') {
            event.dataTransfer.dropEffect = this.props.dropEffect as string;
        }

        this.setState({ activeDragover: true });
    }

    private _handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {

        event.stopPropagation();
        event.preventDefault();

        if (typeof this.props.onDragLeave === 'function') {
            this.props.onDragLeave(event);
        }

        this.setState({ activeDragover: false });
    }

    private _handleDrop = (event: React.DragEvent<HTMLDivElement>) => {

        event.stopPropagation();
        event.preventDefault();

        const { files } = event.dataTransfer;

        if (!this._filesDroppedAreValid(files)) {
            return this.setState({
                activeDragover: false,
                hasError: true,
            });
        }

        if (typeof this.props.onDrop === 'function') {
            this.props.onDrop(files);
        }

        this.setState({
            activeDragover: false,
            hasError: false,
        });

    }

    private _handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {

        event.stopPropagation();
        event.preventDefault();

    }

    private _filesDroppedAreValid(fileList: FileList): boolean {

        if (!this.props.multiple && fileList.length > 1) {
            return false;
        } if (this.props.matchMime) {
            for (let i = 0; i < fileList.length; i++) {
                appLogger.warn({ message: 'file type', meta: fileList[i].type });
                if (!fileList[i].type.match(this.props.matchMime)) {
                    return false;
                }
            }
        }

        return true;
    }

    public render() {

        const {
            id,
            className,
            style,
            children,
        } = this.props;

        const {
            activeDragover,
            hasError,
        } = this.state;

        return (
            <div
                id={id}
                className={className}
                style={style}
                onDragEnter={this._handleDragEnter}
                onDragLeave={this._handleDragLeave}
                onDrop={this._handleDrop}
                onDragOver={this._handleDragOver}
            >
                {(typeof children === 'function') ? (
                    (children as DropZoneRenderProp)({ activeDragover, hasError })
                ) : (
                        children
                    )}
            </div>
        );
    }

}
