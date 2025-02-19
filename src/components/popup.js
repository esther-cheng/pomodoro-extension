document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("toggleFocus");

    chrome.storage.sync.get(["focusMode"], (data) => {
        if (data.focusMode) {
            button.textContent = "Stop Focus Mode";
        }
    });

    button.addEventListener("click", () => {
        chrome.storage.sync.get(["focusMode"], (data) => {
            const newMode = !data.focusMode;
            chrome.runtime.sendMessage({ action: "toggleFocusMode", focusMode: newMode }, () => {
                button.textContent = newMode ? "Stop Focus Mode" : "Start Focus Mode";
            });
        });
    });
});
