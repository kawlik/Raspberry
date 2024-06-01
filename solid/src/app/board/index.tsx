import { For } from "solid-js";
import { type StatusData } from "../../types/data";

export default function (props: {
	devices: StatusData[];
	update: (
		deviceName: string,
		deviceType: string,
		action: {
			[key: string]: boolean;
		},
	) => void;
}) {
	// component logic

	// component layout
	return (
		<main class="container flex flex-col gap-4 mx-auto p-8 pt-4">
			<div class="divider">list available devices</div>
			<For each={props.devices}>
				{(device) => (
					<div class="card md:card-side bg-base-100 shadow-xl p-4">
						<figure class="object-contain w-32 mx-auto">
							<img src="raspberry-pi.png" alt="Raspberry Pi" />
						</figure>
						<div class="card-body">
							<h2 class="text-xl flex flex-wrap gap-2">
								<span class="font-thin">{device.originDeviceType}</span>•
								<span class="font-bold">{device.originDeviceName}</span>
							</h2>
							<div class="divider">controls</div>
							<For
								each={Object.entries(device.status).filter(
									([_, value]) => typeof value === "boolean",
								)}
							>
								{([key, value]) => (
									<label class="flex flex-nowrap gap-2 items-center">
										<input
											class="toggle"
											type="checkbox"
											checked={!!value}
											onChange={(change) =>
												props.update(
													device.originDeviceName,
													device.originDeviceType,
													{
														[key]: change.target.checked,
													},
												)}
										/>
										<span class="capitalize text-xl">{key}</span>
									</label>
								)}
							</For>
							<div class="divider">readonly</div>
							<For
								each={Object.entries(device.status).filter(
									([_, value]) => typeof value !== "boolean",
								)}
							>
								{([key, value]) => (
									<label class="flex flex-nowrap gap-2 items-center">
										<span class="capitalize text-xl w-32">{key}</span>¦
										<span class="capitalize text-xl">{String(value)}</span>
									</label>
								)}
							</For>
						</div>
					</div>
				)}
			</For>
		</main>
	);
}
