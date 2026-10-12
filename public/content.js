(() => {
  let lookupButton = null;

  function removeButton() {
    if (lookupButton) {
      lookupButton.remove();
      lookupButton = null;
    }
  }

  document.addEventListener("mouseup", (event) => {
    if (lookupButton?.contains(event.target)) {
      return;
    }

    const x = event.clientX;
    const y = event.clientY;

    setTimeout(() => {
      const selection = window.getSelection();
      const word = selection?.toString().trim();

      removeButton();

      // Ignore empty selections and excessively long text.
      if (!word || word.length > 80) {
        return;
      }

      // Avoid showing the button for whitespace only.
      if (!/[a-zA-Z]/.test(word)) {
        return;
      }

      lookupButton = document.createElement("button");
      lookupButton.textContent = "See meaning";
      lookupButton.type = "button";

      Object.assign(lookupButton.style, {
        position: "fixed",
        zIndex: "2147483647",
        top: `${Math.max(8, Math.min(y + 12, window.innerHeight - 48))}px`,
        left: `${Math.max(8, Math.min(x + 12, window.innerWidth - 125))}px`,
        padding: "10px 14px",
        background: "#2563eb",
        color: "#ffffff",
        border: "none",
        borderRadius: "8px",
        boxShadow: "0 3px 12px #0003",
        cursor: "pointer",
        font: "14px Arial, sans-serif",
      });

      lookupButton.addEventListener("mousedown", (e) => {
        // Preserve the webpage selection while clicking.
        e.preventDefault();
      });

      lookupButton.addEventListener("click", async () => {
        const selectedWord = word;

        removeButton();

        try {
          const response = await chrome.runtime.sendMessage({
            type: "LOOKUP_WORD",
            word: selectedWord,
          });

          if (!response?.success) {
            console.error("Dictionary could not open:", response?.error);
          }
        } catch (error) {
          console.error("Dictionary extension error:", error);
        }
      });

      document.body.appendChild(lookupButton);
    }, 100);
  });

  document.addEventListener("mousedown", (event) => {
    if (lookupButton && !lookupButton.contains(event.target)) {
      removeButton();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      removeButton();
    }
  });

  window.addEventListener("scroll", removeButton, true);
})();
