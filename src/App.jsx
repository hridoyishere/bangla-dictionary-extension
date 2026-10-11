
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("determination");

  const dictionary = {
    determination: {
      type: "Noun",
      pronunciation: "/dɪˌtɜːrmɪˈneɪʃən/",
      meaning:
        "The ability to continue trying to achieve something despite difficulties.",
      bangla: "দৃঢ় সংকল্প, অদম্য ইচ্ছাশক্তি",
      example:
        "Her determination helped her achieve her goals.",
    },
  };

  // Receive the selected word from the webpage.
  useEffect(() => {
    async function loadSelectedWord() {
      try {
        const data = await chrome.storage.session.get("selectedWord");

        if (data.selectedWord) {
          setWord(data.selectedWord);
        }
      } catch (error) {
        console.error("Could not load selected word:", error);
      }
    }

    loadSelectedWord();

    const listener = (changes, areaName) => {
      if (
        areaName === "session" &&
        changes.selectedWord?.newValue
      ) {
        setWord(changes.selectedWord.newValue);
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  const result = dictionary[word.toLowerCase().trim()];

  function handleSearch(event) {
    event.preventDefault();
    setWord((currentWord) => currentWord.trim());
  }

  return (
    <main className="dictionary">
      <header className="header">
        <div className="logo">ব</div>

        <div>
          <h1>Bangla Dictionary</h1>
          <p>English to Bangla</p>
        </div>
      </header>

      <form className="search" onSubmit={handleSearch}>
        <input
          value={word}
          onChange={(event) => setWord(event.target.value)}
          placeholder="Enter an English word..."
          aria-label="Search English word"
        />

        <button type="submit" aria-label="Search">
          ⌕
        </button>
      </form>

      {result ? (
        <section className="result">
          <div className="word-heading">
            <div>
              <h2>{word}</h2>

              <p className="pronunciation">
                {result.type} · {result.pronunciation}
              </p>
            </div>

            <span className="word-icon">Aa</span>
          </div>

          <div className="section">
            <h3>বাংলা অর্থ</h3>
            <p className="bangla">{result.bangla}</p>
          </div>

          <div className="section">
            <h3>English Definition</h3>
            <p>{result.meaning}</p>
          </div>

          <div className="section example">
            <h3>Example</h3>
            <p>“{result.example}”</p>
          </div>
        </section>
      ) : (
        <div className="empty">
          <span className="empty-icon">ব</span>

          <h3>Word not found</h3>

          <p>
            We received "{word}", but this demo dictionary
            does not contain that word yet.
          </p>

          <p>
            We'll connect a real dictionary API to provide
            English definitions and Bangla meanings.
          </p>
        </div>
      )}

      <footer>Learn a new word every day.</footer>
    </main>
  );
}

export default App;
