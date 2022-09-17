import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IHttpRequest } from "../typescript/interfaces/HttpRequest.interface";

export class HttpAdapter implements IHttpRequest {
	private _axios: AxiosInstance;

	constructor(
		baseUrl: string = ''
	) {
		this._axios = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json'
			}
		})
	}

	async get<T>(
		endpoint: string, 
		params: Record<string, any> = {}
	): Promise<T> {
		const response: AxiosResponse<T> = await this._axios.get<T>(endpoint, { params });
		return response.data;
	}

	async post<T, D>(endpoint: string, data: D): Promise<T> {
		const response: AxiosResponse<T> = await this._axios.post<T>(endpoint, data);
		return response.data;
	}

	async patch<T, D>(endpoint: string, data: D): Promise<T> {
		const response: AxiosResponse<T> = await this._axios.patch<T>(endpoint, data);
		return response.data;
	}
}