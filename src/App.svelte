<script lang="ts">
  import Calendar from '@event-calendar/core';
  import DayGrid from '@event-calendar/day-grid'
    import Header from './components/Header.svelte';

  let plugins = [DayGrid];
  let options = {
    view: 'dayGridMonth'
  }
</script>

<Header />
<div class=calendar-container>
  <Calendar {plugins} {options}/>
</div>

<style>
  .calendar-container {
    padding-left: 2rem;
    padding-right: 2rem;
    min-height: 100vh;
    /* background-color: blue; */
  }
</style>
