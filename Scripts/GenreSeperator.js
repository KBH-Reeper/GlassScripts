(function () {
    'use strict';

    // This code will be injected into the page context
    const code = `
        (function () {
            function replaceGenreBullets() {
                // Select ALL .genre elements
                var nodes = document.querySelectorAll('.genre');
                if (!nodes.length) return;

                // Replace the ▫️ character with ●
                for (var i = 0; i < nodes.length; i++) {
                    var el = nodes[i];

                    // Avoid doing the same replacement over and over
                    if (el.dataset && el.dataset.bulletsConverted === '1') continue;

                    el.textContent = el.textContent.replace(/▫️/g, ' ● ');
                    if (el.dataset) {
                        el.dataset.bulletsConverted = '1';
                    }
                }
            }

            // Run immediately
            replaceGenreBullets();

            // Retry for a while in case the UI loads slowly / changes view
            var attempts = 0;
            var maxAttempts = 120; // ~1 minute at 500ms
            var interval = setInterval(function () {
                attempts++;
                replaceGenreBullets();
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            }, 500);
        })();
    `;

    const scriptElem = document.createElement('script');
    scriptElem.textContent = code;
    document.head.appendChild(scriptElem);
})();
