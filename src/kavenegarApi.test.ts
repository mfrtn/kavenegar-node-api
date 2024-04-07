import "dotenv/config";
import { describe, expect, it } from "vitest";

import { KavenegarApi } from "./kavenegarApi";

const apiKey = process.env.KAVENEGAR_API_TOKEN;
const timezoneOffset = parseFloat(process.env.TIMEZONE_OFFSET || "0");

const kavenegarApi = new KavenegarApi({
	apiKey: apiKey || 0,
});

describe("kavenegarApi", () => {
	it("test connection", async () => {
		const getDateResponse = await kavenegarApi.getDate();

		const date = new Date(
			(getDateResponse.unixtime + timezoneOffset * 60 * 60) * 1000
		);

		expect(getDateResponse.year).toBe(date.getFullYear());
		expect(getDateResponse.month).toBe(date.getMonth() + 1);
		expect(getDateResponse.day).toBe(date.getDate());
		expect(getDateResponse.hour).toBe(date.getHours());
	});

	if (apiKey && apiKey.length > 0) {
		it("test send message", async () => {
			const message = "salam";
			const receptor = "09300000000";
			const messages = await kavenegarApi.send({
				message,
				receptor,
			});

			expect(messages[0]?.message).toBe(message);
			expect(messages[0]?.receptor).toBe(receptor);
		});

		it("test send message to multiple receptors", async () => {
			const message = "salam";
			const receptor = ["09300000000", "09123004001"];
			const messages = await kavenegarApi.send({
				message,
				receptor,
			});

			expect(messages[0]?.message).toBe(message);
			expect(messages[0]?.receptor).toBe(receptor[0]);
			expect(messages[1]?.message).toBe(message);
			expect(messages[1]?.receptor).toBe(receptor[1]);
		});

		it("test count outbox", async () => {
			const now = new Date();
			const startdate = Math.floor((now.getTime() - 10000) / 1000);
			const result = await kavenegarApi.countOutbox({
				startdate: startdate,
			});
			expect(result[0]?.startdate).toBe(startdate);
		});

		it("test cancel", async () => {
			const now = new Date();
			const sendDate = Math.floor((now.getTime() + 100000) / 1000);

			const message = "salam";
			const receptor = "09300000000";
			const messages = await kavenegarApi.send({
				message,
				receptor,
				date: sendDate,
			});

			expect(messages[0]?.message).toBe(message);
			expect(messages[0]?.receptor).toBe(receptor);

			const cancelRequest = await kavenegarApi.cancel({
				messageid: messages.map((message) => message.messageid),
			});

			expect(cancelRequest[0]?.status).toBe(13);
			expect(cancelRequest[0]?.messageid).toBe(messages[0]?.messageid);
			expect(cancelRequest[0]?.statustext).toBe("لغو شده");
		});

		it("test receive", async () => {
			const receiveRequest = await kavenegarApi.receive({
				linenumber: "10007700044000",
				isread: 1,
			});

			expect(receiveRequest[0]?.messageid).toBe(797866275);
			expect(receiveRequest[0]?.message).toBe("تست");
		});

		it("test account info", async () => {
			const accountInfo = await kavenegarApi.accountInfo();

			expect(accountInfo.type).toBe("Master");
			expect(accountInfo.expiredate).toBeTypeOf("number");
			expect(accountInfo.remaincredit).toBeTypeOf("number");
		});

		it("test account configs", async () => {
			const debugmode = "enabled";
			const accountConfigs = await kavenegarApi.accountConfig({
				debugmode,
			});

			expect(accountConfigs.debugmode).toBe(debugmode);
			expect(accountConfigs.dailyreport).toBe("disabled");
		});
	}
});
