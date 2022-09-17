export interface IHttpRequest {
	get<T>(endpoint: string, params: Record<string, any>): Promise<T>;
	post<T, D>(endpoint: string, data: D): Promise<T>;
	patch<T, D>(endpoint: string, data: D): Promise<T>;
}