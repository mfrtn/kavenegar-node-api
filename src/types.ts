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

export type ReceiveParams = {
	linenumber: string;
	isread: 1 | 0;
};

export type CountInboxParams = {
	startdate: number;
	enddate?: number;
	linenumber: string;
	isread: 1 | 0;
};

export type VerifyLookupParams = {
	receptor: string;
	token: string;
	token2?: string;
	token3?: string;
	template: string;
	type?: "sms" | "call";
};

export type CallMakeTTSParams = {
	receptor: string;
	message: string;
	date?: number;
	localid?: number;
	// repeat?: number;
};

export type AccountConfigs = {
	apilogs?: "justfaults" | "enabled" | "disabled";
	dailyreport?: "enabled" | "disabled";
	debugmode?: "enabled" | "disabled";
	defaultsender?: string;
	mincreditalarm?: number;
	resendfailed?: "enable" | "disabled";
};

export type RequestParams =
	| SendParams
	| SendArrayParams
	| MessageIdParams
	| StatusByLocalIdParams
	| SelectOutboxParams
	| LatestOutboxParams
	| CountOutboxParams
	| ReceiveParams
	| CountInboxParams
	| VerifyLookupParams
	| CallMakeTTSParams
	| AccountConfigs;

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

export type StatusByLocalIdResponse = {
	messageid: number;
	localid: number;
	status: number;
	statustext: string;
};

export type CountOutboxResponse = {
	startdate: number;
	enddate: number;
	sumpart: number;
	sumcount: number;
	cost: number;
};

export type ReceiveResponse = {
	messageid: number;
	message: string;
	sender: string;
	receptor: string;
	date: number;
};

export type CountInboxResponse = {
	startdate: number;
	enddate: number;
	sumcount: number;
};

export type AccountInfoResponse = {
	remaincredit: number;
	expiredate: number;
	type: "Child" | "Master";
};
