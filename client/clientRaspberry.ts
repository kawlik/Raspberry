import { type ActionData } from "./types/data.d.ts";
import { type StatusData } from "./types/data.d.ts";

const deviceName = "raspberry" + Date.now();
const deviceType = "raspberry";

/*   *   *   *   *   *   *   *   *   *   */

const targetURL = new URL("ws://localhost:8000");
targetURL.searchParams.set("deviceName", deviceName);
targetURL.searchParams.set("deviceType", deviceType);

const socket = new WebSocket(targetURL);
const state = new Map<string, unknown>([
	["cooling", false],
	["heating", false],
]);

/*   *   *   *   *   *   *   *   *   *   */

socket.onmessage = (message) => {
	const actionData = JSON.parse(message.data) as ActionData;

	if (actionData.targetDeviceName !== deviceName) return;
	if (actionData.targetDeviceType !== deviceType) return;

	if (!actionData?.action) return;

	if (Object.entries(actionData.action)) {
		Object.entries(actionData.action).forEach(([key, value]) => {
			if (state.has(key) && typeof state.get(key) === typeof value) {
				state.set(key, value);
			}
		});
	}
};

setInterval(() => {
	socket.send(JSON.stringify(
		<StatusData> {
			originDeviceName: deviceName,
			originDeviceType: deviceType,
			status: Object.fromEntries(state.entries()),
		},
	));
}, 1000);
