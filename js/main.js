let warmTheme = null;

function toggleTheme() {
    if (warmTheme) {
        warmTheme.remove();
        warmTheme = null;
    } else {
        warmTheme = document.createElement('link');
        warmTheme.rel = 'stylesheet';
        warmTheme.href = 'css/override.css';
        document.head.appendChild(warmTheme);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    initValidation("myform", "success");
});
