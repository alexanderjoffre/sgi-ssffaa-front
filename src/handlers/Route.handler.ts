export class RouteHandler {

	private readonly _url: string;
	private readonly _baseUrl: string;
	private readonly _params: Record<string, string | number>;

	constructor(
		url: string,
		params: Record<string, string | number> = {},
		baseUrl: string = '',
	) {
		this._url = url;
		this._baseUrl = baseUrl;
		this._params = params;
	}

	public makeHref(): string {
		const params = Object.entries(this._params);
		const toUrl = !!params.length
									? params.reduce((url: string, param: any[]) => {
										const [key, value] = param;
										return url.replace(`[${key}]`, value);
									}, this._url)
									: this._url

		return `${this._baseUrl}${toUrl}`;
	}
}