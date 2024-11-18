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
        archivContentRef.innerHTML += getTrashNoteTemplate(indexArchivNote);
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
    return `<p class="noteSave"><button onclick="deleteNote(${indexNote})">Delete</button> ${notesTitles[indexNote]}:<br> ${notes[indexNote]}</p><br>`;
}
// <p class="noteTrash"><button onclick="sendToArchiv(${indexArchivNote})">Archiv</button><button onclick="returnNote(${indexArchivNote})">Re-Saved</button> ${archivNoteTitles[indexArchivNote]}:<br> ${archivNotes[indexArchivNote]}</p><br>
function getTrashNoteTemplate(indexArchivNote) {
    return `<p class="noteTrash"><button onclick="sendToArchiv(${indexArchivNote})">Archiv</button><button onclick="returnNote(${indexArchivNote})">Re-Saved</button> ${archivNoteTitles[indexArchivNote]}:<br> ${archivNotes[indexArchivNote]}</p><br>`;
}

function getTrashNoteTemplate(indexTrashNote) {
    return `<p class="noteTrash"><button onclick="permanentlyDelete(${indexTrashNote})">Perm. Delete</button><button onclick="returnNote(${indexTrashNote})">Re-Saved</button> ${trashNoteTitles[indexTrashNote]}:<br> ${trashNotes[indexTrashNote]}</p><br>`;
}

function sendToArchiv(indexNote) {
    let archivNotes = notes.splice(indexNote, 1)[0];
    archivNotes.push(archivNotes);
    let archivNoteTitles = notesTitles.splice(indexNote, 1)[0];
    archivNoteTitles.push(archivNoteTitles);
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
    renderTrashNotes();
}