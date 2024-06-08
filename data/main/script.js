import '../element/app-bar.js';
import '../element/note-input.js';
import '../element/note-item.js';
import '../style/styles.css';
import notesData from '../Data_Dummy/dummy.js';
console.log(notesData);

const apiUrl = 'https://notes-api.dicoding.dev/v2';
const notesUrl = `${apiUrl}/notes`;
const archiveUrl = `${notesUrl}/archived`;

async function createNote(title, body) {
  try {
    document.getElementById('loadingIndicator').style.display = 'block';
    const response = await fetch(notesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, body })
    });
    const data = await response.json();
    await renderNotes();
    document.getElementById('loadingIndicator').style.display = 'none';
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    document.getElementById('loadingIndicator').style.display = 'none';
    throw error;
  }
}

async function deleteNote(noteId) {
  try {
    document.getElementById('loadingIndicator').style.display = 'block';
    const response = await fetch(`${notesUrl}/${noteId}`, {
      method: 'DELETE'
    });
    const data = await response.json();
    await renderNotes();
    document.getElementById('loadingIndicator').style.display = 'none';
    return data;
  } catch (error) {
    console.error('Error deleting note:', error);
    document.getElementById('loadingIndicator').style.display = 'none';
    throw error;
  }
}

async function getNotes() {
  try {
    const response = await fetch(notesUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting notes:', error);
    throw error;
  }
}

async function renderNotes() {
  try {
    const notesData = await getNotes();
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    notesData.data.forEach(note => {
      const noteElement = document.createElement('note-item');
      noteElement.setAttribute('title', note.title);
      noteElement.setAttribute('body', note.body);
      noteElement.setAttribute('note-id', note.id);
      noteElement.setAttribute('CreatedAt', note.createdAt);
      notesList.appendChild(noteElement);
    });
  } catch (error) {
    console.error('Error rendering notes:', error);
  }
}

const deleteAksi = document.getElementById('notesList');
deleteAksi.addEventListener('click', async function (event) {
  if (event.target.classList.contains('deleteButton')) {
    const noteId = event.target.closest('note-item').getAttribute('note-id');
    try {
      await deleteNote(noteId);
      await renderNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  }
});

async function archiveNote(noteId, archived) {
  try {
    document.getElementById('loadingIndicator').style.display = 'block';
    const response = await fetch(`${archiveUrl}/${noteId}`, {
      method: 'GET', // Mengubah method menjadi PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ archived }) // Mengirimkan nilai archived sesuai dengan parameter
    });
    const data = await response.json();
    document.getElementById('loadingIndicator').style.display = 'none';
    return data;
  } catch (error) {
    console.error('Error archiving note:', error);
    document.getElementById('loadingIndicator').style.display = 'none';
    throw error;
  }
}

const notesList = document.getElementById('notesList');
notesList.addEventListener('click', async function (event) {
  if (event.target.classList.contains('archiveButton')) {
    const noteId = event.target.closest('note-item').getAttribute('note-id');
    const isArchived =
      event.target.closest('note-item').getAttribute('archived') === 'true'; // Memeriksa apakah catatan sudah diarsipkan
    try {
      // Memanggil fungsi archiveNote dengan mengirimkan id catatan dan status arsip yang baru
      await archiveNote(noteId, !isArchived); // Mengirimkan negasi dari status arsip saat ini
      await renderNotes();
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  }
});

export { createNote, renderNotes };

window.onload = renderNotes;
