let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes: Returns an array of notes containing the word (case-insensitive)
function searchNotes(word) {
  const searchStr = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchStr));
}

// 2. longestNote: Returns the note object with the most characters
function longestNote() {
  if (notes.length === 0) return null;
  
  return notes.reduce((longest, current) => {
    return current.text.length > longest.text.length ? current : longest;
  });
}

// 3. countByCategory: Returns an object counting notes per category
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    counts[note.category] = (counts[note.category] || 0) + 1;
  }
  return counts;
}

// 4. getSummary: Returns a formatted sentence summarizing note counts
function getSummary() {
  const counts = countByCategory();
  const totalNotes = notes.length;
  const noteWord = totalNotes === 1 ? "note" : "notes";
  
  let categoryStrings = [];
  for (const [category, count] of Object.entries(counts)) {
    categoryStrings.push(`${count} ${category}`);
  }
  
  return `${totalNotes} ${noteWord}: ${categoryStrings.join(", ")}.`;
}

// 5. isDuplicate: Returns true if exact text already exists (ignores case and extra spaces)
function isDuplicate(text) {
  const formattedText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === formattedText);
}

// 6. addNote: Adds a valid note and returns a boolean, logging failure reasons
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  
  if (text.length < 1 || text.length > 200) {
    console.log("Failed to add: Text must be between 1 and 200 characters.");
    return false;
  }
  
  if (!validCategories.includes(category)) {
    console.log("Failed to add: Category must be personal, work, or study.");
    return false;
  }
  
  if (isDuplicate(text)) {
    console.log("Failed to add: This note already exists.");
    return false;
  }
  
  const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text: text, category: category });
  return true;
}

// ==========================================
// TESTS
// ==========================================

console.log("--- searchNotes ---");
console.log(searchNotes("day")); 
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }]
console.log(searchNotes("zebra")); 
// Expected: [] (Edge case: no matches)

console.log("--- longestNote ---");
console.log(longestNote()); 
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }
let tempNotes = [...notes]; // Save current state
notes = []; 
console.log(longestNote()); 
// Expected: null (Edge case: empty array)
notes = [...tempNotes]; // Restore state

console.log("--- countByCategory ---");
console.log(countByCategory()); 
// Expected: { personal: 2, study: 2, work: 1 }
notes = [{ id: 1, text: "Walk dog", category: "personal" }];
console.log(countByCategory()); 
// Expected: { personal: 1 } (Edge case: single category)
notes = [...tempNotes]; 

console.log("--- getSummary ---");
console.log(getSummary()); 
// Expected: "5 notes: 2 personal, 2 study, 1 work."
notes = [{ id: 1, text: "Walk dog", category: "personal" }];
console.log(getSummary()); 
// Expected: "1 note: 1 personal." (Edge case: exactly one note logic)
notes = [...tempNotes];

console.log("--- isDuplicate ---");
console.log(isDuplicate("  call mum  ")); 
// Expected: true (Edge case: messy spacing and casing match)
console.log(isDuplicate("Buy apples")); 
// Expected: false

console.log("--- addNote ---");
console.log(addNote("Read chapter 4", "study")); 
// Expected: true (Note added successfully)
console.log(addNote("Call mum", "personal")); 
// Expected: false (Edge case: Logs "Failed to add: This note already exists.")
console.log(addNote("", "work")); 
// Expected: false (Edge case: Logs "Failed to add: Text must be between 1 and 200 characters.")
console.log(addNote("Cook dinner", "home")); 
// Expected: false (Edge case: Logs "Failed to add: Category must be personal, work, or study.")