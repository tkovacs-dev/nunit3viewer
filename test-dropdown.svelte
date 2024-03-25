<script>
    import TestDropdown from "./test-dropdown.svelte";
    import ResultBall from "./result-ball.svelte";

    export let selected = null;
    export let test;
    export let level = 0;
    export let show = null;

    $: name = test.name ?? "Test Run";

    $: childSuites = Array.from(test._children).filter((c) =>
        ["test-run", "test-suite"].includes(c._name)
    );

    $: childTests = Array.from(test._children).filter(
        (c) => c._name == "test-case"
    );

    function select(element) {
        selected = element;
    }

    function shouldShow(show, test) {
        if (!show) return true;
        return show.filter(s => test.allResults.includes(s)).length > 0;
    }
</script>

<details class="root level{Math.min(Number(level), 9)}" open>
    <summary class:selected={test === selected}>
        <ResultBall result={test.result} />
        <a href="#" on:click={select(test)}>{name}</a>
    </summary>
    <div>
        {#each childSuites as t}
            {#if shouldShow(show, t) }
                <TestDropdown test={t} level="{Number(level) + 1}" bind:selected show="{show}" />
            {/if}
        {/each}
    </div>
    {#each childTests as t}
        {#if !show || show.includes(t.result) }
            <div
                class="testCase"
                class:selected={t === selected}
                on:click={select(t)}>
                <ResultBall result={t.result} />
                {t.name}
            </div>
        {/if}
    {/each}
</details>

<style>
    details {
        padding: 0;
        margin: 0;
        border-radius: 0;
        border-top: none;
        border-right: none;
        border-bottom: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        user-select: none;
    }

    details > summary {
        margin: 0;
    }

    a {
        display: inline-block;
        width: 100%;

        color: var(--nc-tx-1);
        text-decoration: none;
        font-weight: lighter;
        padding: 0.1rem;
    }

    div.testCase {
        cursor: pointer;
    }

    .selected {
        background-color: #8fc7ff;
    }

    .level1 summary { padding-left: 15px }
    .level2 summary { padding-left: 30px }
    .level3 summary { padding-left: 45px }
    .level4 summary { padding-left: 60px }
    .level5 summary { padding-left: 75px }
    .level6 summary { padding-left: 90px }
    .level7 summary { padding-left: 105px }
    .level8 summary { padding-left: 120px }
    .level9 summary { padding-left: 135px }

    .level1 .testCase { padding-left: 30px }
    .level2 .testCase { padding-left: 45px }
    .level3 .testCase { padding-left: 60px }
    .level4 .testCase { padding-left: 75px }
    .level5 .testCase { padding-left: 90px }
    .level6 .testCase { padding-left: 105px }
    .level7 .testCase { padding-left: 120px }
    .level8 .testCase { padding-left: 135px }
    .level9 .testCase { padding-left: 150px }
</style>
