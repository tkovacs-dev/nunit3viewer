<script>
    import ResultBall from "./result-ball.svelte";
    import TestTime from "./test-time.svelte";
    import TestOutput from "./test-output.svelte";
    import TestStacktrace from "./test-stacktrace.svelte";

    export let test;

    function toClipboard(text) {
        navigator.clipboard.writeText(text);
    }
</script>

<h1>
    <ResultBall result={test.result} />&nbsp;{test.name}
</h1>

<TestTime {test} />

<h2>Name</h2>
<p>
    {test.fullname}
</p>
<p>
    <button on:click={toClipboard(test.fullname)}>Copy Full Name</button>
    <button on:click={toClipboard(test.methodname)}>Copy Method Name</button>
</p>

<TestStacktrace {test} />
<TestOutput {test} />

<style>
    h1 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
