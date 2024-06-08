class NoteItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('title');
    const body = this.getAttribute('body');
    const archived = this.getAttribute('archived');
    const noteId = this.getAttribute('note-id');
    const createdAt = this.getAttribute('CreatedAt');
    this.innerHTML = `
            <div class="note">
                <h2>${title}</h2>
                <p>${body}</p>
                <p>${new Date(createdAt)}</p>
                
                <button class="archiveButton${archived ? ' archived' : ''}" data-note-id="${noteId}">
          ${archived ? '<i class="ri-inbox-unarchive-line" style="font-size: 22px;"></i> Unarchive' : '<i class="ri-archive-line" style="font-size: 22px;"></i> Archive'}
        </button>
                <button class="deleteButton"><i class="ri-delete-bin-line" style="font-size: 22px;"></i>Delete</button>
            </div>
        `;
  }
}

customElements.define('note-item', NoteItem);
