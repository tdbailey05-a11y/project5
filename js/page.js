(function () {
    let warmTheme = null;

    function toggleTheme() {
        if (warmTheme) {
            warmTheme.remove();
            warmTheme = null;
            return;
        }
        warmTheme = document.createElement("link");
        warmTheme.rel = "stylesheet";
        warmTheme.href = "css/override.css";
        document.head.appendChild(warmTheme);
    }

    function setupPage() {
        const themeBtn = document.getElementById("themeBtn");
        const formBtn = document.getElementById("formBtn");

        if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
        if (formBtn) formBtn.addEventListener("click", openVisitorForm);
    }

    document.addEventListener("DOMContentLoaded", setupPage);
})();
