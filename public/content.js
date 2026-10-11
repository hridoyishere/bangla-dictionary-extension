
(() => {
  let lookupButton;

  function removeButton() {
    lookupButton?.remove();
    lookupButton = null;
  }

  document.addEventListener("mouseup", (event) => {
    if (lookupButton?.contains(event.target)) return;

    setTimeout(() => {
      const selection = window.getSelection();
      const word = selection?.toString().trim();

      removeButton();

      if (!word || word.length > 80) return;

      lookupButton = document.createElement("button");
      lookupButton.textContent = "See meaning";
      lookupButton.style.cssText = `
        position: fixed;
        z-index: 2147483647;
        top: ${Math.min(event.clientY + 12, window.innerHeight - 45)}px;
        left: ${Math.min(event.clientX + 12, window.innerWidth - 130)}px;
        padding: 9px 13px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 8px;
        box-shadow: 0 3px 12px #0003;
        cursor: pointer;
        font: 13px Arial, sans-serif;
      `;

      lookupButton.addEventListener("mousedown", (e) => {
        e.preventDefault();
      });

      lookupButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({
          type: "LOOKUP_WORD",
          word
        });

        removeButton();
      });

      document.body.appendChild(lookupButton);
    }, 100);
  });

  document.addEventListener("mousedown", (event) => {
    if (lookupButton && !lookupButton.contains(event.target)) {
      removeButton();
    }
  });
})();
