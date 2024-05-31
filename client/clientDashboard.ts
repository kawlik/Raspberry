const deviceName = "dashboard" + Date.now();
const deviceType = "dashboard";

/*   *   *   *   *   *   *   *   *   *   */

const targetURL = new URL("ws://localhost:8000");
targetURL.searchParams.set("deviceName", deviceName);
targetURL.searchParams.set("deviceType", deviceType);

const socket = new WebSocket(targetURL);

/*   *   *   *   *   *   *   *   *   *   */

socket.onmessage = (message) => {
	console.log(message.data);
};
