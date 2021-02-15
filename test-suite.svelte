<script>
    import TestStats from "./test-stats.svelte";
    import TestTime from "./test-time.svelte";
    import ResultBall from "./result-ball.svelte";
    import TestOutput from "./test-output.svelte";
    import TestProperties from "./test-properties.svelte";

    export let test;
</script>

<h1>
    <ResultBall result={test.result} />
    Test Suite | {test.name}
</h1>

<TestStats {test} />
<TestTime {test} />
<TestProperties {test} />
<TestOutput {test} />