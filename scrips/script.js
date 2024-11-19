let allNotes = [];

function init() {
    getFromLocalStorage();
    renderNotes();
    renderArchivNotes();
    renderTrashNotes();
}

function renderNotes() {
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    allNotes.forEach((note, index) => {
        if (note.status === "normal") {
            contentRef.innerHTML += getNoteTemplate(note, index);
        }
    });
}

function renderArchivNotes() {
    let archivContentRef = document.getElementById('archivContent');
    archivContentRef.innerHTML = "";

    allNotes.forEach((note, index) => {
        if (note.status === "archive") {
            archivContentRef.innerHTML += getArchivNoteTemplate(note, index);
        }
    });
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trashContent');
    trashContentRef.innerHTML = "";

    allNotes.forEach((note, index) => {
        if (note.status === "trash") {
            trashContentRef.innerHTML += getTrashNoteTemplate(note, index);
        }
    });
}

function getNoteTemplate(note, index) {
    return `
    <div class="noteRegular">
        <div><u><p class="noteSaveTitle">${note.title}</p></u></div>
        <div><p class="noteSave">${note.content}</p></div>
        <div class="noteSaveButton">
            <button onclick="sendToArchiv(${index})">Archive Note</button>
            <button onclick="deleteNote(${index})">Delete</button>
        </div>
    </div>`;
}

function getArchivNoteTemplate(note, index) {
    return `
    <div class="noteRegular">
        <div><u><p class="noteArchiveTitle">${note.title}</p></u></div>
        <div><p class="noteArchive">${note.content}</p></div>
        <div class="noteArchivButton">
            <button onclick="returnFromArchive(${index})">Restore</button>
            <button onclick="deleteFromArchiv(${index})">Trash</button>
        </div>
    </div>`;
}

function getTrashNoteTemplate(note, index) {
    return `
    <div class="noteRegular">
        <div><u><p class="noteTrashTitle">${note.title}</p></u></div>
        <div><p class="noteTrash">${note.content}</p></div>
        <div class="noteTrashButton">
            <button onclick="permanentlyDelete(${index})">Delete Forever</button>
            <button onclick="returnNote(${index})">Restore</button>
        </div>
    </div>`;
}

function sendToArchiv(index) {
    allNotes[index].status = "archive";
    saveToLocalStorage();
    renderNotes();
    renderArchivNotes();
}

function deleteFromArchiv(indexArchiveNote) {
    allNotes[indexArchiveNote].status = "trash";
    saveToLocalStorage();
    renderArchivNotes();
    renderTrashNotes();
}

function deleteNote(index) {
    allNotes[index].status = "trash";
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function returnNote(index) {
    allNotes[index].status = "normal";
    saveToLocalStorage();
    renderNotes();
    renderTrashNotes();
}

function permanentlyDelete(indexTrashNote) {
    if (confirm("Are you sure?")) {
        allNotes.splice(indexTrashNote, 1);
        saveToLocalStorage();
        renderTrashNotes();
    }
}

function returnFromArchive(indexArchiveNote) {
    allNotes[indexArchiveNote].status = "normal";
    saveToLocalStorage();
    renderNotes();
    renderArchivNotes();
}

function saveData() {
    let inputTitlesRef = document.getElementById('notesTitles');
    let inputRef = document.getElementById('noteInput');

    if (inputTitlesRef.value !== "" && inputRef.value !== "") {
        let newNote = {
            title: inputTitlesRef.value,
            content: inputRef.value,
            status: "normal"
        };

        allNotes.push(newNote);
        inputTitlesRef.value = "";
        inputRef.value = "";


        saveToLocalStorage();
        renderNotes();

    } else {
        alert("Na, Na, Na, the cat need both!")
    }
}

function saveToLocalStorage() {
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
}

function getFromLocalStorage() {
    let savedNotes = JSON.parse(localStorage.getItem("allNotes"));
    allNotes = Array.isArray(savedNotes) ? savedNotes : [];
}

function render() {
    renderNotes();
    renderArchivNotes();
    renderTrashNotes();
}