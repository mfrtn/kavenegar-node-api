import "dotenv/config";
import { describe, expect, it } from "vitest";

import { KavenegarApi } from "./kavenegarApi";

const apiKey = process.env.KAVENEGAR_API_TOKEN;

const kavenegarApi = new KavenegarApi({
	apiKey: apiKey || 0,
});

describe("kavenegarApi", () => {
	it("test connection", async () => {
		const getDateResponse = await kavenegarApi.getDate();

		const date = new Date((getDateResponse.unixtime - 3.5 * 60 * 60) * 1000);

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
	}
});
