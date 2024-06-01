import { type ActionData } from "../types/data";
import { type StatusData } from "../types/data";

import Board from "./board";
import Header from "./header";
import { createSignal } from "solid-js";

export default function () {
	// component logic
	const [online, setOnline] = createSignal(false);
	const [devices, setDevices] = createSignal<StatusData[]>([]);

	const safelist = new Set<string>();

	setInterval(() => {
		setDevices((prev) => prev.filter((device) => safelist.has(device.originDeviceName)));
		safelist.clear();
	}, 10_000);

	const deviceName = "dashboard" + Date.now();
	const deviceType = "dashboard";

	const targetURL = new URL("wss://careful-alpaca-54.deno.dev");
	targetURL.searchParams.set("deviceName", deviceName);
	targetURL.searchParams.set("deviceType", deviceType);

	const socket = new WebSocket(targetURL);

	socket.onclose = () => setOnline(false);
	socket.onopen = () => setOnline(true);

	socket.onmessage = (message) => {
		const statusData = JSON.parse(message.data) as StatusData;

		setDevices((prev) =>
			prev
				.filter((device) => device.originDeviceName !== statusData.originDeviceName)
				.concat(statusData)
				.sort((p, q) => (p.originDeviceName > q.originDeviceName ? +1 : -1))
		);

		safelist.add(statusData.originDeviceName);
	};

	const update = (
		deviceName: string,
		deviceType: string,
		action: {
			[key: string]: boolean;
		},
	) => socket.send(
		JSON.stringify({
			targetDeviceName: deviceName,
			targetDeviceType: deviceType,
			action,
		} as ActionData),
	);

	// component layout
	return (
		<>
			<Header online={online()} />
			<Board devices={devices()} update={update} />
		</>
	);
}
