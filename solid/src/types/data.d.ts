export interface ActionData {
	targetDeviceName: string;
	targetDeviceType: string;
	action: {
		[key: string]: unknown;
	};
}

export interface StatusData {
	originDeviceName: string;
	originDeviceType: string;
	status: {
		[key: string]: unknown;
	};
}
