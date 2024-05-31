import { handleDashboard } from "./server/handleDashboard.ts";
import { handleRaspberry } from "./server/handleRaspberry.ts";

const devicesDashboard = new Map<string, WebSocket>();
const devicesRaspberry = new Map<string, WebSocket>();

Deno.serve((request) => {
	if (request.headers.get("upgrade") !== "websocket") {
		return new Response(null, {
			statusText: "Server supports WebSocket only.",
			status: 418,
		});
	}

	/*   *   *   *   *   *   *   *   */

	const requestURL = new URL(request.url);
	const deviceName = requestURL.searchParams.get("deviceName");
	const deviceType = requestURL.searchParams.get("deviceType");

	if (deviceName && deviceType === "dashboard") {
		return handleDashboard(devicesDashboard, devicesRaspberry, deviceName, request);
	}

	if (deviceName && deviceType === "raspberry") {
		return handleRaspberry(devicesDashboard, devicesRaspberry, deviceName, request);
	}

	return new Response(null, {
		statusText: "The request data is invalid.",
		status: 406,
	});
});
