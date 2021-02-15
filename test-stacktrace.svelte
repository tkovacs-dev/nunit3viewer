<script>
    import CloseableBox from "./closable-box.svelte";
    import { findFirstChild } from "./parsing.js";

    export let test;

    $: failureStackTrace = findFirstChild(
        findFirstChild(test, "failure"),
        "stack-trace"
    )?._text;
    $: failureMessage = findFirstChild(
        findFirstChild(test, "failure"),
        "message"
    )?._text;

    function toClipboard(text) {
        navigator.clipboard.writeText(text);
    }
</script>

{#if failureStackTrace || failureMessage}
    <CloseableBox>
        <span slot="header">Failure</span>
        <div slot="content">
            {#if failureMessage}
                <pre>
                    {failureMessage}
                </pre>
            {/if}
            {#if failureStackTrace}
                <pre>
                    {failureStackTrace}
                </pre>
                <button on:click={toClipboard(failureStackTrace)}>
                    Copy Stack Trace
                </button>
            {:else}
                <i>No Stack Trace</i>
            {/if}
        </div>
    </CloseableBox>
{/if}

<style>
    pre {
        overflow-x: scroll;
    }
</style>
