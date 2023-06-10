const themeToggler = document.querySelector("#theme-toggle");
const prefersColorSchemeMQL = window.matchMedia(
    "(prefers-color-scheme: dark)"
);
console.log("The MQL at load time: ", prefersColorSchemeMQL);

const getColorPreference = () => {
    if (localStorage.getItem("theme-preference")) {
        console.log("Getting locally stored theme preference");
        return localStorage.getItem("theme-preference");
    } else {
        console.log("Returning theme-preference.");
        return prefersColorSchemeMQL.matches ? "dark" : "light";
    }
};

const setPreference = () => {
    console.log("Setting local theme preference");
    localStorage.setItem("theme-preference", theme.value);
    console.log("Reflecting theme preference");
    reflectPreference();
};

const reflectPreference = () => {
    document.firstElementChild.setAttribute("data-theme", theme.value);
    themeToggler?.setAttribute("aria-label", theme.value);
};

const theme = { value: getColorPreference() };

reflectPreference();

window.onload = () => {
    console.log("Calling reflect preference on window load");
    reflectPreference();

    themeToggler?.addEventListener("click", (e) => {
        theme.value = theme.value === "light" ? "dark" : "light";
        setPreference();
    });
};

prefersColorSchemeMQL.addEventListener(
    "change",
    ({ matches: isDark }) => {
        console.log(`Dark mode is ${isDark ? "🌒 on" : "☀️ off"}.`);
        theme.value = isDark ? "dark" : "light";
        setPreference();
    }
);