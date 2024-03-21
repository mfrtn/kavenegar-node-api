export type KavenegarConfigs = {
	apiKey: string | 0;
};

export type KavenegarApiOptions = {
	host?: string;
	version?: string;
} & KavenegarConfigs;

export type ResponseResult<T> = {
	entries: T;
	return: { status: number; message: string };
};
export type RequestParams = {
	[key: string]: any;
};

export type SendParams = {
	receptor: string;
	message: string;
	sender?: string;
	date?: Date;
	type?: "0" | "1" | "2" | "3";
	localid?: string;
	hide?: 1;
};

export type SendArrayParams = {
	receptor: string[];
	message: string[];
	sender: string[];
	date?: Date;
	type?: number[];
	localmessageids?: number[];
	hide?: 1;
};

export type StatusParams = {
	messageid: number | number[];
};

export type MessageResponse = {
	messageid: number;
	message: number;
	status: number;
	statustext: string;
	sender: string;
	receptor: string;
	date: number;
	cost: number;
};

export type StatusResponse = {
	messageid: number;
	status: number;
	statustext: string;
};
