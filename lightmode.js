let lightMode = localStorage.getItem("lightmode");
const themeSwitch = document.querySelector("#themeToggle");

if (lightMode === "active") {
    enableLightMode();
}

themeSwitch.addEventListener('click', () => {
    lightMode = localStorage.getItem("lightmode");
    lightMode !== "active" ? enableLightMode() : disableLightMode();
});

function enableLightMode() {
    document.body.classList.add("light-mode");
    localStorage.setItem('lightmode', 'active');
    themeSwitch.textContent = "🌙";
}

function disableLightMode() {
    document.body.classList.remove("light-mode");
    localStorage.setItem('lightmode', null);
    themeSwitch.textContent = "☀️";
}
