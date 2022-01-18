function displayPhotographerContact(id) {
    // eslint-disable-next-line no-undef
    const PHOTOGRAPHER = getPhotographerData(id);
    const CONTACT_MODAL = document.getElementById('modal-contact-name');
    CONTACT_MODAL.textContent = PHOTOGRAPHER.name;
}

// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById('contact_modal');
    const MODAL_HIDDEN = document.getElementById('modal-id');
    // eslint-disable-next-line no-undef
    const MODAL_ID = getPhotographerPageId();
    MODAL_HIDDEN.setAttribute('value', MODAL_ID);
    modal.style.display = 'block';

    // eslint-disable-next-line no-undef
    displayPhotographerContact(MODAL_ID);
}

// eslint-disable-next-line no-unused-vars
function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
}
