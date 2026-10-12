# Bangla Dictionary 🇧🇩

An English-to-Bangla browser extension that helps users understand English words while browsing the web. Select a word, click **See meaning**, and view its Bangla meaning and verb forms in a convenient side panel.

## ✨ Features

- **Instant Word Lookup:** Select English text on a webpage and look up its meaning.
- **English to Bangla:** View Bangla meanings from a local dictionary dataset.
- **Verb Forms:** Find V1 (base form), V1+s, V2 (past tense), V3 (past participle), and V-ing forms when available.
- **Floating Lookup Button:** Access the dictionary directly from selected text.
- **Side Panel Interface:** Read results without navigating away from the webpage.
- **Manual Search:** Enter an English word to search for its meaning.
- **Fast Local Search:** Search dictionary entries locally without needing a server for each lookup.

## Screenshots
<img src="./src/assets/Screenshot from 2026-10-13 00-10-55.png"/>
<img src="./src/assets/Screenshot from 2026-10-13 00-10-12.png"/>
<img src="./src/assets/Screenshot from 2026-10-13 00-11-38.png"/>
### YouTube

Select English text from a YouTube video description to look up its Bangla meaning.

![Bangla Dictionary on YouTube](screenshots/youtube-lookup.png)

### Facebook

Look up English words from Facebook posts and other supported webpage text.

![Bangla Dictionary on Facebook](screenshots/facebook-lookup.png)

## 🛠️ Technologies Used

- React
- JavaScript
- Vite
- HTML and CSS
- Chrome Extension APIs
- JSON datasets
- Binary Search

## Dictionary Data

This project uses English-to-Bangla dictionary data and a verb-forms dataset to help users learn word meanings and verb forms.

##  Installation for Development

1. Clone this repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder:

   ```bash
   cd bangla-dictionary-extension
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the extension:

   ```bash
   npm run build
   ```

5. Open `brave://extensions` in Brave or `chrome://extensions` in Chrome.

6. Enable **Developer mode**.

7. Click **Load unpacked** and select the generated build folder, usually `dist`.

8. Open a webpage, select an English word, and click **See meaning**.

## Project Goal

The goal of this project is to make English vocabulary easier to understand while browsing the web, especially for Bangla-speaking learners.

## Future Improvements

- English word pronunciation
- Example sentences and usage
- Improved word definitions and search accuracy
- More vocabulary and verb-form data
- Chrome Web Store publication

## Author

**MD Hridoy**

GitHub: [@hridoyishere](https://github.com/hridoyishere)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub!
