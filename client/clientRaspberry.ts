import { getIlluminationLevel } from "./mock/illumination.ts";
import { getTemperatureLevel } from "./mock/temperature.ts";

const deviceName = "raspberry" + Date.now();
const deviceType = "raspberry";

/*   *   *   *   *   *   *   *   *   *   */

const targetURL = new URL("ws://localhost:8000");
targetURL.searchParams.set("deviceName", deviceName);
targetURL.searchParams.set("deviceType", deviceType);

const socket = new WebSocket(targetURL);

/*   *   *   *   *   *   *   *   *   *   */

setInterval(() =>
	socket.send(JSON.stringify({
		from: deviceName,
		type: "illumination",
		value: getIlluminationLevel(),
	})), 10_000);

setInterval(() =>
	socket.send(JSON.stringify({
		from: deviceName,
		type: "temperature",
		value: getTemperatureLevel(),
	})), 10_000);
