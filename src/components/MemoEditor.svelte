<svelte:options accessors={true} />

<script lang='ts'>
    import { onMount } from "svelte";
    import { eventToMemo } from "../Conversions";
    import MemoStore from "../stores/MemoStore";

    /// PROPS ///
    // runs when close button is clicked
    export let closeCallback;
    // runs when save button is clicked
    export let saveCallback;
    // given calendar event to edit
    export let event;
    // given date to create a calendar event
    export let createDate;

    let self: HTMLElement;

    // window movement vars
    let dragging = false;
    export let winLeft;
    export let winTop;

    // event components
    let cNotes='';
    let cDate='';
    let cTime='';

    function getFormattedDate(event) {
        const date = event.start;
        return date.toLocaleDateString();
    }

    function getFormattedTime(event) {
        let date = event.start;
        // return `${date.getHours()}:${date.getMinutes()}`;
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
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

        if (event != null) {
            // TODO: editing a memo
            cDate = getFormattedDate(event);
            cTime = getFormattedTime(event);
            cNotes = event.title;
        }
        else if (createDate != null) {
            // TODO: creating an event
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
        event.title = cNotes;
        let m = eventToMemo(event);
        MemoStore.set(event.id, m);
        saveCallback();
    }
</script>

<div class=container bind:this={self}>
    <div class=toolbar
        on:mousedown={onDown}>
        <div class=vertical-center id=title>
            Memo Editor
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
                Time:
                <br>
                <input value={cTime}>
            </div>
            <div class=field>
                Date:
                <br>
                <input value={cDate}>
            </div>
        </div>
        <div class=field id=btn-container>
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
    }

    #btn-container {
        text-align: right;
    }
</style>