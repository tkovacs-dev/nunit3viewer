<script>
    export let checked = true;

    function click() {
        checked = !checked;
    }
</script>

<button class:checked on:click="{click}">
    <slot />
</button>

<style>
    button.checked {
        opacity: 1;
    }

    button{
        opacity: 0.5;
    }
</style>