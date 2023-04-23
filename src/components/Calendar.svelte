<script lang="ts">
	import EventCalendar from '@event-calendar/core';
	import DayGrid from '@event-calendar/day-grid';
    import EventEditor from './MemoEditor.svelte';
    import { onMount } from 'svelte';

	import MemoStore from '../stores/MemoStore';
    import { get } from 'svelte/store';
    import { memoToEvent } from '../Conversions';

	let evCal: EventCalendar;

	// currently selected things from event-calendar
	let selDate: Object;
	let selEvent: Object;

	let showEditor = false;

	onMount(()=>{
		MemoStore.subscribe(onMemoUpdate);
	})

	function onMemoUpdate(memos) {
		evCal.refetchEvents();
	}

	function onEventClick(ev) {
		console.log(ev.event);
		selEvent = ev.event;
		showEditor = true;
	}

	function onDateClick(date) {
		console.log(date);
		showEditor = true;
	}

	function onEditorClose() {
		showEditor = false;
	}

	function onEditorSave() {
		onEditorClose();
	}

	let plugins = [DayGrid];
	let options = {
		view: 'dayGridMonth',
		height: '100%',
		nowIndicator: true,
		displayEventEnd: false,
		dayMaxEvents: true,
		eventSources: [{
			events: function() {
				console.log("refreshing calendar events...")
				let evs = [];
				let memos: Object = get(MemoStore);

				// convert memos into Calendar Events
				for (let k in memos) {
					let ev = memoToEvent(k, memos[k]);
					evs.push(ev);
				}

				return evs;
			}
		}],
		eventClick: onEventClick,
		dateClick: onDateClick,
	}
</script>

<div id=calview class=container style="position:relative;">
	<EventCalendar bind:this={evCal} {plugins} {options} />
	{#if (showEditor)}
		<EventEditor event={selEvent} createDate={selDate}
			closeCallback={onEditorClose}
			saveCallback={onEditorSave}/>
	{/if}
</div>

<style>
	.container {
		height: 100%;
	}
</style>