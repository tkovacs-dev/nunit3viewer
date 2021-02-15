<script>
    let open = true;

    function toggle() {
        open = !open
    }

    function triangle(open) {
        return open ? "▾" : "▸";
    }
</script>

<h2 on:click={toggle}>
    {triangle(open)}
    <slot name="header" />
</h2>
{#if open}
    <slot name="content" />
{/if}

<slot />