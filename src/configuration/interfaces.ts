
// TODO: move this into a NetworkService module
export interface INetworkRequestFailure {
    readonly code: string;
    readonly message: string;
    readonly meta?: any;
}
