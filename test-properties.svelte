<script>
    import CloseableBox from "./closable-box.svelte";
    import { findFirstChild } from "./parsing.js";

    export let test;

    $: propertiesElement = findFirstChild(test, "properties");
    $: properties = propertiesElement?._children;
</script>

{#if properties?.length}
    <CloseableBox>
        <span slot="header">Properties</span>
        <div slot="content">
            <table>
                {#each properties as p}
                    <tr>
                        <td>{p.name}</td>
                        <td>{p.value}</td>
                    </tr>
                {/each}
            </table>
        </div>
    </CloseableBox>
{/if}

<style>
    table td:first-child {
        white-space: nowrap;
        font-weight: bold;
    }

    table {
        table-layout: fixed;
    }
</style>
