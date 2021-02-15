<script>
    export let test;

    $: start = parseNunitDate(test["start-time"]);
    $: end = parseNunitDate(test["end-time"]);
    $: durationSecs = (() => {
        let t = Number(test["duration"]);
        if (isNaN(t)) {
            return "Unknown";
        }
        let secs = t.toFixed(1);
        return secs;
    })();
    $: durationFormatted = (() => {
        let duration = Number(test["duration"]);
        let remaining = duration
        if (isNaN(remaining)) {
            return "Unknown";
        }

        let secPerDay = 86400;
        let days = Math.floor(remaining / secPerDay);
        remaining -= days * secPerDay;
        let daysString = days > 0 ? `${days}d ` : "";

        let secPerHour = 3600;
        let hours = Math.floor(remaining / secPerHour);
        remaining -= hours * secPerHour;
        let hourssString = hours > 0 ? `${hours}h ` : "";

        let secPerMin = 60;
        let minutes = Math.floor(remaining / secPerMin);
        remaining -= minutes * secPerMin;
        let minutesString = minutes > 0 ? `${minutes}m ` : "";

        let secs = remaining.toFixed(1);
        let secsString = (secs > 0 || duration < 1) ? `${secs}s ` : "";

        return daysString + hourssString + minutesString + secsString;
    })();

    function parseNunitDate(date) {
        if (!date) {
            return "Unknown";
        }
        let res = new Date();
        let epoch = Date.parse(date.replace(" ", "T"));
        res.setTime(epoch);
        return res.toLocaleString();
    }
</script>

<ul>
    <li>
        <span title="Started at">▶</span>
        {start}
    </li>
    <li>
        <span title="Finished at">◼</span>
        {end}
    </li>
    <li title="{durationSecs}s">
        <span title="Duration">⏱</span>{durationFormatted}
    </li>
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
