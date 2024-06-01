import { type ActionData } from "./types/data.d.ts";
import { type StatusData } from "./types/data.d.ts";

const deviceName = "dashboard" + Date.now();
const deviceType = "dashboard";

/*   *   *   *   *   *   *   *   *   *   */

const targetURL = new URL("wss://careful-alpaca-54.deno.dev");
targetURL.searchParams.set("deviceName", deviceName);
targetURL.searchParams.set("deviceType", deviceType);

const socket = new WebSocket(targetURL);

/*   *   *   *   *   *   *   *   *   *   */

socket.onmessage = (message) => {
	const statusData = JSON.parse(message.data) as StatusData;
	const actionData = <ActionData> {
		targetDeviceName: statusData.originDeviceName,
		targetDeviceType: statusData.originDeviceType,
		action: {
			"cooling": !Math.round(Math.random()),
			"heating": !Math.round(Math.random()),
		},
	};

	socket.send(JSON.stringify(actionData));

	console.log(statusData, actionData);
};
