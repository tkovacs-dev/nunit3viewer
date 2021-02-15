<script>
    import CloseableBox from "./closable-box.svelte";
    import { findFirstChild } from "./parsing.js";

    export let test;

    $: output = findFirstChild(test, "output")?._text;
</script>

{#if output}
    <CloseableBox>
        <span slot="header">Output</span>
        <div slot="content">
            <pre>
            {output}
        </pre>
        </div>
    </CloseableBox>
{/if}

<style>
    pre {
        overflow-x: scroll;
    }
</style>
