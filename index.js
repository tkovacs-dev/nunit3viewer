import App from './app.svelte';

window.addEventListener('load', () => {
    new App({
        target: document.body,
    });
});
