import { createNote, renderNotes } from '../main/script.js';
class NoteInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <form id="noteForm">
                <input type="text" id="noteTitle" placeholder="Title" required>
                <textarea id="noteBody" placeholder="Write your note here" required></textarea>
                <button type="submit"><i class="ri-add-circle-fill"></i>Add Note</button>
            </form>
        `;

    const noteForm = this.querySelector('#noteForm');
    noteForm.addEventListener('submit', async event => {
      event.preventDefault();

      const title = document.getElementById('noteTitle').value;
      const body = document.getElementById('noteBody').value;

      if (title.trim() === '' || body.trim() === '') {
        alert('Please fill in both title and body fields.');
        return;
      }

      try {
        await createNote(title, body);
        await renderNotes();
        noteForm.reset();
      } catch (error) {
        console.error('Error creating note:', error);
      }
    });
  }
}

customElements.define('note-input', NoteInput);
