<svelte:options accessors={true} />

<script lang='ts'>
    import { onMount } from "svelte";

    // other code to run when close button is clicked
    export let closeCallback;

    let self: HTMLElement;
    export let closed = false;

    export let calEvent;
    export let date;

    // window movement vars
    let dragging = false;
    export let winLeft;
    export let winRight;

    // event components
    let inTitle='';
    let inDate='';
    let inTime='';
    let inMemo='';

    onMount(()=>{
        // parse window props
        if(winLeft == null)
            winLeft = 0;
        if(winRight == null)
            winRight = 0;

        self.style.left = winLeft;
        self.style.top = winRight;

        self.parentElement.addEventListener('mouseup', onUp);
        self.parentElement.addEventListener('mousemove', onMove);

        // parse input event/dates
        if (calEvent != null) {

        }
        else if (date != null) {
            
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
            winRight += ev.movementY;
            self.style.left = `${winLeft}px`;
            self.style.top = `${winRight}px`;
        }
    }
    const close = ()=>{
        self.parentNode.removeChild(self);
        closed = true;
        closeCallback();
    }
</script>

<div class=container bind:this={self}>
    <div class=toolbar
        on:mousedown={onDown}>
        <div class=vertical-center id=title>
            Memo Editor
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class=vertical-center id=close-btn on:click={close}>
            X
        </div>
    </div>
    <div class=window-content>
        <div class=field>
            Title:
            <br>
            <input value={inTitle}>
        </div>
        <div class=field>
            Date:
            <br>
            <input value={inDate}>
        </div>
        <div class=field>
            Time:
            <br>
            <input value={inTime}>
        </div>
        <div class=field>
            Memo:
            <br>
            <textarea rows=15 cols=50 bind:value={inMemo}></textarea>
        </div>
        <div class=field id=btn-container>
            <button>Save</button>
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