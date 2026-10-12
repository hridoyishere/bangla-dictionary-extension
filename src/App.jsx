
import { useEffect, useState } from "react";
import { binarySearch, dictionary } from "./dictionary.js";
import "./App.css";

function App() {
  const [word, setWord] = useState("determination");
  const [searchText, setSearchText] = useState("determination");

  useEffect(() => {
    async function loadSelectedWord() {
      try {
        const data = await chrome.storage.session.get("selectedWord");

        if (data.selectedWord) {
          setWord(data.selectedWord);
          setSearchText(data.selectedWord);
        }
      } catch (error) {
        console.error("Could not load selected word:", error);
      }
    }

    loadSelectedWord();

    function handleStorageChange(changes, areaName) {
      if (
        areaName === "session" &&
        changes.selectedWord?.newValue
      ) {
        const newWord = changes.selectedWord.newValue;

        setWord(newWord);
        setSearchText(newWord);
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const result = binarySearch(word);

  function handleSearch(event) {
    event.preventDefault();

    const newWord = searchText.trim();

    if (newWord) {
      setWord(newWord);
    }
  }

  async function handleClose() {
    try {
      const currentWindow = await chrome.windows.getLastFocused();

      if (currentWindow.id !== undefined) {
        await chrome.sidePanel.close({
          windowId: currentWindow.id,
        });
      }
    } catch (error) {
      console.error("Could not close dictionary:", error);
    }
  }

  return (
    <main className="dictionary">
      <header className="header">
        <div className="logo">ব</div>

        <div className="header-text">
          <h1>Bangla Dictionary</h1>
          <p>English to Bangla</p>
        </div>

        <button
          className="close-button"
          type="button"
          aria-label="Close dictionary"
          title="Close dictionary"
          onClick={handleClose}
        >
          ×
        </button>
      </header>

      <form className="search" onSubmit={handleSearch}>
        <input
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Enter an English word..."
          aria-label="Search English word"
        />

        <button type="submit">Search</button>
      </form>

      <p className="dictionary-count">
        {dictionary.length.toLocaleString()} words available
      </p>

      {result ? (
        <section className="result">
          <div className="word-heading">
            <div>
              <h2>{result.word}</h2>
              <p className="pronunciation">
                {result.forms ? "Verb" : "English word"}
              </p>
            </div>

            <span className="word-icon">Aa</span>
          </div>

          {result.forms && (
            <div className="section">
              <h3>Verb Forms</h3>

              <div className="verb-forms">
                <div>
                  <span>V1 · Base form</span>
                  <strong>{result.forms.v1}</strong>
                </div>

                <div>
                  <span>V2 · Past tense</span>
                  <strong>{result.forms.v2}</strong>
                </div>

                <div>
                  <span>V3 · Past participle</span>
                  <strong>{result.forms.v3}</strong>
                </div>
              </div>

              <p className="extra-form">
                <strong>V1+s:</strong> {result.forms.v1s}
              </p>

              <p className="extra-form">
                <strong>V-ing:</strong> {result.forms.ving}
              </p>
            </div>
          )}

          <div className="section">
            <h3>বাংলা অর্থ</h3>
            <p className="bangla">{result.bangla}</p>
          </div>
        </section>
      ) : (
        <div className="empty">
          <span className="empty-icon">ব</span>
          <h3>Word not found</h3>

          <p>
            We couldn't find "{word}" in the local dictionary.
          </p>

          <p>Try another word or check its spelling.</p>
        </div>
      )}

      <footer>Learn a new word every day.</footer>
    </main>
  );
}

export default App;
