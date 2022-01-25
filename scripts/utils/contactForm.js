/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/**
 * @description Display the name of the photographer on the contact modal
 * @param {number} id - The photographer id
 */
function displayPhotographerContact(id) {
    const PHOTOGRAPHER = getPhotographerData(id);
    const CONTACT_MODAL = document.getElementById('modal-contact-name');
    CONTACT_MODAL.textContent = PHOTOGRAPHER.name;
}

/**
 * @description Display the contact modal window
 * @param {MouseEvent} evt 
 */
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

/**
 * @description Close the contact modal window
 */
function closeModal() {
    MODAL_WINDOW.style.display = 'none';
    HEADER.setAttribute('aria-hidden', false);
    MAIN.setAttribute('aria-hidden', false);
}

/**
 * @description Display user inputs in console
 */
function displayContactData() {
    const RECIPIENT = document.getElementById('recipient-id');
    const MESSAGE = document.getElementById('message');
    console.log(`Recipient id : ${RECIPIENT.value}`);
    console.log(`First name : ${FIRSTNAME.value}`);
    console.log(`Last name : ${LASTNAME.value}`);
    console.log(`Email : ${EMAIL.value}`);
    console.log(`Message : ${MESSAGE.value}`);

}

/**
 * @description Control if user first name input is filled or not
 * @returns {boolean} response
 */
function controlFirstname() {
    let response = true;
    if (FIRSTNAME.value === '') {
        response = false;
        FIRSTNAME.setAttribute('class', 'input-error');
    }

    return response;
}

/**
 * @description Control if user last name input is filled or not
 * @returns {boolean} response
 */
function controlLastname() {
    let response = true;
    if (LASTNAME.value === '') {
        response = false;
        LASTNAME.setAttribute('class', 'input-error');
    }

    return response;
}

/**
 * @description Control if user email input is filled or not
 * @returns {boolean} response
 */
function controlEmail() {
    let response = true;
    if (EMAIL.value === '') {
        response = false;
        EMAIL.setAttribute('class', 'input-error');
    }

    return response;
}

/**
 * @description Manages all controls of contact form
 * @see {@link controlFirstname}
 * @see {@link controlLastname}
 * @see {@link controlEmail}
 * @returns {boolean}
 */
function controlsManager() {
    let count = 0;
    if (controlFirstname()) count++;
    if (controlLastname()) count++;
    if (controlEmail()) count++;

    return count === 3;
}

/**
 * @description Handles form submission
 * @see {@link controlsManager}
 * @see {@link closeModal}
 * @see {@link displayContactData}
 */
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
