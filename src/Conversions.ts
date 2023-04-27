export function memoToEvent(id, memo) {
	let start = memoToDate(memo);
	let end = new Date(start.valueOf() + 3600000);

	return {
		id: id,
		allDay: (memo.timeH == -1),
		start: start,
		end: end,
		title: memo.notes,	
	}
}

export function eventToMemo(event) {
	let dt: Date = event.start;
	
	let id = event.id;
	let notes = event.title;
	let year = dt.getFullYear();
	let month = dt.getMonth();
	let day = dt.getDate();
	console.log(`${year}/${month}/${day}`)
	let timeH = dt.getHours();
	let timeM = dt.getMinutes();

	if (!event.allDay) {
		// set time
	}

	return {
		id,
		notes,
		year, month, day,
		timeH, timeM
	}
}

export function memoToDate(memo) {
	return new Date(memo.year, memo.month, memo.day,
		memo.timeH, memo.timeM)
}