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

/************ Request Params Types ************/
export type RequestParams = {
	[key: string]: any;
};

export type SendParams = {
	receptor: string;
	message: string;
	sender?: string;
	date?: number;
	type?: number[];
	localid?: number;
	hide?: 1;
};

export type SendArrayParams = {
	receptor: string[];
	message: string[];
	sender: string[];
	date?: number;
	type?: number[];
	localmessageids?: number[];
	hide?: 1;
};

export type MessageIdParams = {
	messageid: number | number[];
};

export type StatusByLocalIdParams = {
	localid: number | number[];
};

export type SelectOutboxParams = {
	startdate: number;
	enddate?: number;
	sender?: string;
};

export type LatestOutboxParams = {
	pagesize: number;
	sender: string;
};

export type CountOutboxParams = {
	startdate: number;
	enddate?: number;
	status?: number;
};

/************ Responses Params Types ************/
export type GetDateResponse = {
	datetime: string;
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	second: number;
	unixtime: number;
};

export type MessageResponse = {
	messageid: number;
	message: string;
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

export type StatusByLocalIdResponse = StatusResponse & {
	localid: number;
};

export type CountOutboxResponse = {
	startdate: number;
	enddate: number;
	sumpart: number;
	sumcount: number;
	cost: number;
};
