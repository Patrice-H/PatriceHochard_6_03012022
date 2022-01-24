/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


function displayPhotographerContact(id) {
    const PHOTOGRAPHER = getPhotographerData(id);
    const CONTACT_MODAL = document.getElementById('modal-contact-name');
    CONTACT_MODAL.textContent = PHOTOGRAPHER.name;
}


function displayModal() {
    const modal = document.getElementById('contact_modal');
    const MODAL_HIDDEN = document.getElementById('recipient-id');
    const MODAL_ID = getPhotographerPageId();
    MODAL_HIDDEN.setAttribute('value', MODAL_ID);
    modal.style.display = 'block';
    displayPhotographerContact(MODAL_ID);
}


function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
}


function displayContactData() {
    const RECIPIENT = document.getElementById('recipient-id');
    const FIRSTNAME = document.getElementById('firstname');
    const LASTNAME = document.getElementById('lastname');
    const EMAIL = document.getElementById('email');
    const MESSAGE = document.getElementById('message');
    console.log(`Recipient id : ${RECIPIENT.value}`);
    console.log(`First name : ${FIRSTNAME.value}`);
    console.log(`Last name : ${LASTNAME.value}`);
    console.log(`Email : ${EMAIL.value}`);
    console.log(`Message : ${MESSAGE.value}`);

}


function sendModalForm() {
    closeModal();
    displayContactData();
}

const CONTACT_BUTTON = document.getElementById('contact-submit');
CONTACT_BUTTON.addEventListener('click', (evt) => {
    evt.preventDefault();
});
