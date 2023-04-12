<script lang="ts">
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
	

	function onEventClick(info) {
		console.log(info);
	}

	function onDateClick(info) {
		console.log(info)
	}

	let plugins = [DayGrid];
	let options = {
		view: 'dayGridMonth',
		height: '100%',
		events: [
			{
				"title": "Test Event",
				"start": "2023-04-11 20:00:00",
				"end": "2023-04-11 22:00:00",
			},
			{
				"title": "Test Event",
				"start": "2023-04-11 20:00:00",
				"end": "2023-04-11 22:00:00",
			},
			{
				"title": "Test Event",
				"start": "2023-04-11 20:00:00",
				"end": "2023-04-11 22:00:00",
			},
			{
				"title": "Test Event",
				"start": "2023-04-11 20:00:00",
				"end": "2023-04-11 22:00:00",
			}
		],
		eventClick: onEventClick,
		dateClick: onDateClick,
	}
</script>

<Calendar {plugins} {options} />

<style>

</style>