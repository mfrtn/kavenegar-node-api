import { request as httpsRequest, RequestOptions } from "https";
import { stringify } from "querystring";

import {
	KavenegarApiOptions,
	KavenegarConfigs,
	RequestParams,
	SendParams,
	MessageResponse,
	SendArrayParams,
	StatusResponse,
	ResponseResult,
	StatusByLocalIdResponse,
	MessageIdParams,
	StatusByLocalIdParams,
	SelectOutboxParams,
	GetDateResponse,
	LatestOutboxParams,
	CountOutboxParams,
	CountOutboxResponse,
	ReceiveParams,
	ReceiveResponse,
	CountInboxParams,
	VerifyLookupParams,
	AccountInfoResponse,
	CallMakeTTSParams,
	AccountConfigs,
} from "./types";

export class KavenegarApi {
	private readonly options: KavenegarApiOptions;

	constructor({ apiKey }: KavenegarConfigs) {
		this.options = {
			host: "api.kavenegar.com",
			version: "v1",
			apiKey,
		};
	}

	private request<T>(
		action: string,
		method: string,
		params?: RequestParams
	): Promise<T> {
		return new Promise((resolve, reject) => {
			const path = `/${this.options.version}/${this.options.apiKey}/${action}/${method}.json`;

			const postData = stringify(params);
			const postRequestOptions: RequestOptions = {
				host: this.options.host,
				port: "443",
				path: path,
				method: "POST",
				headers: {
					"Content-Length": Buffer.byteLength(postData),
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			};

			const req = httpsRequest(postRequestOptions, (res) => {
				res.setEncoding("utf8");
				let result = "";
				res.on("data", (data) => {
					result += data;
				});

				res.on("end", () => {
					try {
						const jsonObject: ResponseResult<T> = JSON.parse(result);
						if (
							res.statusCode &&
							res.statusCode >= 200 &&
							res.statusCode < 300
						) {
							resolve(jsonObject.entries);
						} else {
							reject({
								message: jsonObject.return.message,
								status: jsonObject.return.status,
							});
						}
					} catch (e: unknown) {
						if (e instanceof Error) {
							reject({
								message: e.message,
								status: 500,
								description: "Exception occurred",
							});
						} else {
							reject({
								message: "Unknown error occurred",
								status: 500,
								description: "Exception occurred",
							});
						}
					}
				});
			});

			req.write(postData, "utf8");

			req.on("error", (e) => {
				reject({
					error: e.message,
					status: 500,
					description: "Error occurred",
				});
			});

			req.end();
		});
	}

	async getDate(): Promise<GetDateResponse> {
		return await this.request<GetDateResponse>("utils", "getdate");
	}

	async send(data: SendParams): Promise<MessageResponse[]> {
		return await this.request<MessageResponse[]>("sms", "send", data);
	}

	async sendArray(data: SendArrayParams): Promise<MessageResponse[]> {
		return await this.request<MessageResponse[]>("sms", "sendarray", data);
	}

	async status(data: MessageIdParams): Promise<StatusResponse[]> {
		return await this.request<StatusResponse[]>("sms", "status", data);
	}

	async statusLocalMessageId(
		data: StatusByLocalIdParams
	): Promise<StatusByLocalIdResponse[]> {
		return await this.request<StatusByLocalIdResponse[]>(
			"sms",
			"statuslocalmessageid",
			data
		);
	}

	async select(data: MessageIdParams): Promise<MessageResponse[]> {
		return await this.request<MessageResponse[]>("sms", "select", data);
	}

	async selectOutbox(data: SelectOutboxParams): Promise<MessageResponse[]> {
		return await this.request<MessageResponse[]>("sms", "selectoutbox", data);
	}

	async latestOutbox(data: LatestOutboxParams): Promise<MessageResponse[]> {
		return await this.request<MessageResponse[]>("sms", "latestoutbox", data);
	}

	async countOutbox(data: CountOutboxParams): Promise<CountOutboxResponse[]> {
		return await this.request<CountOutboxResponse[]>(
			"sms",
			"countoutbox",
			data
		);
	}

	async cancel(data: MessageIdParams): Promise<StatusResponse[]> {
		return await this.request<StatusResponse[]>("sms", "cancel", data);
	}

	async receive(data: ReceiveParams): Promise<ReceiveResponse[]> {
		return await this.request<ReceiveResponse[]>("sms", "receive", data);
	}

	async countInbox(data: CountInboxParams): Promise<CountOutboxResponse[]> {
		return await this.request<CountOutboxResponse[]>("sms", "countinbox", data);
	}

	async verifyLookup(data: VerifyLookupParams): Promise<MessageResponse> {
		return await this.request<MessageResponse>("verify", "lookup", data);
	}

	async accountInfo(): Promise<AccountInfoResponse> {
		return await this.request<AccountInfoResponse>("account", "info");
	}

	async accountConfig(
		data?: AccountConfigs
	): Promise<Required<AccountConfigs>> {
		return await this.request<Required<AccountConfigs>>(
			"account",
			"config",
			data
		);
	}

	async callMakeTTS(data: CallMakeTTSParams): Promise<MessageResponse> {
		return await this.request<MessageResponse>("call", "maketts", data);
	}
}
