<script>
    export let result;
</script>

{#if result == "Passed"}
    <span title="{result}" class="{result}">⬤</span>
{:else if result == "Skipped"}
    <span title="{result}" class="{result}">◐</span>
{:else if result == "Failed"}
    <span title="{result}" class="{result}">⬤</span>
{:else if result == "Inconclusive"}
    <span title="{result}" class="{result}">⬤</span>
{:else}
    {console.error("unknown result", result)}
{/if}

<style>
    span {
        display: inline-block;
    }

    span.Passed, span.Skipped {
        color: green;
    }

    span.Failed {
        color: red;
    }

    span.Inconclusive {
        color: burlywood;
    }
</style>