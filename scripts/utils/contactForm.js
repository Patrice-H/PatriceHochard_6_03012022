/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


function displayPhotographerContact(id) {
    const PHOTOGRAPHER = getPhotographerData(id);
    const CONTACT_MODAL = document.getElementById('modal-contact-name');
    CONTACT_MODAL.textContent = PHOTOGRAPHER.name;
}


function displayModal(evt) {
    const MODAL_HIDDEN = document.getElementById('recipient-id');
    const MODAL_ID = getPhotographerPageId();
    const MODAL_CLOSE_BTN = document.getElementById('modal-close-btn');
    evt.preventDefault();
    MODAL_HIDDEN.setAttribute('value', MODAL_ID);
    MODAL_WINDOW.style.display = 'block';
    HEADER.setAttribute('aria-hidden', true);
    MAIN.setAttribute('aria-hidden', true);
    MODAL_CLOSE_BTN.focus();
    displayPhotographerContact(MODAL_ID);
}


function closeModal() {
    MODAL_WINDOW.style.display = 'none';
    HEADER.setAttribute('aria-hidden', false);
    MAIN.setAttribute('aria-hidden', false);
}


function displayContactData() {
    const RECIPIENT = document.getElementById('recipient-id');
    const MESSAGE = document.getElementById('message');
    console.log(`Recipient id : ${RECIPIENT.value}`);
    console.log(`First name : ${FIRSTNAME.value}`);
    console.log(`Last name : ${LASTNAME.value}`);
    console.log(`Email : ${EMAIL.value}`);
    console.log(`Message : ${MESSAGE.value}`);

}


function controlFirstname() {
    let response = true;
    if (FIRSTNAME.value === '') {
        response = false;
        FIRSTNAME.setAttribute('class', 'input-error');
    }

    return response;
}

function controlLastname() {
    let response = true;
    if (LASTNAME.value === '') {
        response = false;
        LASTNAME.setAttribute('class', 'input-error');
    }

    return response;
}

function controlEmail() {
    let response = true;
    if (EMAIL.value === '') {
        response = false;
        EMAIL.setAttribute('class', 'input-error');
    }

    return response;
}

function controlsManager() {
    let count = 0;
    if (controlFirstname()) count++;
    if (controlLastname()) count++;
    if (controlEmail()) count++;

    return count === 3;
}

function sendModalForm() {
    if (controlsManager()) {
        closeModal();
        displayContactData();
    }
}

const HEADER = document.getElementById('header');
const MAIN = document.getElementById('main');
const MODAL_WINDOW = document.getElementById('contact_modal');
const FIRSTNAME = document.getElementById('firstname');
const LASTNAME = document.getElementById('lastname');
const EMAIL = document.getElementById('email');
const CONTACT_BUTTON = document.getElementById('contact-submit');
FIRSTNAME.addEventListener('change', () => {
    FIRSTNAME.removeAttribute('class');
});
LASTNAME.addEventListener('change', () => {
    LASTNAME.removeAttribute('class');
});
EMAIL.addEventListener('change', () => {
    EMAIL.removeAttribute('class');
});
CONTACT_BUTTON.addEventListener('click', (evt) => {
    evt.preventDefault();
});
