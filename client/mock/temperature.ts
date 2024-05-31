let temperature = 20;
let direction = -1;

export function getTemperatureLevel(): number {
	if (temperature < -20) direction = +1;
	if (temperature > +30) direction = -1;

	return temperature = temperature + direction * Math.random();
}
