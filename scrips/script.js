let notesTitles = [];
let notes = [];
let trashNotes = [];
let trashNoteTitles = [];
let archivNotes = [];
let archivNoteTitles = [];


function init() {
    getFromLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function renderNotes() {
    let contenRef = document.getElementById('content');
    contenRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contenRef.innerHTML += getNoteTemplate(indexNote);
    }
}

function renderArchivNotes() {
    let archivContentRef = document.getElementById('archivContent');
    archivContentRef.innerHTML = "";

    for (let indexArchivNote = 0; indexArchivNote < archivNotes.length; indexArchivNote++) {
        archivContentRef.innerHTML += getArchivNoteTemplate(indexArchivNote);
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trashContent');
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
    }
}

function getNoteTemplate(indexNote) {
    return `
    <div>
    <p class="noteSave">
    <button onclick="deleteNote(${indexNote})">Delete</button>
    <button onclick="sendToArchiv(${indexNote})">Send to Archiv</button>
    ${notesTitles[indexNote]}<br>${notes[indexNote]}</p><br>
    </div>`;
}

function getArchivNoteTemplate(indexArchivNote) {
    return `
    <div>
    <p class="noteArchive">
    <button onclick="sendToArchiv(${indexArchivNote})">Send to Archiv</button>
    <button onclick="returnNote(${indexArchivNote})">Re-Saved</button>
    ${archivNoteTitles[indexArchivNote]}<br>${archivNotes[indexArchivNote]}</p><br>
    </div>`;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `
    <div>
    <p class="noteTrash">
    <button onclick="permanentlyDelete(${indexTrashNote})">Perm. Delete</button>
    <button onclick="returnNote(${indexTrashNote})">Re-Saved</button>
    ${trashNoteTitles[indexTrashNote]}<br>${trashNotes[indexTrashNote]}</p><br>
    </div>`;
}

function sendToArchiv(indexNote) {
    let archivNote = notes.splice(indexNote, 1)[0];
    archivNotes.push(archivNote);
    let archivNoteTitle = notesTitles.splice(indexNote, 1)[0];
    archivNoteTitles.push(archivNoteTitle);
    saveToLocalStorage();
    renderArchivNotes();
    renderNotes();
    renderTrashNotes();
}


function deleteNote(indexNote) {
    let trashNote = notes.splice(indexNote, 1)[0];
    trashNotes.push(trashNote);
    let trashNoteTitle = notesTitles.splice(indexNote, 1)[0];
    trashNoteTitles.push(trashNoteTitle);
    saveToLocalStorage();
    renderArchivNotes();
    renderNotes();
    renderTrashNotes();
}

function permanentlyDelete(indexTrashNote) {
    trashNotes.splice(indexTrashNote, 1);
    trashNoteTitles.splice(indexTrashNote, 1);
    saveToLocalStorage();
    renderTrashNotes();
}

function returnNote(indexReturnNote) {
    let restoredNote = trashNotes.splice(indexReturnNote, 1)[0];
    let restoredNoteTitle = trashNoteTitles.splice(indexReturnNote, 1)[0];
    notes.push(restoredNote);
    notesTitles.push(restoredNoteTitle);
    saveToLocalStorage();
    renderArchivNotes();
    renderNotes();
    renderTrashNotes();
}

function saveData() {
    let inputTitlesRef = document.getElementById('notesTitles');
    let inputRef = document.getElementById('noteInput');

    if (inputTitlesRef.value != "" && inputRef.value != "") {
        notesTitles.push(inputTitlesRef.value);
        notes.push(inputRef.value);

        inputTitlesRef.value = "";
        inputRef.value = "";

        saveToLocalStorage();
        renderArchivNotes();
        renderNotes();

    } else {
        alert("Na, Na, Na, the cat need both!")
    }
}


function saveToLocalStorage() {
    localStorage.setItem("noteInput", JSON.stringify(notes));
    localStorage.setItem("notesTitlesSave", JSON.stringify(notesTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("trashNoteTitles", JSON.stringify(trashNoteTitles));
}

function getFromLocalStorage() {
    let savedNotes = JSON.parse(localStorage.getItem("noteInput"));
    let savedTitles = JSON.parse(localStorage.getItem("notesTitlesSave"))
    let savedTrashNotes = JSON.parse(localStorage.getItem("trashNotes"));
    let savedTrashTitles = JSON.parse(localStorage.getItem("trashNoteTitles"));

    if (savedNotes && Array.isArray(savedNotes)) {
        notes = savedNotes;
    }
    if (savedTitles && Array.isArray(savedTitles)) {
        notesTitles = savedTitles;
    }
    if (savedTrashNotes && Array.isArray(savedTrashNotes)) {
        trashNotes = savedTrashNotes;
    }
    if (savedTrashTitles && Array.isArray(savedTrashTitles)) {
        trashNoteTitles = savedTrashTitles;
    }
}

function render() {
    renderNotes();
    renderArchivNotes();
    renderTrashNotes();
}