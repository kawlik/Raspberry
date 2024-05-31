export function handleDashboard(
	devicesDashboard: Map<string, WebSocket>,
	devicesRaspberry: Map<string, WebSocket>,
	deviceName: string,
	request: Request,
): Response {
	const { socket, response } = Deno.upgradeWebSocket(request);

	socket.onclose = () => devicesDashboard.delete(deviceName);
	socket.onopen = () => devicesDashboard.set(deviceName, socket);

	socket.onmessage = (message) => {
		console.log(message.data);
	};

	return response;
}
