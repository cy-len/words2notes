<script lang="ts">
    import { naiveMod } from "../tools/words2notes/algorithms/naiveMod";
    import { naiveEnglishSolmization } from "../tools/words2notes/algorithms/englishSolmization";
    import { naiveGermanSolmization } from "../tools/words2notes/algorithms/germanSolmization";
    import { expandedSacher } from "../tools/words2notes/algorithms/expandedSacher";
    import { frenchSynesthesia } from "../tools/words2notes/algorithms/frenchSynesthesia";
    import type { TranscriptionAlgorithm } from "src/tools/words2notes/algorithms/algoTypes";
    import Transcription from "../components/transcription.svelte";

    let name = "";

    const transcriptions: TranscriptionAlgorithm[] = [
        naiveMod,
        naiveEnglishSolmization,
        naiveGermanSolmization,
        expandedSacher,
        frenchSynesthesia,
    ];
</script>

<div class="wrapper">
    <header>
        <input type="text" bind:value={name} />
    </header>
    
    <main class="result">
        {#each transcriptions as transcription}
            <Transcription algorithm={transcription} input={name} />
        {/each}
    </main>
</div>

<style>
    header {
        padding: 1rem 2rem;
        position: sticky;
        top: 0;
        z-index: 100;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.9);
    }

    input {
        display: block;
        margin: auto;
        font-size: 1.5rem;
        width: 100%;
        max-width: 800px;
    }
    
    main {
        background-color: rgba(0, 0, 0, 0.9);
        padding-block: 3rem;
    }
</style>