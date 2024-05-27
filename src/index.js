import './styles/style.css';
import './styles/bootstrap-icon.css';
import './styles/loading.css';
import './script/component/app-bar.js';
import './script/component/footer-bar.js';
import './script/component/note-item.js';

const notesList = document.getElementById('daftar-notes');
const urlApi = 'https://notes-api.dicoding.dev/v2';

const getNotes = async () => {
    // Cek koneksi internet
    if (!navigator.onLine) {
        alert('Ups, cek koneksi internetmu');
        return;
    }

    window.addEventListener("load", () => {
        const muatData = document.querySelector(".loader");
        muatData.classList.add("loader-hidden");
        muatData.addEventListener("transition-end", () => {
            document.body.removeChild("loader");
        });
    });

    const requestOptions = {
        method: 'GET',
    };

    try {
        const response = await fetch(`${urlApi}/notes`, requestOptions);
        const responseJson = await response.json();

        if (responseJson.error) {
            showResponseMessage(responseJson.message);
        } else {
            notesList.innerHTML = '';
            responseJson.data.forEach(item => {
                const noteElement = noteItemTemplate(item);
                notesList.appendChild(noteElement);
            });
        }
    } catch (error) {
        showResponseMessage(error);
    }
};
window.onload = getNotes;

const addNotes = async (note) => {
    // Cek koneksi internet
    if (!navigator.onLine) {
        alert('Ups, cek koneksi internetmu');
        return;
    }

    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        };
        const response = await fetch(`${urlApi}/notes`, requestOptions);
        const responseJson = await response.json();

        if (responseJson.error) {
            showResponseMessage(responseJson.message);
        } else {
            getNotes();
        }
    } catch (error) {
        showResponseMessage(error);
    }
};

export const deleteNotes = (note_id) => {
    // Cek koneksi internet
    if (!navigator.onLine) {
        alert('Ups, cek koneksi internetmu');
        return;
    }

    fetch(`${urlApi}/notes/${note_id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            showResponseMessage(responseJson.message);
        })
        .catch((error) => {
            showResponseMessage(error);
        });
    const showResponseMessage = (message = 'Cek koneksimu') => {
        Swal.fire({
            title: "Hapus catatan",
            text: "Anda yakin ingin hapus catatan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ya"
        }).then((result) => {
            if (result.isConfirmed) {
                getNotes();
                Swal.fire({
                    title: "Berhasil",
                    text: "Catatan telah dihapus",
                    icon: "success"
                });
            }
        });
    };
};

function noteItemTemplate(note) {
    const noteItem = document.createElement('note-item');
    noteItem.setNote({
        id: note.id,
        title: note.title,
        body: note.body,
        createdAt: note.createdAt
    });

    return noteItem;
}


const notesForm = document.getElementById('notes-form');
const noteTitle = notesForm.elements.noteTitles;
const noteBody = notesForm.elements.noteBodies;


notesForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const noteJudul = noteTitle.value;
    const noteIsi = noteBody.value;

    const newNote = {
        title: noteJudul,
        body: noteIsi,
    };

    const isSuccess = addNotes(newNote);
    if (isSuccess) {
        showSweetAlert();
    } else {
        alert('Ups, sepertinya ada masalah 🤔');
    }
    resetForm();
});

function showSweetAlert() {
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Catatan berhasil disimpan",
        showConfirmButton: false,
        timer: 2000
    });
}

function resetForm() {
    noteTitle.value = '';
    noteBody.value = '';
}
getNotes();
