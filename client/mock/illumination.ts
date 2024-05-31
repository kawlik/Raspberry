let illumination = 0.5;
let direction = -0.1;

export function getIlluminationLevel(): number {
	if (illumination < 0.1) direction = +0.1;
	if (illumination > 0.9) direction = -0.1;

	return illumination = illumination + direction * Math.random();
}
