<script lang="ts">
    import { words2Notes } from "../tools/words2notes";
    import { ScaleType, type TranscriptionAlgorithm } from "../tools/words2notes/algorithms/algoTypes";
    import Score from "./score.svelte";

    export let algorithm: TranscriptionAlgorithm;
    export let input: string;

    $: notesWithDiatonic = words2Notes(input, algorithm.algorithm, ScaleType.DIATONIC);
    $: notesWithChromatic = words2Notes(input, algorithm.algorithm, ScaleType.CHROMATIC);
    $: notesWithMicrotonal = words2Notes(input, algorithm.algorithm, ScaleType.MICROTONAL);
</script>

<div class="wrapper">
    <h2>{ algorithm.name }</h2>
    
    {#if algorithm.scaleCompatibility[ScaleType.DIATONIC]}
        <div class="scale-group">
            <h3>Diatonic scale</h3>
            <p>
                {#each notesWithDiatonic as note}
                    <span>{ note.name } </span>
                {/each}
            </p>

            <Score notes={notesWithDiatonic} />
        </div>
    {/if}

    {#if algorithm.scaleCompatibility[ScaleType.CHROMATIC]}
        <div class="scale-group">
            <h3>Chromatic scale</h3>
            <p>
                {#each notesWithChromatic as note}
                <span>{ note.name } </span>
                {/each}
            </p>

            <Score notes={notesWithChromatic} />
        </div>
    {/if}

    {#if algorithm.scaleCompatibility[ScaleType.MICROTONAL]}
        <div class="scale-group">
            <h3>Microtonal scale</h3>
            <p>
                {#each notesWithMicrotonal as note}
                <span>{ note.name } </span>
                {/each}
            </p>

            <Score notes={notesWithMicrotonal} />
        </div>
    {/if}
</div>

<style>
    .wrapper {
        margin: 2rem;
        padding: 2rem;
        background: rgb(235, 235, 235);
        border-radius: 3rem;

        box-shadow: 0.5rem 1rem 1rem rgba(255, 255, 255, 0.2);
    }

    h2 {
        margin: 0;
    }
</style>