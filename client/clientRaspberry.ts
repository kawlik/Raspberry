const deviceName = "raspberry" + Date.now();
const deviceType = "raspberry";

/*   *   *   *   *   *   *   *   *   *   */

const targetURL = new URL("ws://localhost:8000");
targetURL.searchParams.set("deviceName", deviceName);
targetURL.searchParams.set("deviceType", deviceType);

const socket = new WebSocket(targetURL);

/*   *   *   *   *   *   *   *   *   *   */

setInterval(() => socket.send("A message from " + deviceName), 5_000);

socket.onmessage = (message) => {
	console.log(message.data);
};
