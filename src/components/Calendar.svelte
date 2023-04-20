<script lang="ts">
	import Calendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
    import EventEditor from './EventEditor.svelte';
    import { onMount } from 'svelte';

	// currently selected things from event-calendar
	let selDate: Object;
	let selEvent: Object;

	let eventEditor: EventEditor;
	let showEditor = false;

	function onEventClick(ev) {
		console.log(ev);
		
		if (selEvent != null) {
			// TODO: handle deslecting old event
		}
		
		selEvent = ev;

		// TODO: handle selecting event
		showEditor = true;
	}

	function onDateClick(date) {
		

		showEditor = true;
	}

	let plugins = [DayGrid];
	let options = {
		view: 'dayGridMonth',
		height: '100%',
		nowIndicator: true,
		displayEventEnd: false,
		dayMaxEvents: true,
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

<div id=calview class=container style="position:relative;">
	<Calendar {plugins} {options} />
	{#if (showEditor)}
		<EventEditor calEvent={selEvent} date={selDate}
			closeCallback={()=>showEditor=false}/>
	{/if}
</div>

<style>
	.container {
		height: 100%;
	}
</style>