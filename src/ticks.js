const e10 = Math.sqrt(50);
const e5 = Math.sqrt(10);
const e2 = Math.sqrt(2);

export default function ticks(start, stop, count) {
	var reverse;
	var i = -1;
	var n;
	var ticks;
	var step;

	(stop = +stop), (start = +start), (count = +count);
	if (start === stop && count > 0) return [start];
	if ((reverse = stop < start)) (n = start), (start = stop), (stop = n);
	if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step))
		return [];

	if (step > 0) {
		start = Math.ceil(start / step);
		stop = Math.floor(stop / step);
		ticks = new Array((n = Math.ceil(stop - start + 1)));
		while (++i < n) ticks[i] = (start + i) * step;
	} else {
		start = Math.floor(start * step);
		stop = Math.ceil(stop * step);
		ticks = new Array((n = Math.ceil(start - stop + 1)));
		while (++i < n) ticks[i] = (start - i) / step;
	}

	if (reverse) ticks.reverse();

	return ticks;
}

function tickIncrement(start, stop, count) {
	var step = (stop - start) / Math.max(0, count);
	var power = Math.floor(Math.log(step) / Math.LN10);
	var error = step / Math.pow(10, power);

	return power >= 0
		? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) *
				Math.pow(10, power)
		: -Math.pow(10, -power) /
				(error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}