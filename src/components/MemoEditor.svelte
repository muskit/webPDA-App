<svelte:options accessors={true} />

<script lang='ts'>
    import { onMount } from "svelte";
    import { eventToMemo } from "../Conversions";

    import MemoStore from "../stores/MemoStore";
    import { DateInput, DatePicker } from 'date-picker-svelte';

    /// PROPS ///
    // runs when close button is clicked
    export let closeCallback;
    // runs when save button is clicked
    export let saveCallback;
    // given calendar event to edit
    export let editEvent;
    // given date to create a memo
    export let createDate;

    let self: HTMLElement;

    // set depending on editing or creating
    let isEdit = false;

    // window movement vars
    let dragging = false;
    export let winLeft;
    export let winTop;

    // event components
    let cNotes='';
    let cTimeHr='';
    let cTimeMin='';

    // the memo we're making/modifying
    let memo: Object;
    let date: Date;

    function getFormattedTime(date: Date) {
        // return `${date.getHours()}:${date.getMinutes()}`;
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    // Create memo object from current vars
    function createMemo() {
        let id;
        if (editEvent != null) {
            id = editEvent.id;
        } else {
            id = crypto.randomUUID();
        }
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let timeH = cTimeHr;
        let timeM = cTimeMin;
        return {
            id,
            notes: cNotes,
            year, month, day,
            timeH, timeM
        }
    }

    // Delete the memo object from localStorage
    function deleteMemo() {
        if (memo != null) {
            MemoStore.remove(memo.id);
        }
    }

    onMount(()=>{
        // parse window props
        if(winLeft == null)
            winLeft = 0;
        if(winTop == null)
            winTop = 0;

        self.style.left = winLeft;
        self.style.top = winTop;

        self.getRootNode().addEventListener('mouseup', onUp);
        self.getRootNode().addEventListener('mousemove', onMove);

        isEdit = false;
        if (editEvent != null) {
            isEdit = true;
            date = editEvent.start;
            memo = eventToMemo(editEvent);
            cTimeHr = memo.timeH;
            cTimeMin = memo.timeM;
            cNotes = memo.notes;
        }
        else if (createDate != null) {
            // TODO: creating a memo
            date = createDate;
            memo = {};
        }
    })

    // window movement functions
    const onDown = ()=>{
        dragging=true;
    }
    const onUp = ()=>dragging=false;
    const onMove = (ev)=> {
        if (dragging) {
            winLeft += ev.movementX;
            winTop = Math.max(0, winTop+ev.movementY);
            self.style.left = `${winLeft}px`;
            self.style.top = `${winTop}px`;
        }
    }
    function closeBtn() {
        closeCallback();
    }

    function saveBtn() {
        let m = createMemo();
        console.log(m);
        MemoStore.set(m.id, m);
        closeBtn();
        saveCallback();
    }

    function delBtn() {
        deleteMemo();
        closeBtn();
    }
</script>

<div class=container bind:this={self}>
    <div class=toolbar
        on:mousedown={onDown}>
        <div class=vertical-center id=title>
            {isEdit ? "Editing Event" : "Creating Event"}
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class=vertical-center id=close-btn on:click={closeBtn}>
            X
        </div>
    </div>
    <div class=window-content>
        <div class=field>
            Notes:
            <br>
            <textarea rows=15 cols=50 bind:value={cNotes}></textarea>
        </div>
        <div style="display: flex; flex-direction: row">
            <div class=field>
                Date:
                <br>
                <DateInput max={new Date(2099, 11, 31)} bind:value={date} format="MM/dd/yyyy" />
            </div>
            <div class=field>
                Time (24h):
                <br>
                <input bind:value={cTimeHr} size=1>
                :
                <input bind:value={cTimeMin} size=1>
            </div>
        </div>
        <div class=field id=btn-container>
            {#if (isEdit)}
            <button on:click={delBtn}>Delete</button>
            {/if}
            <button on:click={saveBtn}>Save</button>
        </div>
    </div>
</div>

<style>
    .container {
        position: absolute;
        min-width: 300px;
        min-height: 300px;

        background-color: #eee;
        z-index: 99;

        display: flex;
        flex-direction: column;
    }

    .toolbar {
        height: 36px;
        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: #ddd;
        user-select: none;
    }

    .toolbar #title {
        flex: 1;
        line-height: 100%;
        text-align: center;
        padding-left: 20%;
        padding-right: 20%;
    }

    .toolbar #close-btn {
        background-color: red;
        aspect-ratio: 1;
        cursor: default;
    }

    .vertical-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .window-content {
        flex: 1;
        padding: 12px;
        text-align: left;
    }

    .field:not(:last-child) {
        margin-bottom: 20px;
        width: 50%;
    }

    #btn-container {
        text-align: right;
    }
</style>