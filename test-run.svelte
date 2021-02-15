<script>
    import TestStats from "./test-stats.svelte";
    import TestTime from "./test-time.svelte";
    import ResultBall from "./result-ball.svelte";
    import CloseableBox from "./closable-box.svelte"

    export let test;
</script>

<h1>
    <ResultBall result={test.result} />
    {test.name ?? 'Test Run'}
</h1>

<TestStats test={test} />
<TestTime test={test} />

<CloseableBox>
    <span slot="header">Command Line</span>
    <pre slot="content">{test._children.filter((c) => c._name == "command-line")[0]._text}</pre>
</CloseableBox>

<style>
    pre {
        white-space: normal;
    }
</style>
