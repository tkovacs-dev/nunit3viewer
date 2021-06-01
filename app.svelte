<script>
    import TestDropdown from "./test-dropdown.svelte";
    import TestRun from "./test-run.svelte";
    import TestSuite from "./test-suite.svelte";
    import TestCase from "./test-case.svelte";
    import ToggleButton from "./toggle-button.svelte";

    import { testRunFromText } from "./parsing.js";
    import FakeButton from "./fake-button.svelte";

    let testRun = null;
    let selected = null;

    $: console.log('selected', selected);

    let showPassed = true;
    let showFailed = true;
    let showSkipped = true;
    let showInconclusive = true;
    $: show = [
        showPassed ? "Passed" : "",
        showFailed ? "Failed" : "",
        showSkipped ? "Skipped" : "",
        showInconclusive ? "Inconclusive" : "",
    ];

    function readFiles(event) {
        let files = event?.target?.files ?? event?.dataTransfer?.files;
        let file = null;
        for (var i = 0, f; (f = files[i]); i++) {
            if (f.type == "text/xml") {
                file = f;
                break;
            }
        }
        if (file) {
            var reader = new FileReader();
            reader.onloadend = function (event) {
                let text = event.target.result;
                testRun = testRunFromText(text);
                if (testRun) {
                    testRun.name = f.name;
                }
                selected = testRun;
            };
            reader.readAsText(f.slice(0, f.size));
        }
    }

    function dragOver(e) {
        e.dataTransfer.dropEffect = "copy";
    }
</script>

<main on:dragover|preventDefault={dragOver} on:drop|preventDefault={readFiles}>
    {#if testRun}
        <header>
            <label>
                <FakeButton>Open</FakeButton>
                <input type="file" accept=".xml" on:change={readFiles} />
            </label>

            <span />

            <ToggleButton bind:checked={showPassed}>Passed</ToggleButton>
            <ToggleButton bind:checked={showFailed}>Failed</ToggleButton>
            <ToggleButton bind:checked={showSkipped}>Skipped</ToggleButton>
            <ToggleButton bind:checked={showInconclusive}
                >Inconclusive</ToggleButton
            >
        </header>
        <nav>
            <TestDropdown test={testRun} bind:selected level="1" {show} />
        </nav>
        <selection>
            {#if selected?._name == "test-run"}
                <TestRun test={selected} />
            {:else if selected?._name == "test-suite"}
                <TestSuite test={selected} />
            {:else if selected?._name == "test-case"}
                <TestCase test={selected} />
            {:else}
                {selected?.id ?? "None"}
            {/if}
        </selection>
    {:else}
        <div class="openScreen">
            <h1>Drop a Test Result XML file here</h1>
            <p>or</p>
            <label>
                <FakeButton><span>Open a file</span></FakeButton>
                <input type="file" accept=".xml" on:change={readFiles} />
            </label>
        </div>
    {/if}
</main>

<style>
    main {
        display: grid;
        width: 100vw;
        height: 100vh;
        grid-template-columns: auto 1fr;
        grid-template-rows: 50px 1fr;

        grid-template-areas:
            "header header"
            "nav    selection";
    }

    header {
        grid-area: header;

        border-bottom: 1px solid lightgray;
        margin: 0;
        padding: 10px;

        white-space: nowrap;
    }

    nav {
        grid-area: nav;
        width: 30vw;
        resize: horizontal;
        max-width: 80vw;
        overflow-y: scroll;
        background-color: #f6f8fa;
        margin: 0;
        border-right: 1px solid lightgray;
    }

    selection {
        grid-area: selection;
        padding: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    header span {
        display: inline-block;
        width: 40px;
    }

    input[type="file"] {
        display: none;
    }

    .openScreen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        flex-direction: column;
    }

    .openScreen span {
        display: inline-block;
        padding: 10px 20px;
    }

    .openScreen h1 {
        border: none;
    }
</style>
