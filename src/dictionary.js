
import rawDictionary from "./dictionary-data.json";
import rawVerbForms from "./verb-forms.json";

export const dictionary = rawDictionary
  .filter(
    (item) =>
      typeof item.en === "string" &&
      typeof item.bn === "string"
  )
  .map((item) => ({
    word: item.en.trim().toLowerCase(),
    bangla: item.bn.trim(),
  }))
  .filter((item) => item.word && item.bangla)
  .sort((a, b) => {
    if (a.word < b.word) return -1;
    if (a.word > b.word) return 1;
    return 0;
  });

const verbForms = rawVerbForms
  .filter(
    (forms) =>
      Array.isArray(forms) &&
      forms.length >= 5 &&
      forms.every((form) => typeof form === "string")
  )
  .map((forms) => ({
    v1: forms[0].toLowerCase().trim(),
    v1s: forms[1].toLowerCase().trim(),
    v2: forms[2].toLowerCase().trim(),
    v3: forms[3].toLowerCase().trim(),
    ving: forms[4].toLowerCase().trim(),
  }));

// Find verb forms from any form the user searches.
const verbLookup = new Map();

for (const verb of verbForms) {
  for (const form of [
    verb.v1,
    verb.v1s,
    verb.v2,
    verb.v3,
    verb.ving,
  ]) {
    if (form && !verbLookup.has(form)) {
      verbLookup.set(form, verb);
    }
  }
}

export function binarySearch(searchWord) {
  if (typeof searchWord !== "string") {
    return null;
  }

  const target = searchWord.trim().toLowerCase();

  if (!target) {
    return null;
  }

  let left = 0;
  let right = dictionary.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const current = dictionary[mid].word;

    if (current === target) {
      return {
        ...dictionary[mid],
        forms: verbLookup.get(target) ?? null,
      };
    }

    if (current < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // If the searched form isn't a WordLog entry,
  // find its base verb and try that Bangla meaning.
  const forms = verbLookup.get(target);

  if (forms) {
    let left = 0;
    let right = dictionary.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const current = dictionary[mid].word;

      if (current === forms.v1) {
        return {
          ...dictionary[mid],
          forms,
        };
      }

      if (current < forms.v1) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    // Return the verb forms even if WordLog lacks the base word.
    return {
      word: forms.v1,
      bangla: "বাংলা অর্থ পাওয়া যায়নি",
      forms,
    };
  }

  return null;
}
