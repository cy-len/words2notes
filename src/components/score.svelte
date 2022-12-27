<script lang="ts">
    import type { Note } from "../tools/words2notes/notesSet/note";

    export let notes: Note[] = [];

    function lineNumber(n: Note) {
        return ((n.indexInDiatonicScale < 5 ? n.indexInDiatonicScale : n.indexInDiatonicScale - 7) + 2) * 0.5;
    }

    function alterationSymbol(n: Note) {
        if (n.alteration == 0.5) return "#";
        if (n.alteration == -0.5) return "b";
        if (n.alteration == 0.25) return "½#";
        if (n.alteration == -0.25) return "½b";
        if (n.alteration == 0.75) return "#½#";
        if (n.alteration == -0.75) return "b½b";

        return "";
    }
</script>

<div class="wrapper">
    <div class="lines">
        <div class="line" style="--line-number: 1"></div>
        <div class="line" style="--line-number: 2"></div>
        <div class="line" style="--line-number: 3"></div>
        <div class="line" style="--line-number: 4"></div>
        <div class="line" style="--line-number: 5"></div>
    </div>
    <div class="notes">
        {#each notes as note, i}
            {#if note.isSilence}
                <div class="silence" style="--note-position-x: {i}"></div>
            {:else}
                <div class="note" style="--line-number: {lineNumber(note)}; --note-position-x: {i}">
                    <div class="alteration">{alterationSymbol(note)}</div>
                    <div class="head"></div>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>
    .wrapper {
        position: relative;
        width: 100%;
        height: 7rem;
        overflow-x: auto;
        background-color: white;

        --line-height: 1rem;
        --note-width: 3rem;
    }

    .line {
        position: absolute;
        width: 100%;
        border-top: 1px solid rgba(0, 0, 0, 0.9);
        top: calc(var(--line-number, 1) * var(--line-height));
    }

    .note, .silence {
        position: absolute;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        transform: translateY(50%);
        /* Lowest note is F */
        top: calc(calc(var(--line-number, 1.5) * var(--line-height) * -1) + 3.5rem);
        left: calc(var(--note-position-x, 0) * var(--note-width));

        animation: appear 0.5s ease-out;
    }

    .note .alteration {
        height: 1rem;
        margin-right: 0.25rem;
        font-size: 1.5rem;
        margin-top: -0.7rem;
        font-weight: bold;
    }

    .note .head {
        width: 1.1rem;
        height: calc(1rem - 2px);
        border: 1px solid black;
        border-radius: 50%;
    }

    .silence {
        width: 1rem;
        height: 3rem;
        background: black;

        top: 0;
    }

    @keyframes appear {
        0% {
            transform: translate(-50%, 50%);
            opacity: 0;
        }
        100% {
            transform: translate(0, 50%);
            opacity: 1;
        }
    }
</style>