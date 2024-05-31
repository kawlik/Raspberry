export function handleDashboard(
	devicesDashboard: Map<string, WebSocket>,
	devicesRaspberry: Map<string, WebSocket>,
	deviceName: string,
	request: Request,
): Response {
	const { socket, response } = Deno.upgradeWebSocket(request);

	return response;
}
