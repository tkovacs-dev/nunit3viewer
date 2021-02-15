<script>
    import ResultBall from "./result-ball.svelte";

    export let test;
</script>

<ul>
    <li><span title="# of tests in suite">∑</span> {test.testcasecount}</li>
    <li><span title="# of tests in filter">▶</span> {test.total}</li>
    <li><ResultBall result="Passed" /> {test.passed}</li>
    <li><ResultBall result="Failed" /> {test.failed}</li>
    <li><ResultBall result="Skipped" /> {test.skipped}</li>
    <li><ResultBall result="Inconclusive" /> {test.inconclusive}</li>
</ul>

<style>
    ul { 
        padding: 0;
    }

    li {
        display: inline-block;
        padding: 0 1.6rem;
        font-size: 1.6rem;
        list-style-type: none;
        border-right: 1px solid #f6f8fa;
    }
</style>
