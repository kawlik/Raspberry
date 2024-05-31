export function handleRaspberry(
	devicesDashboard: Map<string, WebSocket>,
	devicesRaspberry: Map<string, WebSocket>,
	deviceName: string,
	request: Request,
): Response {
	const { socket, response } = Deno.upgradeWebSocket(request);

	socket.onclose = () => devicesRaspberry.delete(deviceName);
	socket.onopen = () => devicesRaspberry.set(deviceName, socket);

	socket.onmessage = (message) => {
		console.log(message.data);
	};

	return response;
}
