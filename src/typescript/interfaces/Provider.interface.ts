import { IHttpRequest } from './HttpRequest.interface';

export interface IProvider {
	readonly httpClient: IHttpRequest;
}