<script lang="ts">
  import Calendar from './components/Calendar.svelte';
  import Header from './components/Header.svelte';
  
</script>

<div class=container>
  <Header />
  <div class=calendar-container>
    <Calendar />
  </div>
</div>

<style>
  .container {
    /* background-color: blue; */
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .calendar-container {
    /* background-color: green; */
    flex: 1;
    padding-top: 1rem;
    padding-left: 2rem;
    padding-right: 2rem;
    padding-bottom: 2rem;
  }
</style>
