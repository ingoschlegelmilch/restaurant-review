self.addEventListener('DOMContentLoaded', event => {
    // Fallback in case service worker isn't supported
    if (!navigator.serviceWorker) return;
    navigator.serviceWorker.register('/sw.js')
        .then(registration => console.log('Service Worker registration successful!', registration))
        .catch(error => console.log('Service Worker registration failed!', error))
});
